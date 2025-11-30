import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { spacing, borderRadius, typography, shadows, colors as baseColors } from '../theme';
import { useTheme } from '../context/ThemeContext';
import { legacyColors, LegacyThemeColors } from '../theme/legacyColors';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import { TransactionModal } from '../components/TransactionModal';
import PaymentService from '../services/PaymentService';

interface SavingsGoal {
    id: string;
    title: string;
    targetAmount: number;
    savedAmount: number;
    icon: string;
    color: string;
}

export const SavingsScreen: React.FC = () => {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const colors = legacyColors(theme);
    const styles = useMemo(() => createStyles(colors), [colors]);

    const [goals, setGoals] = useState<SavingsGoal[]>([
        {
            id: '1',
            title: 'New Car',
            targetAmount: 3500000,
            savedAmount: 1500000,
            icon: 'car-sport',
            color: baseColors.secondary
        },
        {
            id: '2',
            title: 'House Rent',
            targetAmount: 600000,
            savedAmount: 450000,
            icon: 'home',
            color: baseColors.secondary
        }
    ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [newGoalName, setNewGoalName] = useState('');
    const [newGoalAmount, setNewGoalAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddGoal = () => {
        if (!newGoalName || !newGoalAmount) {
            setErrorMessage(t.fillAllFields);
            setErrorModalVisible(true);
            return;
        }

        const newGoal: SavingsGoal = {
            id: Date.now().toString(),
            title: newGoalName,
            targetAmount: parseFloat(newGoalAmount),
            savedAmount: 0,
            icon: 'wallet',
            color: baseColors.secondary
        };

        setGoals([...goals, newGoal]);
        setModalVisible(false);
        setNewGoalName('');
        setNewGoalAmount('');
        setSuccessModalVisible(true);
    };

    const handleWithdraw = async () => {
        if (!selectedGoal || !withdrawAmount || !accountNumber) {
            setErrorMessage(t.fillAllFields);
            setErrorModalVisible(true);
            return;
        }

        const amount = parseFloat(withdrawAmount);
        if (amount > selectedGoal.savedAmount) {
            setErrorMessage('Insufficient balance in this goal');
            setErrorModalVisible(true);
            return;
        }

        const isGoalComplete = selectedGoal.savedAmount >= selectedGoal.targetAmount;
        const fee = isGoalComplete ? 0 : amount * 0.02; // 2% fee if goal not met, free if complete

        setLoading(true);
        try {
            const response = await PaymentService.withdraw({
                amount: amount,
                phone: accountNumber,
                operator: 'MTN',
                reference: `WITHDRAW-${Date.now()}`
            });

            if (response.success) {
                // Update goal balance
                setGoals(goals.map(g =>
                    g.id === selectedGoal.id
                        ? { ...g, savedAmount: g.savedAmount - amount }
                        : g
                ));

                setWithdrawModalVisible(false);
                setWithdrawAmount('');
                setAccountNumber('');
                setSelectedGoal(null);
                setSuccessModalVisible(true);
            } else {
                setErrorMessage(response.message || 'Withdrawal failed');
                setErrorModalVisible(true);
            }
        } catch (error) {
            setErrorMessage('An error occurred during withdrawal');
            setErrorModalVisible(true);
        } finally {
            setLoading(false);
        }
    };

    const calculateProgress = (saved: number, target: number) => {
        return Math.min((saved / target) * 100, 100);
    };

    const formatCurrency = (amount: number) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const isGoalComplete = (goal: SavingsGoal) => {
        return goal.savedAmount >= goal.targetAmount;
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>{t.mySavings}</Text>
                    <Text style={styles.totalSavings}>XAF {formatCurrency(goals.reduce((acc, goal) => acc + goal.savedAmount, 0))}</Text>
                    <Text style={styles.subtitle}>{t.totalBalance}</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>{t.savingsGoals}</Text>
                        <TouchableOpacity
                            style={styles.addGoalHeaderButton}
                            onPress={() => setModalVisible(true)}
                        >
                            <Ionicons name="add-circle" size={28} color={colors.secondary} />
                        </TouchableOpacity>
                    </View>

                    {goals.map((goal) => (
                        <View key={goal.id} style={styles.goalCard}>
                            <View style={[styles.goalIcon, { backgroundColor: goal.color }]}>
                                <Ionicons name={goal.icon as any} size={20} color={colors.textInverse} />
                            </View>
                            <View style={styles.goalInfo}>
                                <View style={styles.goalHeader}>
                                    <Text style={styles.goalTitle}>{goal.title}</Text>
                                    {isGoalComplete(goal) && (
                                        <View style={styles.completeBadge}>
                                            <Ionicons name="checkmark-circle" size={14} color={colors.success} />
                                            <Text style={styles.completeText}>Done</Text>
                                        </View>
                                    )}
                                </View>
                                <View style={styles.progressBar}>
                                    <View style={[styles.progressFill, { width: `${calculateProgress(goal.savedAmount, goal.targetAmount)}%`, backgroundColor: goal.color }]} />
                                </View>
                                <Text style={styles.goalAmount}>
                                    {formatCurrency(goal.savedAmount)} / {formatCurrency(goal.targetAmount)} XAF
                                </Text>

                                {goal.savedAmount > 0 && (
                                    <TouchableOpacity
                                        style={styles.withdrawButton}
                                        onPress={() => {
                                            setSelectedGoal(goal);
                                            setWithdrawModalVisible(true);
                                        }}
                                    >
                                        <Ionicons name="cash-outline" size={14} color={colors.secondary} />
                                        <Text style={styles.withdrawButtonText}>
                                            Withdraw {isGoalComplete(goal) ? '(Free)' : '(2% fee)'}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    ))}

                    <View style={styles.promoCard}>
                        <Ionicons name="trending-up" size={32} color={colors.textInverse} />
                        <View style={styles.promoContent}>
                            <Text style={styles.promoTitle}>{t.highYieldSavings}</Text>
                            <Text style={styles.promoText}>{t.highYieldDesc}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Add Goal Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{t.createGoal}</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Ionicons name="close" size={24} color={colors.textPrimary} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.label}>{t.goalName}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={t.enterGoalDetails}
                            value={newGoalName}
                            onChangeText={setNewGoalName}
                        />

                        <Text style={styles.label}>{t.targetAmount}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="0.00"
                            keyboardType="numeric"
                            value={newGoalAmount}
                            onChangeText={setNewGoalAmount}
                        />

                        <TouchableOpacity style={styles.createButton} onPress={handleAddGoal}>
                            <Text style={styles.createButtonText}>{t.createGoal}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Withdraw Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={withdrawModalVisible}
                onRequestClose={() => setWithdrawModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Withdraw from {selectedGoal?.title}</Text>
                            <TouchableOpacity onPress={() => setWithdrawModalVisible(false)}>
                                <Ionicons name="close" size={24} color={colors.textPrimary} />
                            </TouchableOpacity>
                        </View>

                        {selectedGoal && isGoalComplete(selectedGoal) && (
                            <View style={styles.freeWithdrawBanner}>
                                <Ionicons name="gift" size={20} color={colors.success} />
                                <Text style={styles.freeWithdrawText}>
                                    🎉 Goal complete! Withdraw for FREE
                                </Text>
                            </View>
                        )}

                        <Text style={styles.availableBalance}>
                            Available: XAF {selectedGoal ? formatCurrency(selectedGoal.savedAmount) : '0'}
                        </Text>

                        <Text style={styles.label}>Withdrawal Amount</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="0.00"
                            keyboardType="numeric"
                            value={withdrawAmount}
                            onChangeText={setWithdrawAmount}
                        />

                        <Text style={styles.label}>Account Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter mobile money number"
                            keyboardType="phone-pad"
                            value={accountNumber}
                            onChangeText={setAccountNumber}
                        />

                        {selectedGoal && !isGoalComplete(selectedGoal) && withdrawAmount && (
                            <Text style={styles.feeNotice}>
                                Fee: XAF {formatCurrency(parseFloat(withdrawAmount) * 0.02)} (2%)
                            </Text>
                        )}

                        <TouchableOpacity
                            style={[styles.createButton, loading && { opacity: 0.7 }]}
                            onPress={handleWithdraw}
                            disabled={loading}
                        >
                            <Text style={styles.createButtonText}>
                                {loading ? t.loading : 'Withdraw'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <TransactionModal
                visible={successModalVisible}
                type="success"
                title={t.success}
                message={withdrawModalVisible ? 'Withdrawal successful!' : t.goalCreated}
                onPrimaryPress={() => setSuccessModalVisible(false)}
                primaryButtonText={t.ok}
            />

            <TransactionModal
                visible={errorModalVisible}
                type="error"
                title={t.error}
                message={errorMessage}
                onPrimaryPress={() => setErrorModalVisible(false)}
                primaryButtonText={t.ok}
            />
        </View>
    );
};

const createStyles = (colors: LegacyThemeColors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingTop: 40,
        paddingBottom: spacing.md,
        paddingHorizontal: spacing.md,
        backgroundColor: colors.secondary, // Brand color
        borderBottomLeftRadius: borderRadius.medium,
        borderBottomRightRadius: borderRadius.medium,
    },
    headerTitle: {
        ...typography.variants.bodySmall,
        color: colors.textInverse,
        opacity: 0.9,
        marginBottom: 4,
    },
    totalSavings: {
        ...typography.variants.h2,
        color: colors.textInverse,
        fontSize: 28,
        fontWeight: typography.fontWeight.bold,
    },
    subtitle: {
        ...typography.variants.caption,
        color: colors.white,
        opacity: 0.8,
    },
    content: {
        padding: spacing.sm,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
        marginTop: spacing.xs,
        paddingHorizontal: spacing.xs,
    },
    sectionTitle: {
        ...typography.variants.h3,
        color: colors.textPrimary,
    },
    addGoalHeaderButton: {
        padding: 4,
    },
    goalCard: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        padding: spacing.sm,
        borderRadius: borderRadius.small,
        marginBottom: 8,
        ...shadows.small,
    },
    goalIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.sm,
    },
    goalInfo: {
        flex: 1,
    },
    goalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
    },
    goalTitle: {
        ...typography.variants.body,
        fontWeight: typography.fontWeight.bold,
        color: colors.textPrimary,
        fontSize: 15,
    },
    completeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.successLight + '30',
        paddingHorizontal: spacing.xs,
        paddingVertical: 1,
        borderRadius: borderRadius.small,
    },
    completeText: {
        ...typography.variants.caption,
        color: colors.success,
        marginLeft: 4,
        fontWeight: typography.fontWeight.bold,
        fontSize: 10,
    },
    progressBar: {
        height: 4,
        backgroundColor: colors.divider,
        borderRadius: 2,
        marginBottom: 4,
        marginTop: 4,
    },
    progressFill: {
        height: '100%',
        borderRadius: 2,
    },
    goalAmount: {
        ...typography.variants.caption,
        color: colors.textSecondary,
        fontSize: 11,
        marginBottom: 2,
    },
    withdrawButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    withdrawButtonText: {
        ...typography.variants.caption,
        color: colors.secondary,
        marginLeft: spacing.xs,
        fontWeight: typography.fontWeight.medium,
        fontSize: 11,
    },
    addGoalButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.secondary,
        padding: spacing.sm,
        borderRadius: borderRadius.small,
        marginTop: spacing.sm,
        marginBottom: spacing.sm,
        ...shadows.small,
    },
    addGoalButtonText: {
        ...typography.variants.button,
        color: colors.white,
        marginLeft: spacing.xs,
        fontWeight: typography.fontWeight.bold,
    },
    promoCard: {
        flexDirection: 'row',
        backgroundColor: colors.secondary,
        padding: spacing.md,
        borderRadius: borderRadius.small,
        alignItems: 'center',
        marginTop: spacing.sm,
    },
    promoContent: {
        marginLeft: spacing.sm,
        flex: 1,
    },
    promoTitle: {
        ...typography.variants.body,
        color: colors.white,
        fontWeight: typography.fontWeight.bold,
        marginBottom: 2,
    },
    promoText: {
        ...typography.variants.caption,
        color: colors.white,
        opacity: 0.9,
        fontSize: 11,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: spacing.md,
    },
    modalContent: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.medium,
        padding: spacing.md,
        ...shadows.large,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    modalTitle: {
        ...typography.variants.h3,
        color: colors.textPrimary,
        flex: 1,
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
    createButton: {
        backgroundColor: colors.secondary,
        padding: spacing.md,
        borderRadius: borderRadius.medium,
        alignItems: 'center',
        marginTop: spacing.lg,
    },
    createButtonText: {
        ...typography.variants.button,
        color: colors.white,
    },
    availableBalance: {
        ...typography.variants.body,
        color: colors.success,
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    feeNotice: {
        ...typography.variants.caption,
        color: colors.warning,
        marginTop: spacing.sm,
        textAlign: 'center',
    },
    freeWithdrawBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.successLight + '30',
        padding: spacing.sm,
        borderRadius: borderRadius.small,
        marginBottom: spacing.md,
    },
    freeWithdrawText: {
        ...typography.variants.bodySmall,
        color: colors.success,
        marginLeft: spacing.xs,
        fontWeight: typography.fontWeight.bold,
    },
});
