import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useLanguage } from '../context/LanguageContext';

export const ForgotPasswordScreen: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { t } = useLanguage();

    const handleSendOTP = async () => {
        if (!email) {
            Alert.alert(t.error, t.enterEmailOrPhoneError);
            return;
        }

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            Alert.alert(
                t.otpSentTitle,
                t.otpSentMessage,
                [{ text: t.ok, onPress: () => navigation.navigate('ResetPassword') }]
            );
        }, 1500);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="lock-closed" size={60} color={colors.primary} />
                <Text style={styles.title}>{t.forgotPasswordTitle}</Text>
                <Text style={styles.subtitle}>
                    {t.forgotPasswordSubtitle}
                </Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Ionicons name="mail-outline" size={20} color={colors.gray500} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder={t.emailOrPhonePlaceholder}
                        placeholderTextColor={colors.gray400}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleSendOTP}
                    disabled={loading}>
                    <Text style={styles.buttonText}>
                        {loading ? t.sending : t.sendVerificationCode}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={20} color={colors.primary} />
                    <Text style={styles.backText}>{t.backToLogin}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.lg,
    },
    header: {
        alignItems: 'center',
        marginTop: spacing.xxl * 2,
        marginBottom: spacing.xl,
    },
    title: {
        ...typography.variants.h2,
        color: colors.textPrimary,
        marginTop: spacing.md,
        marginBottom: spacing.sm,
    },
    subtitle: {
        ...typography.variants.body,
        color: colors.textSecondary,
        textAlign: 'center',
        paddingHorizontal: spacing.md,
    },
    form: {
        marginTop: spacing.xl,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: borderRadius.medium,
        paddingHorizontal: spacing.sm,
        marginBottom: spacing.lg,
        ...shadows.small,
    },
    icon: {
        marginRight: spacing.sm,
    },
    input: {
        flex: 1,
        paddingVertical: spacing.sm,
        ...typography.variants.body,
        color: colors.textPrimary,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.medium,
        alignItems: 'center',
        ...shadows.medium,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        ...typography.variants.button,
        color: colors.secondary,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.xl,
    },
    backText: {
        ...typography.variants.body,
        color: colors.primary,
        marginLeft: spacing.xs,
        fontWeight: typography.fontWeight.medium,
    },
});
