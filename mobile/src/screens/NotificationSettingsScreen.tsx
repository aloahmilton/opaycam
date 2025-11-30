import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../context/LanguageContext';

export const NotificationSettingsScreen: React.FC = () => {
    const navigation = useNavigation();
    const { t } = useLanguage();

    const [settings, setSettings] = useState({
        paymentReceived: true,
        paymentSent: true,
        promotions: false,
        securityAlerts: true,
        newFeatures: true,
    });

    const toggleSwitch = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const renderSettingItem = (
        key: keyof typeof settings,
        title: string,
        description: string,
        icon: keyof typeof Ionicons.glyphMap,
        iconColor: string
    ) => (
        <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}>
                    <Ionicons name={icon} size={22} color={iconColor} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.settingTitle}>{title}</Text>
                    <Text style={styles.settingDescription}>{description}</Text>
                </View>
            </View>
            <Switch
                trackColor={{ false: colors.gray300, true: colors.primary }}
                thumbColor={colors.white}
                ios_backgroundColor={colors.gray300}
                onValueChange={() => toggleSwitch(key)}
                value={settings[key]}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.title}>{t.notifications}</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionHeader}>{t.transactional}</Text>
                <View style={styles.section}>
                    {renderSettingItem(
                        'paymentReceived',
                        t.paymentReceived,
                        t.paymentReceivedDesc,
                        'arrow-down-circle',
                        colors.success
                    )}
                    <View style={styles.divider} />
                    {renderSettingItem(
                        'paymentSent',
                        t.paymentSent,
                        t.paymentSentDesc,
                        'arrow-up-circle',
                        colors.error
                    )}
                </View>

                <Text style={styles.sectionHeader}>{t.security}</Text>
                <View style={styles.section}>
                    {renderSettingItem(
                        'securityAlerts',
                        t.securityAlerts,
                        t.securityAlertsDesc,
                        'shield-checkmark',
                        colors.primary
                    )}
                    <View style={styles.divider} />
                    {renderSettingItem(
                        'promotions',
                        t.promotions,
                        t.promotionsDesc,
                        'gift',
                        colors.secondary
                    )}
                    <View style={styles.divider} />
                    {renderSettingItem(
                        'newFeatures',
                        t.newFeaturesNotif,
                        t.newFeaturesNotifDesc,
                        'rocket',
                        colors.warning
                    )}
                </View>
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
    sectionHeader: {
        ...typography.variants.h3,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
        marginTop: spacing.sm,
        marginLeft: spacing.xs,
    },
    section: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.medium,
        padding: spacing.sm,
        ...shadows.small,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 6,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: spacing.md,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    textContainer: {
        flex: 1,
    },
    settingTitle: {
        ...typography.variants.body,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.medium,
    },
    settingDescription: {
        ...typography.variants.caption,
        color: colors.textSecondary,
        marginTop: 2,
    },
    divider: {
        height: 1,
        backgroundColor: colors.divider,
        marginVertical: spacing.sm,
    },
});
