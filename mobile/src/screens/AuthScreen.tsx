import React, { useState, useEffect, useMemo } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Image,
    Alert,
    Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing, borderRadius, typography, shadows } from '../theme';
import { legacyColors } from '../theme/legacyColors';
import { useTheme } from '../context/ThemeContext';
import { LegacyThemeColors } from '../theme/legacyColors';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as LocalAuthentication from 'expo-local-authentication';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useLanguage } from '../context/LanguageContext';

type AuthScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Auth'>;
};

export const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    const [languageDropdownVisible, setLanguageDropdownVisible] = useState(false);
    const { language, setLanguage, t } = useLanguage();
    const { theme } = useTheme();
    const colors = legacyColors(theme);
    const styles = useMemo(() => createStyles(colors), [colors]);

    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            const enrolled = await LocalAuthentication.isEnrolledAsync();
            setIsBiometricSupported(compatible && enrolled);
        })();
    }, []);

    const handleLanguageSelect = (lang: string, code: string) => {
        setLanguage(code as any);
        setLanguageDropdownVisible(false);
    };

    const handleAuth = () => {
        // Simulate auth
        if (isLogin) {
            console.log('Logging in...');
        } else {
            console.log('Signing up...');
        }
        navigation.replace('MainTabs');
    };

    const handleBiometricAuth = async () => {
        try {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Login with Biometrics',
                fallbackLabel: 'Use Password',
            });

            if (result.success) {
                navigation.replace('MainTabs');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Biometric authentication failed');
        }
    };

    const handleForgotPassword = () => {
        navigation.navigate('ForgotPassword');
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.languageSwitcher}
                        onPress={() => setLanguageDropdownVisible(true)}
                    >
                        <Ionicons name="language-outline" size={20} color={colors.secondary} />
                        <Text style={styles.languageText}>{language}</Text>
                        <Ionicons name="chevron-down" size={12} color={colors.secondary} />
                    </TouchableOpacity>

                    <Image
                        source={require('../../assets/adaptive-icon.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    {/* Text branding removed as requested */}
                    <Text style={styles.welcomeText}>
                        {isLogin ? t.welcomeBack : t.createAccount}
                    </Text>
                </View>

                {/* Full Name (Sign Up only) */}
                {!isLogin && (
                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="person-outline"
                            size={20}
                            color={colors.textTertiary}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={t.fullNamePlaceholder}
                            placeholderTextColor={colors.textTertiary}
                            value={fullName}
                            onChangeText={setFullName}
                            autoCapitalize="words"
                        />
                    </View>
                )}

                {/* Email (Sign Up) or Phone/Email (Login) */}
                <View style={styles.inputContainer}>
                    <Ionicons
                        name={isLogin ? "mail-outline" : "mail-outline"}
                        size={20}
                        color={colors.textTertiary}
                        style={styles.inputIcon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={isLogin ? t.emailPlaceholder : t.emailPlaceholder}
                        placeholderTextColor={colors.textTertiary}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                {/* Phone Number (Sign Up only) */}
                {!isLogin && (
                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="call-outline"
                            size={20}
                            color={colors.textTertiary}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={t.phonePlaceholder}
                            placeholderTextColor={colors.textTertiary}
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            keyboardType="phone-pad"
                        />
                    </View>
                )}

                {/* Password */}
                <View style={styles.inputContainer}>
                    <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color={colors.textTertiary}
                        style={styles.inputIcon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={t.passwordPlaceholder}
                        placeholderTextColor={colors.textTertiary}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons
                            name={showPassword ? "eye-off-outline" : "eye-outline"}
                            size={20}
                            color={colors.textTertiary}
                        />
                    </TouchableOpacity>
                </View>

                {/* Confirm Password (Sign Up only) */}
                {!isLogin && (
                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="lock-closed-outline"
                            size={20}
                            color={colors.textTertiary}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={t.confirmPasswordPlaceholder}
                            placeholderTextColor={colors.textTertiary}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showConfirmPassword}
                        />
                        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <Ionicons
                                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                                size={20}
                                color={colors.textTertiary}
                            />
                        </TouchableOpacity>
                    </View>
                )}

                {/* Forgot Password (Login only) */}
                {isLogin && (
                    <TouchableOpacity
                        style={styles.forgotPassword}
                        onPress={handleForgotPassword}>
                        <Text style={styles.forgotPasswordText}>{t.forgotPassword}</Text>
                    </TouchableOpacity>
                )}

                {/* Auth Button */}
                <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
                    <Text style={styles.authButtonText}>
                        {isLogin ? t.login : t.signUp}
                    </Text>
                </TouchableOpacity>

                {/* Biometric Login Button */}
                {isLogin && isBiometricSupported && (
                    <TouchableOpacity
                        style={styles.biometricButton}
                        onPress={handleBiometricAuth}>
                        <Ionicons name="finger-print" size={32} color={colors.secondary} />
                        <Text style={styles.biometricText}>{t.biometricLogin}</Text>
                    </TouchableOpacity>
                )}

                {/* Toggle Login/Register */}
                <View style={styles.toggleContainer}>
                    <Text style={styles.toggleText}>
                        {isLogin ? t.noAccount : t.hasAccount}
                    </Text>
                    <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                        <Text style={styles.toggleLink}>
                            {isLogin ? t.signUp : t.login}
                        </Text>
                    </TouchableOpacity>
                </View>


                {/* Social Login Options */}
                <View style={styles.socialContainer}>
                    <View style={styles.dividerContainer}>
                        <View style={styles.divider} />
                        <Text style={styles.dividerText}>{t.orContinueWith}</Text>
                        <View style={styles.divider} />
                    </View>

                    <View style={styles.socialButtons}>
                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-google" size={24} color={colors.error} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-facebook" size={24} color="#1877F2" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-apple" size={24} color={colors.textPrimary} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Language Dropdown Modal */}
            <Modal
                visible={languageDropdownVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setLanguageDropdownVisible(false)}
            >
                <TouchableOpacity
                    style={styles.dropdownOverlay}
                    activeOpacity={1}
                    onPress={() => setLanguageDropdownVisible(false)}
                >
                    <View style={styles.dropdownContainer}>
                        <Text style={styles.dropdownTitle}>{t.selectLanguage}</Text>

                        <TouchableOpacity
                            style={styles.dropdownItem}
                            onPress={() => handleLanguageSelect('English', 'EN')}
                        >
                            <Text style={styles.dropdownItemText}>English</Text>
                            {language === 'EN' && (
                                <Ionicons name="checkmark" size={20} color={colors.secondary} />
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.dropdownItem}
                            onPress={() => handleLanguageSelect('Français', 'FR')}
                        >
                            <Text style={styles.dropdownItemText}>Français</Text>
                            {language === 'FR' && (
                                <Ionicons name="checkmark" size={20} color={colors.secondary} />
                            )}
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </KeyboardAvoidingView >
    );
};

const createStyles = (colors: LegacyThemeColors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.xl,
        paddingBottom: spacing.xl,
    },
    header: {
        alignItems: 'center',
        marginBottom: spacing.xl,
        position: 'relative',
    },
    languageSwitcher: {
        position: 'absolute',
        top: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        paddingHorizontal: spacing.sm,
        paddingVertical: 6,
        borderRadius: borderRadius.small,
        gap: 4,
        ...shadows.small,
        zIndex: 10,
    },
    languageText: {
        ...typography.variants.caption,
        color: colors.secondary, // Brand color
        fontWeight: typography.fontWeight.bold,
    },
    logo: {
        width: 125,
        height: 125,
        marginBottom: spacing.sm,
        borderRadius: 3,
        marginTop: spacing.xl,
    },
    welcomeText: {
        ...typography.variants.h3,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
    dropdownOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.lg,
    },
    dropdownContainer: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.medium,
        padding: spacing.md,
        width: '80%',
        maxWidth: 300,
        ...shadows.large,
    },
    dropdownTitle: {
        ...typography.variants.h3,
        color: colors.textPrimary,
        marginBottom: spacing.md,
        textAlign: 'center',
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.small,
        marginBottom: spacing.xs,
    },
    dropdownItemText: {
        ...typography.variants.body,
        color: colors.textPrimary,
    },
    formContainer: {
        marginBottom: spacing.xl,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: borderRadius.medium,
        paddingHorizontal: spacing.sm,
        marginBottom: spacing.md,
        ...shadows.small,
    },
    inputIcon: {
        marginRight: spacing.sm,
    },
    input: {
        flex: 1,
        paddingVertical: spacing.sm,
        ...typography.variants.body,
        color: colors.textPrimary,
    },
    eyeIcon: {
        padding: spacing.xs,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: spacing.lg,
    },
    forgotPasswordText: {
        ...typography.variants.caption,
        color: colors.secondary, // Brand color
        fontWeight: typography.fontWeight.medium,
    },
    authButton: {
        backgroundColor: colors.secondary, // Brand color
        paddingVertical: spacing.md,
        borderRadius: borderRadius.medium,
        alignItems: 'center',
        ...shadows.medium,
    },
    authButtonText: {
        ...typography.variants.button,
        color: colors.textInverse,
    },
    biometricButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.lg,
        padding: spacing.sm,
    },
    biometricText: {
        ...typography.variants.body,
        color: colors.secondary, // Brand color
        marginLeft: spacing.sm,
        fontWeight: typography.fontWeight.medium,
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: spacing.xl,
    },
    toggleText: {
        ...typography.variants.body,
        color: colors.textSecondary,
    },
    toggleLink: {
        ...typography.variants.body,
        color: colors.secondary, // Brand color
        fontWeight: typography.fontWeight.bold,
    },
    socialContainer: {
        marginTop: spacing.lg,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: colors.divider,
    },
    dividerText: {
        ...typography.variants.caption,
        color: colors.textSecondary,
        marginHorizontal: spacing.md,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: spacing.lg,
    },
    socialButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.small,
        borderWidth: 1,
        borderColor: colors.border,
    },
});
