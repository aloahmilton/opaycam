/**
 * Payment Service
 * Aligned with Web Dashboard logic (web/src/lib/payment-gateway.ts)
 * Supports MeSomb international payments to 6 countries
 */

export type PaymentGateway = 'mesomb' | 'fapshi' | 'campay' | 'flutterwave';
export type MobileOperator = 'MTN' | 'ORANGE';
export type Country = 'CM' | 'BJ' | 'CI' | 'RW' | 'UG' | 'KE'; // MeSomb supported countries

export interface PaymentData {
    amount: number;
    operator: MobileOperator;
    phone: string;
    country?: Country;
    reference?: string;
}

export interface PaymentResponse {
    success: boolean;
    message: string;
    transactionId?: string;
    status: 'PENDING' | 'SUCCESS' | 'FAILED';
    gateway?: PaymentGateway;
    reference?: string;
}

// Supported countries for international transfers
export const SUPPORTED_COUNTRIES = [
    { code: 'CM' as Country, name: 'Cameroon', flag: '🇨🇲', currency: 'XAF' },
    { code: 'BJ' as Country, name: 'Benin', flag: '🇧🇯', currency: 'XOF' },
    { code: 'CI' as Country, name: 'Côte d\'Ivoire', flag: '🇨🇮', currency: 'XOF' },
    { code: 'RW' as Country, name: 'Rwanda', flag: '🇷🇼', currency: 'RWF' },
    { code: 'UG' as Country, name: 'Uganda', flag: '🇺🇬', currency: 'UGX' },
    { code: 'KE' as Country, name: 'Kenya', flag: '🇰🇪', currency: 'KES' },
];

class PaymentService {
    /**
     * Process a payment (Collection/Deposit)
     * Supports international transfers to 6 African countries
     */
    static async collect(data: PaymentData): Promise<PaymentResponse> {
        // TODO: In production, this should call your backend API
        // DO NOT implement direct API calls to gateways here to avoid exposing secrets

        console.log('Initiating payment collection...', data);

        // Validate country if provided
        if (data.country && !SUPPORTED_COUNTRIES.find(c => c.code === data.country)) {
            return {
                success: false,
                message: 'Country not supported for international payments',
                status: 'FAILED'
            };
        }

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock Logic: Fail if amount < 100
        if (data.amount < 100) {
            return {
                success: false,
                message: 'Minimum amount: 100 XAF',
                status: 'FAILED'
            };
        }

        // Mock Logic: Success
        return {
            success: true,
            message: data.country
                ? `International transfer to ${data.country} initiated successfully`
                : 'Transaction initiated successfully',
            transactionId: `TRX-${Date.now()}`,
            status: 'SUCCESS', // In real life, this might be PENDING first
            gateway: 'mesomb', // Defaulting to primary gateway
            reference: data.reference || `OPAY-${Date.now()}`
        };
    }

    /**
     * Process a withdrawal (Disbursement)
     */
    static async withdraw(data: PaymentData): Promise<PaymentResponse> {
        console.log('Initiating withdrawal...', data);

        await new Promise(resolve => setTimeout(resolve, 2000));

        if (data.amount < 500) {
            return {
                success: false,
                message: 'Minimum withdrawal: 500 XAF',
                status: 'FAILED'
            };
        }

        return {
            success: true,
            message: 'Withdrawal initiated successfully',
            transactionId: `WD-${Date.now()}`,
            status: 'SUCCESS',
            gateway: 'mesomb',
            reference: data.reference || `OPAY-${Date.now()}`
        };
    }
}

export default PaymentService;
