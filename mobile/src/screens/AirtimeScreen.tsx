import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import PaymentService from '../services/PaymentService';
import { useLanguage } from '../context/LanguageContext';
import { TransactionModal } from '../components/TransactionModal';

const NETWORKS = [
    { id: '1', name: 'MTN', logo: require('../../assets/mtn.png'), color: '#FFCC00' },
    { id: '2', name: 'Orange', logo: require('../../assets/orange.png'), color: '#FF7900' },
    { id: '3', name: 'Camtel', logo: require('../../assets/camtel.png'), color: '#0077B5' },
    { id: '4', name: 'Nexttel', logo: require('../../assets/nextel.png'), color: '#E30613' },
];

export const AirtimeScreen: React.FC = () => {
    const navigation = useNavigation();
    const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [recipientType, setRecipientType] = useState<'self' | 'others'>('self');
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState<'success' | 'error'>('success');
    const [modalMessage, setModalMessage] = useState('');
    const { t } = useLanguage();

    const handleBuy = async () => {
        if (!selectedNetwork || (!phoneNumber && recipientType === 'others') || !amount) {
            setModalType('error');
            setModalMessage(t.fillAllFields);
            setModalVisible(true);
            return;
        }

        const targetPhone = recipientType === 'self' ? '670000000' : phoneNumber;

        setLoading(true);
        try {
            const response = await PaymentService.collect({
                amount: parseFloat(amount),
                phone: targetPhone,
                operator: 'MTN',
            });

            if (response.success) {
                setModalType('success');
                setModalMessage(t.airtimeSuccess);
                setModalVisible(true);
            } else {
                setModalType('error');
                setModalMessage(response.message || t.airtimeError);
                setModalVisible(true);
            }
        } catch (error) {
            setModalType('error');
            setModalMessage(t.airtimeError);
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
                <Text style={styles.title}>{t.buyAirtime}</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        style={[styles.toggleButton, recipientType === 'self' && styles.toggleButtonActive]}
                        onPress={() => {
                            setRecipientType('self');
                            setPhoneNumber('670000000');
                        }}
                    >
                        <Text style={[styles.toggleText, recipientType === 'self' && styles.toggleTextActive]}>{t.forSelf}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleButton, recipientType === 'others' && styles.toggleButtonActive]}
                        onPress={() => {
                            setRecipientType('others');
                            setPhoneNumber('');
                        }}
                    >
                        <Text style={[styles.toggleText, recipientType === 'others' && styles.toggleTextActive]}>{t.forOthers}</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>{t.selectNetwork}</Text>
                <View style={styles.networkContainer}>
                    {NETWORKS.map((network) => (
                        <TouchableOpacity
                            key={network.id}
                            style={[
                                styles.networkItem,
                                selectedNetwork === network.id && styles.selectedNetwork,
                                { borderColor: selectedNetwork === network.id ? network.color : 'transparent' }
                            ]}
                            onPress={() => setSelectedNetwork(network.id)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.logoWrapper}>
                                <Image source={network.logo} style={styles.networkLogo} resizeMode="contain" />
                            </View>
                            <Text style={[
                                styles.networkName,
                                selectedNetwork === network.id && { color: network.color, fontWeight: 'bold' }
                            ]}>{network.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>{t.phoneNumber}</Text>
                    <View style={[styles.inputContainer, recipientType === 'self' && styles.inputDisabled]}>
                        <Ionicons name="phone-portrait-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                        <TextInput
                            style={[styles.input, recipientType === 'self' && { color: colors.textSecondary }]}
                            placeholder={t.enterPhoneNumber}
                            placeholderTextColor={colors.gray400}
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            editable={recipientType === 'others'}
                        />
                        {recipientType === 'others' && (
                            <TouchableOpacity>
                                <Ionicons name="people-outline" size={20} color={colors.primary} />
                            </TouchableOpacity>
                        )}
                    </View>

                    <Text style={styles.label}>{t.amount}</Text>
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
                        style={[styles.buyButton, loading && { opacity: 0.7 }]}
                        onPress={handleBuy}
                        disabled={loading}
                    >
                        <Text style={styles.buyButtonText}>{loading ? t.loading : t.buyAirtime}</Text>
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
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        borderRadius: borderRadius.medium,
        padding: 4,
        marginBottom: spacing.xl,
        ...shadows.small,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: spacing.sm,
        alignItems: 'center',
        borderRadius: borderRadius.small,
    },
    toggleButtonActive: {
        backgroundColor: colors.primary,
    },
    toggleText: {
        ...typography.variants.bodySmall,
        color: colors.textSecondary,
        fontWeight: typography.fontWeight.medium,
    },
    toggleTextActive: {
        color: colors.textPrimary, // Dark text on yellow for better contrast
        fontWeight: typography.fontWeight.bold,
    },
    sectionTitle: {
        ...typography.variants.h3,
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    networkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.xl,
    },
    networkItem: {
        alignItems: 'center',
        width: '23%',
        padding: spacing.xs,
        borderRadius: borderRadius.medium,
        borderWidth: 2,
        borderColor: 'transparent',
        backgroundColor: colors.surface,
        ...shadows.small,
    },
    selectedNetwork: {
        backgroundColor: colors.surface,
        transform: [{ scale: 1.05 }],
    },
    logoWrapper: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        marginBottom: spacing.xs,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    networkLogo: {
        width: '100%',
        height: '100%',
    },
    networkName: {
        ...typography.variants.caption,
        color: colors.textSecondary,
        textAlign: 'center',
    },
    formContainer: {
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
    inputDisabled: {
        opacity: 0.7,
        backgroundColor: colors.background,
        paddingHorizontal: spacing.xs,
        borderRadius: borderRadius.small,
        borderBottomWidth: 0,
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
    buyButton: {
        backgroundColor: colors.primary,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.medium,
        alignItems: 'center',
        marginTop: spacing.xl,
        ...shadows.medium,
    },
    buyButtonText: {
        ...typography.variants.button,
        color: colors.textPrimary, // Dark text on yellow for better contrast
        fontWeight: typography.fontWeight.bold,
    },
});
