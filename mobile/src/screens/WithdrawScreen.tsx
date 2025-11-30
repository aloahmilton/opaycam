import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../context/LanguageContext';
import PaymentService from '../services/PaymentService';
import { TransactionModal } from '../components/TransactionModal';

export const WithdrawScreen: React.FC = () => {
    const navigation = useNavigation();
    const { t } = useLanguage();
    const [amount, setAmount] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [selectedOperator, setSelectedOperator] = useState('MTN');
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState<'success' | 'error'>('success');
    const [modalMessage, setModalMessage] = useState('');

    const operators = [
        { name: 'MTN', color: '#FFCC00' },
        { name: 'Orange', color: '#FF6600' },
        { name: 'Airtel', color: '#FF0000' },
    ];

    const handleWithdraw = async () => {
        if (!amount || !accountNumber) {
            setModalType('error');
            setModalMessage(t.fillAllFields);
            setModalVisible(true);
            return;
        }

        const withdrawAmount = parseFloat(amount);
        if (withdrawAmount <= 0) {
            setModalType('error');
            setModalMessage('Please enter a valid amount');
            setModalVisible(true);
            return;
        }

        setLoading(true);
        try {
            const response = await PaymentService.withdraw({
                amount: withdrawAmount,
                phone: accountNumber,
                operator: selectedOperator as 'MTN' | 'Orange',
                reference: `WITHDRAW-${Date.now()}`
            });

            if (response.success) {
                setModalType('success');
                setModalMessage('Withdrawal successful!');
                setModalVisible(true);
                setAmount('');
                setAccountNumber('');
            } else {
                setModalType('error');
                setModalMessage(response.message || 'Withdrawal failed');
                setModalVisible(true);
            }
        } catch (error) {
            setModalType('error');
            setModalMessage('An error occurred during withdrawal');
            setModalVisible(true);
        } finally {
            setLoading(false);
        }
    };

    const handleModalClose = () => {
        setModalVisible(false);
        if (modalType === 'success') {
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.title}>Withdraw Money</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.infoCard}>
                    <Ionicons name="information-circle" size={24} color={colors.info} />
                    <Text style={styles.infoText}>
                        Withdraw funds from your OpayCam wallet to your mobile money account
                    </Text>
                </View>

                <View style={styles.balanceCard}>
                    <Text style={styles.balanceLabel}>Available Balance</Text>
                    <Text style={styles.balanceAmount}>XAF 485,250</Text>
                </View>

                <View style={styles.form}>
                    <Text style={styles.label}>Withdrawal Amount</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter amount"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />

                    <Text style={styles.label}>Select Operator</Text>
                    <View style={styles.operatorContainer}>
                        {operators.map((operator) => (
                            <TouchableOpacity
                                key={operator.name}
                                style={[
                                    styles.operatorButton,
                                    selectedOperator === operator.name && styles.operatorButtonActive,
                                    { borderColor: operator.color }
                                ]}
                                onPress={() => setSelectedOperator(operator.name)}
                            >
                                <Text style={[
                                    styles.operatorText,
                                    selectedOperator === operator.name && { color: operator.color, fontWeight: 'bold' }
                                ]}>
                                    {operator.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.label}>Mobile Money Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter mobile money number"
                        keyboardType="phone-pad"
                        value={accountNumber}
                        onChangeText={setAccountNumber}
                    />

                    {amount && (
                        <View style={styles.feeCard}>
                            <View style={styles.feeRow}>
                                <Text style={styles.feeLabel}>Amount:</Text>
                                <Text style={styles.feeValue}>XAF {amount}</Text>
                            </View>
                            <View style={styles.feeRow}>
                                <Text style={styles.feeLabel}>Fee (2%):</Text>
                                <Text style={styles.feeValue}>XAF {(parseFloat(amount) * 0.02).toFixed(0)}</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.feeRow}>
                                <Text style={styles.totalLabel}>You'll receive:</Text>
                                <Text style={styles.totalValue}>
                                    XAF {(parseFloat(amount) - parseFloat(amount) * 0.02).toFixed(0)}
                                </Text>
                            </View>
                        </View>
                    )}

                    <TouchableOpacity
                        style={[styles.withdrawButton, loading && { opacity: 0.7 }]}
                        onPress={handleWithdraw}
                        disabled={loading}
                    >
                        <Text style={styles.withdrawButtonText}>
                            {loading ? t.loading : 'Withdraw'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <TransactionModal
                visible={modalVisible}
                type={modalType}
                title={modalType === 'success' ? t.success : t.error}
                message={modalMessage}
                onPrimaryPress={handleModalClose}
                primaryButtonText={t.ok}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
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
    title: {
        ...typography.variants.h3,
        color: colors.textPrimary,
    },
    content: {
        padding: spacing.md,
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: colors.infoLight + '30',
        padding: spacing.md,
        borderRadius: borderRadius.small,
        marginBottom: spacing.md,
    },
    infoText: {
        ...typography.variants.bodySmall,
        color: colors.info,
        marginLeft: spacing.sm,
        flex: 1,
    },
    balanceCard: {
        backgroundColor: colors.primary,
        padding: spacing.md,
        borderRadius: borderRadius.medium,
        marginBottom: spacing.md,
        alignItems: 'center',
    },
    balanceLabel: {
        ...typography.variants.caption,
        color: colors.textPrimary,
        opacity: 0.8,
    },
    balanceAmount: {
        ...typography.variants.h2,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
        marginTop: spacing.xs,
    },
    form: {
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: borderRadius.medium,
        ...shadows.small,
    },
    label: {
        ...typography.variants.bodySmall,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
        marginTop: spacing.sm,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: borderRadius.small,
        padding: spacing.sm,
        fontSize: 16,
        color: colors.textPrimary,
    },
    feeCard: {
        backgroundColor: colors.gray50,
        padding: spacing.md,
        borderRadius: borderRadius.small,
        marginTop: spacing.md,
    },
    feeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.xs,
    },
    feeLabel: {
        ...typography.variants.bodySmall,
        color: colors.textSecondary,
    },
    feeValue: {
        ...typography.variants.bodySmall,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.medium,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: spacing.sm,
    },
    totalLabel: {
        ...typography.variants.body,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
    },
    totalValue: {
        ...typography.variants.body,
        color: colors.success,
        fontWeight: typography.fontWeight.bold,
    },
    withdrawButton: {
        backgroundColor: colors.primary,
        padding: spacing.md,
        borderRadius: borderRadius.medium,
        alignItems: 'center',
        marginTop: spacing.lg,
    },
    withdrawButtonText: {
        ...typography.variants.button,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
    },
    operatorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.md,
    },
    operatorButton: {
        flex: 1,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.xs,
        borderRadius: borderRadius.small,
        borderWidth: 2,
        borderColor: colors.border,
        marginHorizontal: spacing.xs,
        alignItems: 'center',
    },
    operatorButtonActive: {
        backgroundColor: colors.gray50,
    },
    operatorText: {
        ...typography.variants.bodySmall,
        color: colors.textSecondary,
    },
});
