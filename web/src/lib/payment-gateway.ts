/**
 * Multi-Gateway Payment Manager
 * Supports: MeSoMb, Fapshi, Campay, Flutterwave
 * Auto-fallback: MeSoMb → Fapshi → Campay → Flutterwave
 */

export type PaymentGateway = 'mesomb' | 'fapshi' | 'campay' | 'flutterwave';
export type MobileOperator = 'MTN' | 'ORANGE';
export type Country = 'CM' | 'NE';

interface PaymentData {
    amount: number;
    operator: MobileOperator;
    phone: string;
    country?: Country;
    reference?: string;
}

interface PaymentResponse {
    success: boolean;
    message: string;
    transactionId?: string;
    status: 'PENDING' | 'SUCCESS' | 'FAILED';
    gateway?: PaymentGateway;
    reference?: string;
}

interface GatewayConfig {
    name: PaymentGateway;
    enabled: boolean;
    priority: number;
    logo: string;
}

// Gateway configurations with logos
const gatewayConfigs: GatewayConfig[] = [
    { name: 'mesomb', enabled: true, priority: 1, logo: '/gateways/mesomb.png' },
    { name: 'fapshi', enabled: true, priority: 2, logo: '/gateways/fapshi.png' },
    { name: 'campay', enabled: true, priority: 3, logo: '/gateways/campay.png' },
    { name: 'flutterwave', enabled: true, priority: 4, logo: '/gateways/flutterwave.png' },
];

/**
 * MeSoMb Integration - https://mesomb.hachther.com
 */
async function processMeSoMb(data: PaymentData, isWithdraw: boolean): Promise<PaymentResponse> {
    const endpoint = isWithdraw ? '/payment/deposit/' : '/payment/collect/';

    const appKey = process.env.NEXT_PUBLIC_MESOMB_APP_KEY;
    const accessKey = process.env.MESOMB_ACCESS_KEY;
    const secretKey = process.env.MESOMB_SECRET_KEY;

    if (!appKey || !accessKey || !secretKey) {
        throw new Error('MeSoMb credentials not configured');
    }

    const signature = Buffer.from(`${accessKey}:${secretKey}`).toString('base64');
    const nonce = Date.now().toString();

    const response = await fetch(`https://mesomb.hachther.com/api/v1.1${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-MeSomb-Application': appKey,
            'X-MeSomb-Signature': signature,
            'X-MeSomb-Nonce': nonce,
        },
        body: JSON.stringify({
            amount: data.amount,
            service: data.operator,
            [isWithdraw ? 'receiver' : 'payer']: data.phone,
            country: data.country || 'CM',
            reference: data.reference || `OPAY-${Date.now()}`,
        }),
    });

    if (!response.ok) throw new Error('MeSoMb API request failed');

    const result = await response.json();

    return {
        success: true,
        message: result.message || 'Transaction initiated',
        transactionId: result.pk || result.transaction_id,
        status: result.status || (isWithdraw ? 'SUCCESS' : 'PENDING'),
        gateway: 'mesomb',
        reference: result.reference,
    };
}

/**
 * Fapshi Integration - https://docs.fapshi.com
 */
async function processFapshi(data: PaymentData, isWithdraw: boolean): Promise<PaymentResponse> {
    const apiKey = process.env.FAPSHI_API_KEY;
    const apiUser = process.env.FAPSHI_API_USER;

    if (!apiKey || !apiUser) {
        throw new Error('Fapshi credentials not configured');
    }

    const endpoint = isWithdraw ? 'https://api.fapshi.com/disburse' : 'https://api.fapshi.com/initiate-pay';

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apiuser': apiUser,
            'apikey': apiKey,
        },
        body: JSON.stringify({
            amount: data.amount,
            phone: `237${data.phone}`, // Fapshi requires country code
            operator: data.operator,
            externalId: data.reference || `OPAY-${Date.now()}`,
        }),
    });

    if (!response.ok) throw new Error('Fapshi API request failed');

    const result = await response.json();

    return {
        success: result.status === 'success',
        message: result.message || 'Transaction initiated',
        transactionId: result.transId || result.transaction_id,
        status: result.status === 'success' ? (isWithdraw ? 'SUCCESS' : 'PENDING') : 'FAILED',
        gateway: 'fapshi',
        reference: result.externalId,
    };
}

/**
 * Campay Integration - https://campay.net
 */
async function processCampay(data: PaymentData, isWithdraw: boolean): Promise<PaymentResponse> {
    const username = process.env.CAMPAY_USERNAME;
    const password = process.env.CAMPAY_PASSWORD;

    if (!username || !password) {
        throw new Error('Campay credentials not configured');
    }

    // Get auth token
    const authResponse = await fetch('https://demo.campay.net/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const { token } = await authResponse.json();

    // Make payment request
    const endpoint = isWithdraw ?
        'https://demo.campay.net/api/withdraw/' :
        'https://demo.campay.net/api/collect/';

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({
            amount: data.amount,
            from: `237${data.phone}`, // Campay requires country code
            description: `OpayCam ${isWithdraw ? 'Withdrawal' : 'Deposit'}`,
            external_reference: data.reference || `OPAY-${Date.now()}`,
        }),
    });

    if (!response.ok) throw new Error('Campay API request failed');

    const result = await response.json();

    return {
        success: result.status === 'SUCCESSFUL',
        message: result.message || 'Transaction initiated',
        transactionId: result.reference,
        status: result.status === 'SUCCESSFUL' ? (isWithdraw ? 'SUCCESS' : 'PENDING') : 'PENDING',
        gateway: 'campay',
        reference: result.external_reference,
    };
}

/**
 * Flutterwave Integration - https://flutterwave.com
 */
async function processFlutterwave(data: PaymentData, isWithdraw: boolean): Promise<PaymentResponse> {
    const secretKey = process.env.FLUTTERWAVE_SECRET_KEY;

    if (!secretKey) {
        throw new Error('Flutterwave credentials not configured');
    }

    const endpoint = 'https://api.flutterwave.com/v3/charges?type=mobile_money_franco';

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${secretKey}`,
        },
        body: JSON.stringify({
            amount: data.amount,
            currency: 'XAF',
            phone_number: data.phone,
            email: 'user@opaycam.com', // Required by Flutterwave
            tx_ref: data.reference || `OPAY-${Date.now()}`,
            country: data.country || 'CM',
            network: data.operator,
        }),
    });

    if (!response.ok) throw new Error('Flutterwave API request failed');

    const result = await response.json();

    return {
        success: result.status === 'successful',
        message: result.message || 'Transaction initiated',
        transactionId: result.data?.flw_ref,
        status: result.status === 'successful' ? 'PENDING' : 'FAILED',
        gateway: 'flutterwave',
        reference: result.data?.tx_ref,
    };
}

