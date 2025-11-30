import { colors } from '../theme/colors';

export interface Feature {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    status: 'Planned' | 'In Development' | 'Testing' | 'Coming Soon';
    eta?: string;
    priority?: number;
}

// Mock data that would eventually come from the Admin Dashboard API
const MOCK_FEATURES: Feature[] = [
    {
        id: '1',
        title: 'Virtual Card',
        description: 'Create virtual debit cards for secure online shopping and subscriptions.',
        icon: 'card-outline',
        color: colors.info,
        status: 'In Development',
        eta: 'Q1 2026',
        priority: 1
    },
    {
        id: '2',
        title: 'Crypto Exchange',
        description: 'Buy, sell, and swap cryptocurrencies directly from your wallet.',
        icon: 'logo-bitcoin',
        color: colors.warning,
        status: 'Planned',
        eta: 'Q2 2026',
        priority: 2
    },
    {
        id: '3',
        title: 'Merchant API',
        description: 'Accept payments on your website using OpayCam.',
        icon: 'code-slash-outline',
        color: colors.secondary,
        status: 'Planned',
        eta: 'Late 2026',
        priority: 3
    }
];

export const FeatureService = {
    /**
     * Fetches the list of upcoming features from the backend.
     * This is linked to the Admin Dashboard where admins can add/edit features.
     */
    getUpcomingFeatures: async (): Promise<Feature[]> => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_FEATURES.sort((a, b) => (a.priority || 99) - (b.priority || 99)));
            }, 800);
        });
    },

    /**
     * Submits a user's feature request to the backend.
     * Admins can view these requests in the dashboard.
     */
    submitFeatureRequest: async (request: { title: string; description: string; email?: string }): Promise<void> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Feature Request Submitted:', request);
                resolve();
            }, 1000);
        });
    }
};
