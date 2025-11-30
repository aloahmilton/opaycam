import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useLanguage } from '../context/LanguageContext';
import PaymentService, { Country } from '../services/PaymentService';
import { TransactionModal } from '../components/TransactionModal';

type SendMoneyScreenRouteProp = RouteProp<RootStackParamList, 'SendMoney'>;

const MESOMB_COUNTRIES = [
    { code: 'CM', name: 'Cameroon', flag: '🇨🇲', currency: 'XAF' },
    { code: 'BJ', name: 'Benin', flag: '🇧🇯', currency: 'XOF' },
    { code: 'CI', name: 'Côte d\'Ivoire', flag: '🇨🇮', currency: 'XOF' },
    { code: 'RW', name: 'Rwanda', flag: '🇷🇼', currency: 'RWF' },
    { code: 'UG', name: 'Uganda', flag: '🇺🇬', currency: 'UGX' },
    { code: 'KE', name: 'Kenya', flag: '🇰🇪', currency: 'KES' },
];

export const SendMoneyScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute<SendMoneyScreenRouteProp>();

    const initialRecipient = route.params?.recipient || '';
    const initialAmount = route.params?.amount || '';

    const [recipient, setRecipient] = useState(initialRecipient);
    const [amount, setAmount] = useState(initialAmount);
    const [note, setNote] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(MESOMB_COUNTRIES[0]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState<'success' | 'error'>('success');
    const [modalMessage, setModalMessage] = useState('');
    const { t } = useLanguage();

    const handleSend = async () => {
        if (!recipient || !amount) {
            setModalType('error');
            setModalMessage(t.enterRecipientAndAmount);
            setModalVisible(true);
            return;
        }

        setLoading(true);
        try {
            const response = await PaymentService.collect({
                amount: parseFloat(amount),
                phone: recipient,
                operator: 'MTN',
                country: selectedCountry.code as Country,
                reference: `SEND-${Date.now()}`
            });

            if (response.success) {
                setModalType('success');
                setModalMessage(t.moneySentSuccess);
                setModalVisible(true);
            } else {
                setModalType('error');
                setModalMessage(response.message || 'Transaction failed');
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

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.title}>{t.sendMoneyTitle}</Text>
                    <View style={{ width: 24 }} />
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>{t.sendToCountryLabel}</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.countryList}>
                        {MESOMB_COUNTRIES.map((country) => (
                            <TouchableOpacity
                                key={country.code}
                                style={[
                                    styles.countryItem,
                                    selectedCountry.code === country.code && styles.countryItemSelected
                                ]}
                                onPress={() => setSelectedCountry(country)}
                            >
                                <Text style={styles.countryFlag}>{country.flag}</Text>
                                <Text style={[
                                    styles.countryName,
                                    selectedCountry.code === country.code && styles.countryNameSelected
                                ]}>
                                    {country.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <Text style={styles.label}>{t.recipient}</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="person-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder={t.recipientPlaceholder}
                            placeholderTextColor={colors.textSecondary}
                            value={recipient}
                            onChangeText={setRecipient}
                        />
                        <TouchableOpacity>
                            <Ionicons name="people-outline" size={20} color={colors.primary} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>{t.amount}</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.currency}>{selectedCountry.currency}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="0.00"
                            placeholderTextColor={colors.textSecondary}
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={setAmount}
                        />
                    </View>

                    <Text style={styles.label}>{t.noteOptional}</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="document-text-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder={t.notePlaceholder}
                            placeholderTextColor={colors.textSecondary}
                            value={note}
                            onChangeText={setNote}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.sendButton, loading && { opacity: 0.7 }]}
                    onPress={handleSend}
                    disabled={loading}
                >
                    <Text style={styles.sendButtonText}>{loading ? t.loading : t.sendMoney}</Text>
                </TouchableOpacity>
            </ScrollView>

            <TransactionModal
                visible={modalVisible}
                type={modalType}
                title={modalType === 'success' ? t.success : t.error}
                message={modalMessage}
                onPrimaryPress={handleModalClose}
                primaryButtonText={t.ok}
            />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        padding: spacing.sm,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.md,
        marginTop: spacing.sm,
    },
    backButton: {
        padding: spacing.xs,
    },
    title: {
        ...typography.variants.h2,
        color: colors.textPrimary,
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.medium,
        padding: spacing.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: spacing.md,
    },
    label: {
        ...typography.variants.body,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
        marginTop: spacing.sm,
    },
    countryList: {
        marginBottom: spacing.sm,
    },
    countryItem: {
        alignItems: 'center',
        padding: spacing.sm,
        marginRight: spacing.sm,
        borderRadius: borderRadius.small,
        backgroundColor: colors.background,
        borderWidth: 2,
        borderColor: 'transparent',
        minWidth: 80,
    },
    countryItemSelected: {
        borderColor: colors.primary,
        backgroundColor: colors.primary + '10',
    },
    countryFlag: {
        fontSize: 24,
        marginBottom: 4,
    },
    countryName: {
        ...typography.variants.caption,
        color: colors.textSecondary,
        textAlign: 'center',
    },
    countryNameSelected: {
        color: colors.primary,
        fontWeight: typography.fontWeight.bold,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingBottom: spacing.xs,
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
    sendButton: {
        backgroundColor: colors.primary,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.medium,
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    sendButtonText: {
        ...typography.variants.button,
        color: colors.textPrimary, // Dark text on yellow for better contrast
        fontWeight: typography.fontWeight.bold,
    },
});
