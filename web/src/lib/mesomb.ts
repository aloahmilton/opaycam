export type MeSoMbService = 'MTN' | 'ORANGE';

export interface PaymentData {
    amount: number;
    service: MeSoMbService;
    payer: string; // Phone number
    reference?: string;
}

export interface TransactionResponse {
    success: boolean;
    message: string;
    transactionId?: string;
    status: 'PENDING' | 'SUCCESS' | 'FAILED';
}

/**
 * Simulates the MeSoMb "Collect" (Money In) API.
 * Used for Deposits: Requesting money FROM a user's mobile money account.
 */
export const collect = async (data: PaymentData): Promise<TransactionResponse> => {
    console.log('MeSoMb Collect Request:', data);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate validation
    if (!data.payer.match(/^(6|2)\d{8}$/)) {
        return {
            success: false,
            message: 'Invalid phone number format',
            status: 'FAILED'
        };
    }

    if (data.amount < 100) {
        return {
            success: false,
            message: 'Minimum amount is 100 XAF',
            status: 'FAILED'
        };
    }

    // Simulate success
    return {
        success: true,
        message: 'Payment request sent to user phone',
        transactionId: `COL-${Date.now()}`,
        status: 'PENDING' // In real life, this would be PENDING until user approves on phone
    };
};

/**
 * Simulates the MeSoMb "Deposit" (Money Out) API.
 * Used for Withdrawals: Sending money TO a user's mobile money account.
 */
export const deposit = async (data: PaymentData): Promise<TransactionResponse> => {
    console.log('MeSoMb Deposit Request:', data);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate validation
    if (!data.payer.match(/^(6|2)\d{8}$/)) {
        return {
            success: false,
            message: 'Invalid receiver phone number',
            status: 'FAILED'
        };
    }

    // Simulate success
    return {
        success: true,
        message: 'Transfer initiated successfully',
        transactionId: `DEP-${Date.now()}`,
        status: 'SUCCESS'
    };
};

/**
 * Simulates checking the status of a transaction.
 */
export const checkStatus = async (transactionId: string): Promise<TransactionResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
        success: true,
        message: 'Transaction completed',
        transactionId,
        status: 'SUCCESS'
    };
};
