/**
 * MeSoMb Payment Gateway HTTP API Client
 * Official Documentation: https://mesomb.hachther.com/en/api/v1.1/
 */

export type MeSoMbService = 'MTN' | 'ORANGE';
export type MeSoMbCountry = 'CM' | 'NE'; // Cameroon, Niger

interface MeSoMbConfig {
    applicationKey: string;
    accessKey: string;
    secretKey: string;
    baseURL?: string;
}

interface MeSoMbPaymentData {
    amount: number;
    service: MeSoMbService;
    payer: string; // Phone number
    country?: MeSoMbCountry;
    reference?: string;
    feesIncluded?: boolean;
}

interface MeSoMbResponse {
    success: boolean;
    message: string;
    transactionId?: string;
    status: 'PENDING' | 'SUCCESS' | 'FAILED';
    reference?: string;
    fees?: number;
}

class MeSoMbClient {
    private config: MeSoMbConfig;
    private baseURL: string;

    constructor(config: MeSoMbConfig) {
        this.config = config;
        this.baseURL = config.baseURL || 'https://mesomb.hachther.com/api/v1.1';
    }

    /**
     * Generate authentication signature for API requests
     */
    private generateSignature(endpoint: string, nonce: string): string {
        // In production, implement proper HMAC-SHA1 signature
        // For now, return base64 encoded credentials
        const credentials = `${this.config.accessKey}:${this.config.secretKey}`;
        return Buffer.from(credentials).toString('base64');
    }

    /**
     * Make authenticated request to MeSoMb API
     */
    private async request(
        endpoint: string,
        method: string = 'POST',
        data?: any
    ): Promise<any> {
        const nonce = Date.now().toString();
        const signature = this.generateSignature(endpoint, nonce);

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'X-MeSomb-Application': this.config.applicationKey,
            'X-MeSomb-Signature': signature,
            'X-MeSomb-Nonce': nonce,
        };

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method,
                headers,
                body: data ? JSON.stringify(data) : undefined,
            });

            if (!response.ok) {
                throw new Error(`MeSoMb API Error: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('MeSoMb Request Failed:', error);
            throw error;
        }
    }

    /**
     * Collect money from customer (DEPOSIT to OpayCam)
     * Money flows: Customer Account → OpayCam
     */
    async collect(data: MeSoMbPaymentData): Promise<MeSoMbResponse> {
        console.log('MeSoMb Collect (Deposit):', data);

        // Validate inputs
        if (!data.payer.match(/^(6|2)\d{8}$/)) {
            return {
                success: false,
                message: 'Invalid phone number format. Use 6XXXXXXXX or 2XXXXXXXX',
                status: 'FAILED',
            };
        }

        if (data.amount < 100) {
            return {
                success: false,
                message: 'Minimum amount is 100 XAF',
                status: 'FAILED',
            };
        }

        try {
            const requestData = {
                amount: data.amount,
                service: data.service,
                payer: data.payer,
                country: data.country || 'CM',
                fees_included: data.feesIncluded !== false,
                reference: data.reference || `DEP-${Date.now()}`,
            };

            const result = await this.request('/payment/collect/', 'POST', requestData);

            return {
                success: result.success || true,
                message: result.message || 'Payment request sent to customer',
                transactionId: result.pk || result.transaction_id,
                status: result.status || 'PENDING',
                reference: result.reference,
                fees: result.fees,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message || 'Transaction failed',
                status: 'FAILED',
            };
        }
    }

    /**
     * Deposit money to customer (WITHDRAWAL from OpayCam)
     * Money flows: OpayCam → Customer Account
     */
    async deposit(data: MeSoMbPaymentData): Promise<MeSoMbResponse> {
        console.log('MeSoMb Deposit (Withdrawal):', data);

        // Validate inputs
        if (!data.payer.match(/^(6|2)\d{8}$/)) {
            return {
                success: false,
                message: 'Invalid receiver phone number',
                status: 'FAILED',
            };
        }

        if (data.amount < 500) {
            return {
                success: false,
                message: 'Minimum withdrawal is 500 XAF',
                status: 'FAILED',
            };
        }

        try {
            const requestData = {
                amount: data.amount,
                service: data.service,
                receiver: data.payer,
                country: data.country || 'CM',
                reference: data.reference || `WDR-${Date.now()}`,
            };

            const result = await this.request('/payment/deposit/', 'POST', requestData);

            return {
                success: result.success || true,
                message: result.message || 'Transfer initiated successfully',
                transactionId: result.pk || result.transaction_id,
                status: result.status || 'SUCCESS',
                reference: result.reference,
                fees: result.fees,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message || 'Transaction failed',
                status: 'FAILED',
            };
        }
    }

    /**
     * Check transaction status
     */
    async checkStatus(transactionId: string): Promise<MeSoMbResponse> {
        try {
            const result = await this.request(`/payment/status/${transactionId}/`, 'GET');

            return {
                success: true,
                message: 'Status retrieved',
                transactionId: result.pk,
                status: result.status,
                reference: result.reference,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message || 'Failed to retrieve status',
                status: 'FAILED',
            };
        }
    }
}

// Singleton instance
let mesombClient: MeSoMbClient | null = null;

/**
 * Initialize MeSoMb client with API credentials
 * Call this once during app initialization
 */
export function initializeMeSoMb(config: MeSoMbConfig): void {
    mesombClient = new MeSoMbClient(config);
}

/**
 * Get MeSoMb client instance
 * Falls back to mock mode if not initialized
 */
function getMeSoMbClient(): MeSoMbClient {
    if (!mesombClient) {
        console.warn('MeSoMb not initialized. Using mock credentials.');
        // Use environment variables or mock credentials
        mesombClient = new MeSoMbClient({
            applicationKey: process.env.NEXT_PUBLIC_MESOMB_APP_KEY || 'MOCK_APP_KEY',
            accessKey: process.env.MESOMB_ACCESS_KEY || 'MOCK_ACCESS_KEY',
            secretKey: process.env.MESOMB_SECRET_KEY || 'MOCK_SECRET_KEY',
        });
    }
    return mesombClient;
}

// Export convenient wrapper functions
export async function collect(data: MeSoMbPaymentData): Promise<MeSoMbResponse> {
    return getMeSoMbClient().collect(data);
}

export async function deposit(data: MeSoMbPaymentData): Promise<MeSoMbResponse> {
    return getMeSoMbClient().deposit(data);
}

export async function checkStatus(transactionId: string): Promise<MeSoMbResponse> {
    return getMeSoMbClient().checkStatus(transactionId);
}
