import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useLanguage } from '../context/LanguageContext';

export const ResetPasswordScreen: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { t } = useLanguage();

    const handleResetPassword = () => {
        if (!password || !confirmPassword) {
            Alert.alert(t.error, t.fillAllFields);
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert(t.error, t.passwordsDoNotMatch);
            return;
        }

        if (password.length < 6) {
            Alert.alert(t.error, t.passwordTooShort);
            return;
        }

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            Alert.alert(
                t.success,
                t.passwordResetSuccess,
                [{ text: t.login, onPress: () => navigation.navigate('Auth') }]
            );
        }, 1500);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Ionicons name="lock-open" size={60} color={colors.primary} />
                    <Text style={styles.title}>{t.resetPasswordTitle}</Text>
                    <Text style={styles.subtitle}>
                        {t.resetPasswordSubtitle}
                    </Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={20} color={colors.gray500} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder={t.newPasswordPlaceholder}
                            placeholderTextColor={colors.gray400}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons
                                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                size={20}
                                color={colors.gray500}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={20} color={colors.gray500} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder={t.confirmNewPasswordPlaceholder}
                            placeholderTextColor={colors.gray400}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showPassword}
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={handleResetPassword}
                        disabled={loading}>
                        <Text style={styles.buttonText}>
                            {loading ? t.resetting : t.resetPassword}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.navigate('Auth')}>
                        <Text style={styles.backText}>{t.cancel}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        flexGrow: 1,
        padding: spacing.lg,
    },
    header: {
        alignItems: 'center',
        marginTop: spacing.xxl,
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
        alignItems: 'center',
        marginTop: spacing.lg,
    },
    backText: {
        ...typography.variants.body,
        color: colors.textSecondary,
    },
});
