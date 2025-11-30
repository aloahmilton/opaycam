import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CoinPaymentsService, { ExchangeRate } from '../services/CoinPaymentsService';

type TabType = 'buy' | 'sell';

export const CryptoExchangeScreen: React.FC = () => {
    const navigation = useNavigation();
    const [mode, setMode] = useState<'trade' | 'wallet'>('trade');
    const [selectedTab, setSelectedTab] = useState<TabType>('buy');
    const [amount, setAmount] = useState('');
    const [selectedCrypto, setSelectedCrypto] = useState('BTC');
    const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [estimatedAmount, setEstimatedAmount] = useState<number>(0);
    const [showCryptoSelector, setShowCryptoSelector] = useState(false);

    // Wallet State
    const [balances, setBalances] = useState<any[]>([]);
    const [totalValueXAF, setTotalValueXAF] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const cryptoIcons: Record<string, string> = {
        BTC: 'logo-bitcoin',
        ETH: 'logo-bitcoin',
        USDT: 'logo-usd',
        LTC: 'logo-bitcoin',
        USDC: 'logo-usd',
        BNB: 'logo-bitcoin',
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (mode === 'trade') {
            calculateEstimate();
        }
    }, [amount, selectedCrypto, selectedTab, mode]);

    const loadData = async () => {
        setIsLoading(true);
        await Promise.all([loadExchangeRates(), loadBalances()]);
        setIsLoading(false);
    };

    const loadExchangeRates = async () => {
        try {
            const rates = await CoinPaymentsService.getExchangeRates();
            setExchangeRates(rates);
        } catch (error) {
            console.error('Failed to load rates:', error);
        }
    };

    const loadBalances = async () => {
        try {
            // Mock balances - In production, fetch from CoinPayments API
            const mockBalances = [
                { currency: 'BTC', name: 'Bitcoin', balance: 0.00125, valueXAF: 37500 },
                { currency: 'ETH', name: 'Ethereum', balance: 0.05, valueXAF: 90000 },
                { currency: 'USDT', name: 'Tether', balance: 100, valueXAF: 60000 },
            ];
            setBalances(mockBalances);
            const total = mockBalances.reduce((sum, b) => sum + b.valueXAF, 0);
            setTotalValueXAF(total);
        } catch (error) {
            console.error('Failed to load balances:', error);
        }
    };

    const calculateEstimate = async () => {
        if (!amount || parseFloat(amount) <= 0) {
            setEstimatedAmount(0);
            return;
        }

        try {
            const amountNum = parseFloat(amount);
            if (selectedTab === 'buy') {
                const result = await CoinPaymentsService.calculateCryptoAmount(
                    amountNum,
                    selectedCrypto
                );
                setEstimatedAmount(result.cryptoAmount);
            } else {
                const usdAmount = amountNum * 50000; // Simplified
                const xafAmount = CoinPaymentsService.convertUSDtoXAF(usdAmount);
                setEstimatedAmount(xafAmount);
            }
        } catch (error) {
            console.error('Failed to calculate estimate:', error);
            setEstimatedAmount(0);
        }
    };

    const handleContinue = async () => {
        if (!amount || parseFloat(amount) <= 0) {
            Alert.alert('Invalid Amount', 'Please enter a valid amount');
            return;
        }

        try {
            const amountNum = parseFloat(amount);
            const usdAmount = CoinPaymentsService.convertXAFtoUSD(amountNum);

            const transaction = await CoinPaymentsService.createBuyTransaction(
                usdAmount,
                selectedCrypto,
                'user@example.com'
            );

            Alert.alert(
                'Transaction Created',
                `Send ${transaction.cryptoAmount} ${transaction.cryptoCurrency} to:\n\n${transaction.address}\n\nTransaction ID: ${transaction.txnId}`,
                [
                    { text: 'Copy Address', onPress: () => Alert.alert('Copied', 'Address copied') },
                    { text: 'OK' },
                ]
            );
        } catch (error) {
            Alert.alert('Error', 'Failed to create transaction');
        }
    };

    const CryptoOption = ({ crypto }: { crypto: ExchangeRate }) => (
        <TouchableOpacity
            style={styles.cryptoOption}
            onPress={() => {
                setSelectedCrypto(crypto.currency);
                setShowCryptoSelector(false);
            }}
        >
            <View style={styles.cryptoOptionLeft}>
                <View style={[styles.cryptoIcon, { backgroundColor: colors.primary + '20' }]}>
                    <Ionicons
                        name={cryptoIcons[crypto.currency] as any || 'logo-bitcoin'}
                        size={24}
                        color={colors.primary}
                    />
                </View>
                <View>
                    <Text style={styles.cryptoName}>{crypto.currency}</Text>
                    <Text style={styles.cryptoFullName}>{crypto.name}</Text>
                </View>
            </View>
            {selectedCrypto === crypto.currency && (
                <Ionicons name="checkmark-circle" size={24} color={colors.success} />
            )}
        </TouchableOpacity>
    );

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.loadingText}>Loading crypto data...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                <View style={styles.modeSwitch}>
                    <TouchableOpacity
                        style={[styles.modeButton, mode === 'trade' && styles.modeButtonActive]}
                        onPress={() => setMode('trade')}
                    >
                        <Text style={[styles.modeText, mode === 'trade' && styles.modeTextActive]}>Trade</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.modeButton, mode === 'wallet' && styles.modeButtonActive]}
                        onPress={() => setMode('wallet')}
                    >
                        <Text style={[styles.modeText, mode === 'wallet' && styles.modeTextActive]}>Wallet</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={loadData} style={styles.refreshButton}>
                    <Ionicons name="refresh" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {mode === 'trade' ? (
                    <>
                        {/* Trade Mode Content */}
                        <View style={styles.infoBanner}>
                            <Ionicons name="information-circle" size={20} color={colors.info} />
                            <Text style={styles.infoText}>
                                Buy and sell cryptocurrency securely with CoinPayments
                            </Text>
                        </View>

                        <View style={styles.tabContainer}>
                            <TouchableOpacity
                                style={[styles.tab, selectedTab === 'buy' && styles.tabActive]}
                                onPress={() => setSelectedTab('buy')}
                            >
                                <Text style={[styles.tabText, selectedTab === 'buy' && styles.tabTextActive]}>
                                    Buy Crypto
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.tab, selectedTab === 'sell' && styles.tabActive]}
                                onPress={() => setSelectedTab('sell')}
                            >
                                <Text style={[styles.tabText, selectedTab === 'sell' && styles.tabTextActive]}>
                                    Sell Crypto
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputCard}>
                            <Text style={styles.inputLabel}>
                                {selectedTab === 'buy' ? 'Amount to Spend (XAF)' : 'Amount to Sell'}
                            </Text>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.currencySymbol}>
                                    {selectedTab === 'buy' ? 'XAF' : selectedCrypto}
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    value={amount}
                                    onChangeText={setAmount}
                                    placeholder="0.00"
                                    keyboardType="decimal-pad"
                                    placeholderTextColor={colors.textSecondary}
                                />
                            </View>
                        </View>

                        <View style={styles.selectorCard}>
                            <Text style={styles.inputLabel}>
                                {selectedTab === 'buy' ? 'Cryptocurrency to Buy' : 'Cryptocurrency to Sell'}
                            </Text>
                            <TouchableOpacity
                                style={styles.selector}
                                onPress={() => setShowCryptoSelector(!showCryptoSelector)}
                            >
                                <View style={styles.selectorLeft}>
                                    <View style={[styles.cryptoIcon, { backgroundColor: colors.primary + '20' }]}>
                                        <Ionicons
                                            name={cryptoIcons[selectedCrypto] as any || 'logo-bitcoin'}
                                            size={24}
                                            color={colors.primary}
                                        />
                                    </View>
                                    <Text style={styles.selectorText}>{selectedCrypto}</Text>
                                </View>
                                <Ionicons name="chevron-down" size={24} color={colors.textSecondary} />
                            </TouchableOpacity>

                            {showCryptoSelector && (
                                <View style={styles.cryptoList}>
                                    {exchangeRates.map((crypto) => (
                                        <CryptoOption key={crypto.currency} crypto={crypto} />
                                    ))}
                                </View>
                            )}
                        </View>

                        {estimatedAmount > 0 && (
                            <View style={styles.estimateCard}>
                                <View style={styles.estimateRow}>
                                    <Text style={styles.estimateLabel}>You will {selectedTab === 'buy' ? 'receive' : 'get'}:</Text>
                                    <Text style={styles.estimateAmount}>
                                        {selectedTab === 'buy'
                                            ? `${estimatedAmount.toFixed(8)} ${selectedCrypto}`
                                            : `${estimatedAmount.toLocaleString()} XAF`
                                        }
                                    </Text>
                                </View>
                                <Text style={styles.estimateNote}>
                                    Rate updated: {new Date().toLocaleTimeString()}
                                </Text>
                            </View>
                        )}

                        <TouchableOpacity
                            style={[styles.continueButton, (!amount || parseFloat(amount) <= 0) && styles.continueButtonDisabled]}
                            onPress={handleContinue}
                            disabled={!amount || parseFloat(amount) <= 0}
                        >
                            <Text style={styles.continueButtonText}>Continue</Text>
                            <Ionicons name="arrow-forward" size={20} color={colors.white} />
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        {/* Wallet Mode Content */}
                        <View style={styles.totalCard}>
                            <Text style={styles.totalLabel}>Total Portfolio Value</Text>
                            <Text style={styles.totalAmount}>{totalValueXAF.toLocaleString()} XAF</Text>
                            <Text style={styles.totalUSD}>
                                ≈ ${CoinPaymentsService.convertXAFtoUSD(totalValueXAF).toFixed(2)} USD
                            </Text>
                        </View>

                        <View style={styles.assetsSection}>
                            <Text style={styles.sectionTitle}>Your Assets</Text>
                            {balances.map((asset) => (
                                <View key={asset.currency} style={styles.assetCard}>
                                    <View style={styles.assetLeft}>
                                        <View style={[styles.assetIcon, { backgroundColor: '#2563eb' + '20' }]}>
                                            <Ionicons
                                                name={cryptoIcons[asset.currency] as any || 'logo-bitcoin'}
                                                size={28}
                                                color="#2563eb"
                                            />
                                        </View>
                                        <View style={styles.assetInfo}>
                                            <Text style={styles.assetName}>{asset.name}</Text>
                                            <Text style={styles.assetSymbol}>{asset.currency}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.assetRight}>
                                        <Text style={styles.assetBalance}>
                                            {asset.balance.toFixed(8)} {asset.currency}
                                        </Text>
                                        <Text style={styles.assetValue}>
                                            {asset.valueXAF.toLocaleString()} XAF
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    loadingText: {
        ...typography.variants.body,
        color: colors.textSecondary,
        marginTop: spacing.md,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
        paddingTop: spacing.xl,
        paddingBottom: spacing.md,
        backgroundColor: colors.surface,
        ...shadows.small,
    },
    backButton: {
        padding: spacing.xs,
    },
    refreshButton: {
        padding: spacing.xs,
    },
    title: {
        ...typography.variants.h3,
        color: colors.textPrimary,
    },
    content: {
        padding: spacing.md,
    },
    infoBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        backgroundColor: colors.info + '15',
        padding: spacing.md,
        borderRadius: borderRadius.medium,
        marginBottom: spacing.md,
        borderLeftWidth: 4,
        borderLeftColor: colors.info,
    },
    infoText: {
        ...typography.variants.bodySmall,
        color: colors.info,
        flex: 1,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        borderRadius: borderRadius.medium,
        padding: 4,
        marginBottom: spacing.md,
    },
    tab: {
        flex: 1,
        paddingVertical: spacing.sm,
        alignItems: 'center',
        borderRadius: borderRadius.small,
    },
    tabActive: {
        backgroundColor: '#2563eb', // Blue color for crypto
    },
    tabText: {
        ...typography.variants.bodySmall,
        color: colors.textSecondary,
        fontWeight: typography.fontWeight.medium,
    },
    tabTextActive: {
        color: colors.white,
        fontWeight: typography.fontWeight.bold,
    },
    inputCard: {
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: borderRadius.medium,
        marginBottom: spacing.md,
        ...shadows.small,
    },
    inputLabel: {
        ...typography.variants.caption,
        color: colors.textSecondary,
        marginBottom: spacing.sm,
        fontWeight: typography.fontWeight.medium,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#2563eb',
    },
    currencySymbol: {
        ...typography.variants.h3,
        color: colors.textPrimary,
        marginRight: spacing.sm,
        fontWeight: typography.fontWeight.bold,
    },
    input: {
        ...typography.variants.h2,
        color: colors.textPrimary,
        flex: 1,
        padding: 0,
    },
    selectorCard: {
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: borderRadius.medium,
        marginBottom: spacing.md,
        ...shadows.small,
    },
    selector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.sm,
    },
    selectorLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    selectorText: {
        ...typography.variants.body,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
    },
    cryptoList: {
        marginTop: spacing.sm,
        borderTopWidth: 1,
        borderTopColor: colors.gray200,
        paddingTop: spacing.sm,
    },
    cryptoOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.sm,
    },
    cryptoOptionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    cryptoIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cryptoName: {
        ...typography.variants.body,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
    },
    cryptoFullName: {
        ...typography.variants.caption,
        color: colors.textSecondary,
    },
    estimateCard: {
        backgroundColor: '#2563eb' + '15',
        padding: spacing.md,
        borderRadius: borderRadius.medium,
        marginBottom: spacing.md,
        borderLeftWidth: 4,
        borderLeftColor: '#2563eb',
    },
    estimateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    estimateLabel: {
        ...typography.variants.body,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.medium,
    },
    estimateAmount: {
        ...typography.variants.h3,
        color: '#2563eb',
        fontWeight: typography.fontWeight.bold,
    },
    estimateNote: {
        ...typography.variants.caption,
        color: colors.textSecondary,
        fontSize: 11,
    },
    continueButton: {
        flexDirection: 'row',
        backgroundColor: '#2563eb',
        padding: spacing.md,
        borderRadius: borderRadius.medium,
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        marginBottom: spacing.lg,
        ...shadows.medium,
    },
    continueButtonDisabled: {
        backgroundColor: colors.gray300,
    },
    continueButtonText: {
        ...typography.variants.body,
        color: colors.white,
        fontWeight: typography.fontWeight.bold,
    },
    popularSection: {
        marginTop: spacing.md,
    },
    sectionTitle: {
        ...typography.variants.body,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.md,
    },
    popularGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    popularItem: {
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: borderRadius.medium,
        alignItems: 'center',
        width: '23%',
        ...shadows.small,
    },
    popularName: {
        ...typography.variants.caption,
        color: colors.textPrimary,
        marginTop: spacing.xs,
        fontWeight: typography.fontWeight.bold,
    },
    modeSwitch: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        borderRadius: borderRadius.medium,
        padding: 4,
        marginHorizontal: spacing.sm,
    },
    modeButton: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.small,
    },
    modeButtonActive: {
        backgroundColor: '#2563eb',
    },
    modeText: {
        ...typography.variants.caption,
        color: colors.textSecondary,
        fontWeight: typography.fontWeight.medium,
    },
    modeTextActive: {
        color: colors.white,
        fontWeight: typography.fontWeight.bold,
    },
    totalCard: {
        backgroundColor: '#2563eb',
        padding: spacing.lg,
        borderRadius: borderRadius.large,
        marginBottom: spacing.md,
        alignItems: 'center',
        ...shadows.medium,
    },
    totalLabel: {
        ...typography.variants.caption,
        color: colors.white,
        opacity: 0.9,
        marginBottom: spacing.xs,
    },
    totalAmount: {
        ...typography.variants.h1,
        color: colors.white,
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.xxs,
    },
    totalUSD: {
        ...typography.variants.body,
        color: colors.white,
        opacity: 0.8,
    },
    assetsSection: {
        marginBottom: spacing.lg,
    },
    assetCard: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: borderRadius.medium,
        marginBottom: spacing.sm,
        alignItems: 'center',
        ...shadows.small,
    },
    assetLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    assetIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.sm,
    },
    assetInfo: {
        flex: 1,
    },
    assetName: {
        ...typography.variants.body,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
        marginBottom: 2,
    },
    assetSymbol: {
        ...typography.variants.caption,
        color: colors.textSecondary,
    },
    assetRight: {
        alignItems: 'flex-end',
        marginRight: spacing.sm,
    },
    assetBalance: {
        ...typography.variants.bodySmall,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
        marginBottom: 2,
    },
    assetValue: {
        ...typography.variants.caption,
        color: colors.textSecondary,
    },
});
