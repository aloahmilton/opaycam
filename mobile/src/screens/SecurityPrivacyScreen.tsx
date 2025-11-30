import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert, TextInput } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../context/LanguageContext';

export const SecurityPrivacyScreen: React.FC = () => {
    const navigation = useNavigation();
    const { t } = useLanguage();

    const [biometricEnabled, setBiometricEnabled] = useState(true);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [transactionPin, setTransactionPin] = useState('****');
    const [isChangingPin, setIsChangingPin] = useState(false);
    const [newPin, setNewPin] = useState('');

    const handleChangePin = () => {
        if (newPin.length === 4) {
            Alert.alert(t.success, t.pinUpdatedSuccess);
            setTransactionPin('****');
            setIsChangingPin(false);
            setNewPin('');
        } else {
            Alert.alert(t.error, t.pinMustBe4Digits);
        }
    };

    const renderSecurityOption = (
        title: string,
        description: string,
        icon: keyof typeof Ionicons.glyphMap,
        value: boolean,
        onToggle: (value: boolean) => void,
        iconColor: string
    ) => (
        <View style={styles.optionContainer}>
            <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}>
                <Ionicons name={icon} size={24} color={iconColor} />
            </View>
            <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>{title}</Text>
                <Text style={styles.optionDescription}>{description}</Text>
            </View>
            <Switch
                trackColor={{ false: colors.gray300, true: colors.primary }}
                thumbColor={colors.white}
                ios_backgroundColor={colors.gray300}
                onValueChange={onToggle}
                value={value}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.title}>{t.securityPrivacy}</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>{t.authentication}</Text>
                {renderSecurityOption(
                    t.biometricLoginTitle,
                    t.biometricLoginDesc,
                    'finger-print',
                    biometricEnabled,
                    setBiometricEnabled,
                    colors.primary
                )}
                {renderSecurityOption(
                    t.twoFactorAuth,
                    t.twoFactorAuthDesc,
                    'shield-checkmark',
                    twoFactorEnabled,
                    setTwoFactorEnabled,
                    colors.success
                )}

                <Text style={styles.sectionTitle}>{t.transactionSecurity}</Text>
                <View style={styles.pinContainer}>
                    <View style={styles.pinHeader}>
                        <View style={styles.pinLeft}>
                            <View style={[styles.iconContainer, { backgroundColor: colors.warning + '20' }]}>
                                <Ionicons name="lock-closed" size={24} color={colors.warning} />
                            </View>
                            <View>
                                <Text style={styles.optionTitle}>{t.transactionPin}</Text>
                                <Text style={styles.optionDescription}>
                                    {isChangingPin ? t.enterNewPin : t.secureYourTransactions}
                                </Text>
                            </View>
                        </View>
                        {!isChangingPin && (
                            <TouchableOpacity onPress={() => setIsChangingPin(true)}>
                                <Text style={styles.changeText}>{t.change}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    {isChangingPin && (
                        <View style={styles.pinInputContainer}>
                            <TextInput
                                style={styles.pinInput}
                                placeholder={t.enterNewPinPlaceholder}
                                placeholderTextColor={colors.gray400}
                                value={newPin}
                                onChangeText={setNewPin}
                                keyboardType="number-pad"
                                maxLength={4}
                                secureTextEntry
                            />
                            <View style={styles.pinButtons}>
                                <TouchableOpacity
                                    style={[styles.pinButton, styles.cancelButton]}
                                    onPress={() => {
                                        setIsChangingPin(false);
                                        setNewPin('');
                                    }}
                                >
                                    <Text style={styles.cancelButtonText}>{t.cancel}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.pinButton, styles.saveButton]}
                                    onPress={handleChangePin}
                                >
                                    <Text style={styles.saveButtonText}>{t.save}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>

                <Text style={styles.sectionTitle}>{t.privacy}</Text>
                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="eye-off-outline" size={24} color={colors.textPrimary} />
                    <Text style={styles.menuText}>{t.privacyPolicy}</Text>
                    <Ionicons name="chevron-forward" size={20} color={colors.gray400} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="document-text-outline" size={24} color={colors.textPrimary} />
                    <Text style={styles.menuText}>{t.termsOfService}</Text>
                    <Ionicons name="chevron-forward" size={20} color={colors.gray400} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="trash-outline" size={24} color={colors.error} />
                    <Text style={[styles.menuText, { color: colors.error }]}>{t.deleteAccount}</Text>
                    <Ionicons name="chevron-forward" size={20} color={colors.gray400} />
                </TouchableOpacity>
            </ScrollView>
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
        padding: spacing.sm,
    },
    sectionTitle: {
        ...typography.variants.bodyLarge,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.semiBold,
        marginTop: spacing.md,
        marginBottom: spacing.sm,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        padding: spacing.sm,
        borderRadius: borderRadius.medium,
        marginBottom: spacing.xs,
        ...shadows.small,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    optionTextContainer: {
        flex: 1,
    },
    optionTitle: {
        ...typography.variants.body,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.medium,
    },
    optionDescription: {
        ...typography.variants.caption,
        color: colors.textSecondary,
        marginTop: 2,
    },
    pinContainer: {
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: borderRadius.medium,
        marginBottom: spacing.sm,
        ...shadows.small,
    },
    pinHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    pinLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    changeText: {
        ...typography.variants.bodySmall,
        color: colors.primary,
        fontWeight: typography.fontWeight.bold,
    },
    pinInputContainer: {
        marginTop: spacing.md,
    },
    pinInput: {
        backgroundColor: colors.background,
        padding: spacing.md,
        borderRadius: borderRadius.small,
        ...typography.variants.body,
        color: colors.textPrimary,
        textAlign: 'center',
        fontSize: 24,
        letterSpacing: 8,
    },
    pinButtons: {
        flexDirection: 'row',
        marginTop: spacing.md,
        gap: spacing.sm,
    },
    pinButton: {
        flex: 1,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.small,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: colors.gray200,
    },
    cancelButtonText: {
        ...typography.variants.bodySmall,
        color: colors.textSecondary,
        fontWeight: typography.fontWeight.medium,
    },
    saveButton: {
        backgroundColor: colors.primary,
    },
    saveButtonText: {
        ...typography.variants.bodySmall,
        color: colors.secondary,
        fontWeight: typography.fontWeight.bold,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        padding: spacing.sm,
        borderRadius: borderRadius.medium,
        marginBottom: spacing.xs,
        ...shadows.small,
    },
    menuText: {
        flex: 1,
        ...typography.variants.body,
        color: colors.textPrimary,
        marginLeft: spacing.md,
    },
});
