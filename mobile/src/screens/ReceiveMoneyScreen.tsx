import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, ScrollView } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../context/LanguageContext';
import QRCode from 'react-native-qrcode-svg';

export const ReceiveMoneyScreen: React.FC = () => {
    const navigation = useNavigation();
    const { t } = useLanguage();

    // Mock user data - in production, this would come from auth context
    const userPhone = '+237670000000';
    const userName = 'John Doe';

    // QR code data format: opaycam://pay?phone=+237670000000&name=John+Doe
    const qrData = `opaycam://pay?phone=${encodeURIComponent(userPhone)}&name=${encodeURIComponent(userName)}`;

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Send money to ${userName} via OpayCam\nPhone: ${userPhone}\n\nScan my QR code or use the OpayCam app!`,
                title: 'Receive Money - OpayCam'
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const copyToClipboard = () => {
        // In a real app, use Clipboard API
        console.log('Copied:', userPhone);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.title}>Receive Money</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.qrContainer}>
                    <View style={styles.qrWrapper}>
                        <QRCode
                            value={qrData}
                            size={220}
                            backgroundColor={colors.white}
                            color={colors.textPrimary}
                        />
                    </View>
                    <Text style={styles.qrLabel}>Scan to send money</Text>
                </View>

                <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                        <Ionicons name="person-outline" size={20} color={colors.textSecondary} />
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoLabel}>Name</Text>
                            <Text style={styles.infoValue}>{userName}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <Ionicons name="phone-portrait-outline" size={20} color={colors.textSecondary} />
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoLabel}>Phone Number</Text>
                            <Text style={styles.infoValue}>{userPhone}</Text>
                        </View>
                        <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
                            <Ionicons name="copy-outline" size={20} color={colors.primary} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.instructionsCard}>
                    <Text style={styles.instructionsTitle}>How to receive money</Text>
                    <View style={styles.instructionItem}>
                        <View style={styles.stepNumber}>
                            <Text style={styles.stepNumberText}>1</Text>
                        </View>
                        <Text style={styles.instructionText}>
                            Share your QR code or phone number with the sender
                        </Text>
                    </View>
                    <View style={styles.instructionItem}>
                        <View style={styles.stepNumber}>
                            <Text style={styles.stepNumberText}>2</Text>
                        </View>
                        <Text style={styles.instructionText}>
                            Sender scans your QR code or enters your phone number
                        </Text>
                    </View>
                    <View style={styles.instructionItem}>
                        <View style={styles.stepNumber}>
                            <Text style={styles.stepNumberText}>3</Text>
                        </View>
                        <Text style={styles.instructionText}>
                            You'll receive a notification when money arrives
                        </Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                    <Ionicons name="share-social" size={20} color={colors.secondary} style={styles.shareIcon} />
                    <Text style={styles.shareButtonText}>Share Payment Info</Text>
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
        padding: spacing.md,
    },
    qrContainer: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    qrWrapper: {
        padding: spacing.lg,
        backgroundColor: colors.white,
        borderRadius: borderRadius.large,
        ...shadows.large,
        marginBottom: spacing.md,
    },
    qrLabel: {
        ...typography.variants.body,
        color: colors.textSecondary,
        textAlign: 'center',
    },
    infoCard: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.medium,
        padding: spacing.md,
        marginBottom: spacing.md,
        ...shadows.small,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.sm,
    },
    infoTextContainer: {
        flex: 1,
        marginLeft: spacing.md,
    },
    infoLabel: {
        ...typography.variants.caption,
        color: colors.textSecondary,
        marginBottom: 2,
    },
    infoValue: {
        ...typography.variants.body,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.medium,
    },
    copyButton: {
        padding: spacing.xs,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: spacing.xs,
    },
    instructionsCard: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.medium,
        padding: spacing.md,
        marginBottom: spacing.md,
        ...shadows.small,
    },
    instructionsTitle: {
        ...typography.variants.h4,
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    instructionItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: spacing.sm,
    },
    stepNumber: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.sm,
    },
    stepNumberText: {
        ...typography.variants.caption,
        color: colors.secondary,
        fontWeight: typography.fontWeight.bold,
    },
    instructionText: {
        ...typography.variants.bodySmall,
        color: colors.textSecondary,
        flex: 1,
        lineHeight: 20,
    },
    shareButton: {
        flexDirection: 'row',
        backgroundColor: colors.primary,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.medium,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadows.medium,
    },
    shareIcon: {
        marginRight: spacing.xs,
    },
    shareButtonText: {
        ...typography.variants.button,
        color: colors.textPrimary, // Dark text on yellow for better contrast
        fontWeight: typography.fontWeight.bold,
    },
});
