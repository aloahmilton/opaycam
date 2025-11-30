import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, TextInput, Image } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../context/LanguageContext';
import PaymentService from '../services/PaymentService';
import { TransactionModal } from '../components/TransactionModal';

const CATEGORIES = [
    { id: '1', name: 'Electricity', logo: require('../../assets/eneo.png'), color: '#A3C400' },
    { id: '2', name: 'Water', logo: require('../../assets/camwater.jpg'), color: '#0077B5' },
    { id: '3', name: 'TV', logo: require('../../assets/canalplus.png'), color: '#000000' },
    { id: '4', name: 'Internet', icon: 'wifi', color: colors.primary },
    { id: '5', name: 'Education', icon: 'school', color: colors.secondary },
    { id: '6', name: 'Taxes', icon: 'document-text', color: colors.error },
];

export const BillPayScreen: React.FC = () => {
    const navigation = useNavigation();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState<'success' | 'error'>('success');
    const [modalMessage, setModalMessage] = useState('');
    const { t } = useLanguage();

    const handlePay = async () => {
        if (!selectedCategory || !accountNumber || !amount) {
            setModalType('error');
            setModalMessage(t.fillAllFields);
            setModalVisible(true);
            return;
        }

        setLoading(true);
        try {
            const response = await PaymentService.collect({
                amount: parseFloat(amount),
                phone: accountNumber,
                operator: 'MTN',
                reference: `BILL-${Date.now()}`
            });

            if (response.success) {
                setModalType('success');
                setModalMessage('Bill paid successfully!');
                setModalVisible(true);
            } else {
                setModalType('error');
                setModalMessage(response.message || 'Payment failed');
                setModalVisible(true);
            }
        } catch (error) {
            setModalType('error');
            setModalMessage('An error occurred while processing payment');
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

    const renderCategory = ({ item }: { item: typeof CATEGORIES[0] }) => (
        <TouchableOpacity
            style={[
                styles.categoryItem,
                selectedCategory === item.id && styles.selectedCategory
            ]}
            onPress={() => setSelectedCategory(item.id)}
            activeOpacity={0.7}
        >
            <View style={[
                styles.iconContainer,
                selectedCategory === item.id && styles.selectedIconContainer
            ]}>
                {item.logo ? (
                    <Image source={item.logo} style={styles.categoryLogo} resizeMode="contain" />
                ) : (
                    <Ionicons
                        name={item.icon as any}
                        size={28}
                        color={selectedCategory === item.id ? colors.secondary : item.color}
                    />
                )}
            </View>
            <Text style={[
                styles.categoryName,
                selectedCategory === item.id && styles.selectedCategoryText
            ]}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.title}>Pay Bills</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>Select Category</Text>
                <FlatList
                    data={CATEGORIES}
                    renderItem={renderCategory}
                    keyExtractor={item => item.id}
                    numColumns={3}
                    scrollEnabled={false}
                    columnWrapperStyle={styles.row}
                />

                {selectedCategory && (
                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Account / Meter Number</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="card-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter ID number"
                                placeholderTextColor={colors.gray400}
                                value={accountNumber}
                                onChangeText={setAccountNumber}
                            />
                        </View>

                        <Text style={styles.label}>Amount</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.currency}>XAF</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="0.00"
                                placeholderTextColor={colors.gray400}
                                keyboardType="numeric"
                                value={amount}
                                onChangeText={setAmount}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.payButton, loading && { opacity: 0.7 }]}
                            onPress={handlePay}
                            disabled={loading}
                        >
                            <Text style={styles.payButtonText}>{loading ? t.loading : 'Pay Bill'}</Text>
                        </TouchableOpacity>
                    </View>
                )}
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
    sectionTitle: {
        ...typography.variants.h3,
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: spacing.md,
    },
    categoryItem: {
        width: '30%',
        alignItems: 'center',
        padding: spacing.sm,
        borderRadius: borderRadius.medium,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        ...shadows.small,
    },
    selectedCategory: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        transform: [{ scale: 1.05 }],
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.xs,
        overflow: 'hidden',
    },
    selectedIconContainer: {
        backgroundColor: colors.white,
    },
    categoryLogo: {
        width: '100%',
        height: '100%',
    },
    categoryName: {
        ...typography.variants.caption,
        color: colors.textSecondary,
        fontWeight: typography.fontWeight.medium,
    },
    selectedCategoryText: {
        color: colors.secondary,
        fontWeight: typography.fontWeight.bold,
    },
    formContainer: {
        marginTop: spacing.xl,
        backgroundColor: colors.surface,
        padding: spacing.lg,
        borderRadius: borderRadius.medium,
        ...shadows.medium,
    },
    label: {
        ...typography.variants.bodySmall,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
        marginTop: spacing.md,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingBottom: spacing.sm,
    },
    inputIcon: {
        marginRight: spacing.sm,
    },
    currency: {
        ...typography.variants.h3,
        color: colors.textPrimary,
        marginRight: spacing.sm,
        fontWeight: typography.fontWeight.bold,
    },
    input: {
        flex: 1,
        ...typography.variants.body,
        color: colors.textPrimary,
        fontSize: 16,
    },
    payButton: {
        backgroundColor: colors.primary,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.medium,
        alignItems: 'center',
        marginTop: spacing.xl,
        ...shadows.medium,
    },
    payButtonText: {
        ...typography.variants.button,
        color: colors.textPrimary, // Dark text on yellow for better contrast
    },
});
