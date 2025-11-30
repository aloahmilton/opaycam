import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useLanguage } from '../context/LanguageContext';

export const ProfileScreen: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [darkMode, setDarkMode] = React.useState(false);
    const { t, language } = useLanguage();

    const handleLogout = () => {
        navigation.replace('Auth');
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/adaptive-icon.png')}
                    style={styles.avatar}
                />
                <Text style={styles.name}>John Doe</Text>
                <Text style={styles.email}>john.doe@example.com</Text>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{t.verifiedUser}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t.account}</Text>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PersonalInformation')}>
                    <Ionicons name="person-outline" size={24} color={colors.textPrimary} />
                    <Text style={styles.menuText}>{t.personalInformation}</Text>
                    <Ionicons name="chevron-forward" size={20} color={colors.gray400} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PaymentMethods')}>
                    <Ionicons name="card-outline" size={24} color={colors.textPrimary} />
                    <Text style={styles.menuText}>{t.paymentMethods}</Text>
                    <Ionicons name="chevron-forward" size={20} color={colors.gray400} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('SecurityPrivacy')}>
                    <Ionicons name="shield-checkmark-outline" size={24} color={colors.textPrimary} />
                    <Text style={styles.menuText}>{t.securityPrivacy}</Text>
                    <Ionicons name="chevron-forward" size={20} color={colors.gray400} />
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t.settings}</Text>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('NotificationSettings')}>
                    <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
                    <Text style={styles.menuText}>{t.notifications}</Text>
                    <Ionicons name="chevron-forward" size={20} color={colors.gray400} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Language')}>
                    <Ionicons name="language-outline" size={24} color={colors.textPrimary} />
                    <Text style={styles.menuText}>{t.language}</Text>
                    <Text style={styles.valueText}>{language === 'EN' ? 'English' : 'Français'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => setDarkMode(!darkMode)}>
                    <Ionicons name="moon-outline" size={24} color={colors.textPrimary} />
                    <Text style={styles.menuText}>{t.darkMode}</Text>
                    <Ionicons name="toggle" size={24} color={colors.primary} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={24} color={colors.error} />
                <Text style={styles.logoutText}>{t.logOut}</Text>
            </TouchableOpacity>

            <Text style={styles.version}>{t.version} 1.0.0</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: spacing.xl,
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: spacing.md,
    },
    name: {
        ...typography.variants.h2,
        color: colors.textPrimary,
        marginBottom: spacing.xs,
    },
    email: {
        ...typography.variants.body,
        color: colors.textSecondary,
        marginBottom: spacing.md,
    },
    badge: {
        backgroundColor: colors.success + '20',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.large,
    },
    badgeText: {
        ...typography.variants.caption,
        color: colors.success,
        fontWeight: typography.fontWeight.bold,
    },
    section: {
        marginTop: spacing.lg,
        paddingHorizontal: spacing.lg,
    },
    sectionTitle: {
        ...typography.variants.h3,
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: borderRadius.medium,
        marginBottom: spacing.sm,
        ...shadows.small,
    },
    menuText: {
        flex: 1,
        ...typography.variants.body,
        color: colors.textPrimary,
        marginLeft: spacing.md,
    },
    valueText: {
        ...typography.variants.bodySmall,
        color: colors.textSecondary,
        marginRight: spacing.sm,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.xl,
        marginBottom: spacing.md,
        padding: spacing.md,
    },
    logoutText: {
        ...typography.variants.body,
        color: colors.error,
        fontWeight: typography.fontWeight.bold,
        marginLeft: spacing.sm,
    },
    version: {
        textAlign: 'center',
        ...typography.variants.caption,
        color: colors.gray400,
        marginBottom: spacing.xl,
    },
});