/**
 * Process payment with automatic fallback
 */
async function processPayment(data: PaymentData, isWithdraw: boolean): Promise<PaymentResponse> {
    const activeGateways = gatewayConfigs
        .filter(g => g.enabled)
        .sort((a, b) => a.priority - b.priority);

    const errors: string[] = [];

    // Validate input
    if (!data.phone.match(/^(6|2)\d{8}$/)) {
        return {
            success: false,
            message: 'Invalid phone number. Use 9 digits (e.g., 6XXXXXXXX)',
            status: 'FAILED',
        };
    }

    if (data.amount < (isWithdraw ? 500 : 100)) {
        return {
            success: false,
            message: `Minimum amount: ${isWithdraw ? 500 : 100} XAF`,
            status: 'FAILED',
        };
    }

    // Try each gateway in order
    for (const config of activeGateways) {
        try {
            console.log(`🔄 Trying ${config.name}...`);

            let response: PaymentResponse;

            switch (config.name) {
                case 'mesomb':
                    response = await processMeSoMb(data, isWithdraw);
                    break;
                case 'fapshi':
                    response = await processFapshi(data, isWithdraw);
                    break;
                case 'campay':
                    response = await processCampay(data, isWithdraw);
                    break;
                case 'flutterwave':
                    response = await processFlutterwave(data, isWithdraw);
                    break;
                default:
                    throw new Error(`Unknown gateway: ${config.name}`);
            }

            console.log(`✅ Success via ${config.name}`);
            return response;

        } catch (error: any) {
            console.warn(`❌ ${config.name} failed:`, error.message);
            errors.push(`${config.name}: ${error.message}`);
        }
    }

    return {
        success: false,
        message: `All gateways failed. ${errors.join('; ')}`,
        status: 'FAILED',
    };
}

// Public API
export async function collect(data: PaymentData): Promise<PaymentResponse> {
    return processPayment(data, false);
}

export async function withdraw(data: PaymentData): Promise<PaymentResponse> {
    return processPayment(data, true);
}

export function getGatewayConfigs() {
    return gatewayConfigs;
}

export function toggleGateway(gateway: PaymentGateway, enabled: boolean) {
    const config = gatewayConfigs.find(g => g.name === gateway);
    if (config) {
        config.enabled = enabled;
    }
}

// Legacy exports for compatibility
export const deposit = withdraw;
export type MeSoMbService = MobileOperator;
export type MeSoMbCountry = Country;
