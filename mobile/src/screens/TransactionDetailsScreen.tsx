import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Alert } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useLanguage } from '../context/LanguageContext';

type TransactionDetailsRouteProp = RouteProp<RootStackParamList, 'TransactionDetails'>;

export const TransactionDetailsScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute<TransactionDetailsRouteProp>();
    const { t } = useLanguage();

    // Safety check: If no transaction is passed, go back or show error
    const transaction = route.params?.transaction;

    if (!transaction) {
        return (
            <View style={styles.container}>
                <View style={[styles.scrollContent, { justifyContent: 'center', flex: 1 }]}>
                    <Ionicons name="alert-circle-outline" size={60} color={colors.error} />
                    <Text style={[styles.statusText, { marginTop: spacing.md }]}>Transaction Not Found</Text>
                    <TouchableOpacity
                        style={[styles.primaryButton, { marginTop: spacing.xl, width: '100%' }]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.primaryButtonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const handleShareReceipt = async () => {
        try {
            const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Receipt</title>
                <style>
                    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #333; }
                    .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #0066CC; padding-bottom: 20px; }
                    .logo { font-size: 28px; font-weight: bold; color: #0066CC; letter-spacing: 2px; margin-bottom: 10px; }
                    .subtitle { font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 1px; }
                    .receipt-title { text-align: center; font-size: 24px; font-weight: bold; margin-bottom: 30px; color: #001F3F; }
                    .amount-section { text-align: center; background-color: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 40px; }
                    .amount-label { font-size: 14px; color: #666; margin-bottom: 5px; text-transform: uppercase; }
                    .amount { font-size: 36px; font-weight: bold; color: ${transaction.isPositive ? '#2ECC40' : '#FF4136'}; }
                    .details { margin-bottom: 40px; }
                    .row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #eee; }
                    .label { font-weight: bold; color: #555; }
                    .value { text-align: right; color: #333; }
                    .footer { text-align: center; font-size: 12px; color: #999; margin-top: 50px; line-height: 1.6; }
                    .status-badge { display: inline-block; padding: 5px 10px; border-radius: 15px; background-color: #e8f5e9; color: #2e7d32; font-size: 12px; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="logo">OPAYCAM</div>
                    <div class="subtitle">${t.officialReceipt}</div>
                </div>

                <div class="receipt-title">${t.transactionDetails}</div>

                <div class="amount-section">
                    <div class="amount-label">${t.totalAmount}</div>
                    <div class="amount">${transaction.isPositive ? '+' : '-'}${transaction.amount} XAF</div>
                    <div style="margin-top: 10px;">
                        <span class="status-badge" style="
                            background-color: ${transaction.status === 'Failed' ? '#ffebee' : transaction.status === 'Pending' ? '#fff3e0' : '#e8f5e9'}; 
                            color: ${transaction.status === 'Failed' ? '#c62828' : transaction.status === 'Pending' ? '#ef6c00' : '#2e7d32'}
                        ">
                            ${transaction.status === 'Failed' ? '✗' : transaction.status === 'Pending' ? '⏱' : '✓'} ${transaction.status || t.successful}
                        </span>
                    </div>
                </div>

                <div class="details">
                    <div class="row">
                        <span class="label">${t.transactionId}</span>
                        <span class="value">TXN-${transaction.id}${Date.now().toString().slice(-6)}</span>
                    </div>
                    <div class="row">
                        <span class="label">${t.dateTime}</span>
                        <span class="value">${transaction.date}</span>
                    </div>
                    <div class="row">
                        <span class="label">${t.transactionType}</span>
                        <span class="value">${transaction.type}</span>
                    </div>
                    <div class="row">
                        <span class="label">${t.senderRecipient}</span>
                        <span class="value">${transaction.recipient}</span>
                    </div>
                    <div class="row">
                        <span class="label">${t.paymentMethod}</span>
                        <span class="value">Mobile Money</span>
                    </div>
                    <div class="row">
                        <span class="label">${t.transactionFee}</span>
                        <span class="value">0 XAF</span>
                    </div>
                </div>

                <div class="footer">
                    <p>Thank you for using OpayCam!</p>
                    <p>
                        ${t.contactSupport}<br>
                        www.opaycam.com
                    </p>
                    <p>This is an electronically generated receipt and does not require a signature.</p>
                </div>
            </body>
            </html>
            `;

            const { uri } = await printToFileAsync({
                html: htmlContent,
                base64: false
            });

            await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });

        } catch (error) {
            Alert.alert('Error', 'Could not generate receipt. Please try again.');
            console.error(error);
        }
    };

    const handleReportIssue = () => {
        Alert.alert('Report Issue', 'Support team will contact you shortly.');
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Status Icon & Amount */}
                <View style={styles.statusContainer}>
                    <View style={[styles.iconCircle, {
                        backgroundColor: (transaction.status === 'Failed' ? colors.error :
                            transaction.status === 'Pending' ? colors.warning : colors.success) + '20'
                    }]}>
                        <Ionicons
                            name={transaction.status === 'Failed' ? "close-circle" :
                                transaction.status === 'Pending' ? "time" : "checkmark-circle"}
                            size={60}
                            color={transaction.status === 'Failed' ? colors.error :
                                transaction.status === 'Pending' ? colors.warning : colors.success}
                        />
                    </View>
                    <Text style={styles.statusText}>{transaction.status || t.successful}</Text>
                    <Text style={[styles.amountText, { color: transaction.isPositive ? colors.success : colors.textPrimary }]}>
                        {transaction.isPositive ? '+' : '-'} {transaction.amount} XAF
                    </Text>
                </View>

                {/* Receipt Card */}
                <View style={styles.receiptCard}>
                    <View style={styles.row}>
                        <Text style={styles.label}>{t.transactionType}</Text>
                        <Text style={styles.value}>{transaction.type}</Text>
                    </View>
                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <Text style={styles.label}>{transaction.isPositive ? 'From' : 'To'}</Text>
                        <Text style={styles.value}>{transaction.recipient}</Text>
                    </View>
                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <Text style={styles.label}>{t.dateTime}</Text>
                        <Text style={styles.value}>{transaction.date}</Text>
                    </View>
                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <Text style={styles.label}>{t.transactionId}</Text>
                        <Text style={styles.value}>TXN-{transaction.id}8923</Text>
                    </View>
                </View>

                {/* Actions */}
                <View style={styles.actionsContainer}>
                    <TouchableOpacity style={styles.primaryButton} onPress={handleShareReceipt}>
                        <Ionicons name="document-text-outline" size={20} color={colors.secondary} style={styles.btnIcon} />
                        <Text style={styles.primaryButtonText}>{t.shareReceipt} (PDF)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.secondaryButton} onPress={handleReportIssue}>
                        <Ionicons name="alert-circle-outline" size={20} color={colors.error} style={styles.btnIcon} />
                        <Text style={styles.secondaryButtonText}>Report an Issue</Text>
                    </TouchableOpacity>
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
    scrollContent: {
        padding: spacing.lg,
        alignItems: 'center',
    },
    statusContainer: {
        alignItems: 'center',
        marginBottom: spacing.xl,
        marginTop: spacing.lg,
    },
    iconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    statusText: {
        ...typography.variants.h3,
        color: colors.textPrimary,
        marginBottom: spacing.xs,
    },
    amountText: {
        ...typography.variants.h1,
        fontWeight: 'bold',
    },
    receiptCard: {
        width: '100%',
        backgroundColor: colors.surface,
        borderRadius: borderRadius.medium,
        padding: spacing.lg,
        ...shadows.medium,
        marginBottom: spacing.xl,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.sm,
    },
    label: {
        ...typography.variants.body,
        color: colors.textSecondary,
    },
    value: {
        ...typography.variants.body,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.medium,
        textAlign: 'right',
        flex: 1,
        marginLeft: spacing.md,
    },
    divider: {
        height: 1,
        backgroundColor: colors.divider,
        marginVertical: spacing.xs,
    },
    actionsContainer: {
        width: '100%',
        gap: spacing.md,
    },
    primaryButton: {
        backgroundColor: colors.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: spacing.md,
        borderRadius: borderRadius.medium,
        ...shadows.small,
    },
    primaryButtonText: {
        ...typography.variants.button,
        color: colors.secondary,
    },
    secondaryButton: {
        backgroundColor: colors.surface,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: spacing.md,
        borderRadius: borderRadius.medium,
        borderWidth: 1,
        borderColor: colors.divider,
    },
    secondaryButtonText: {
        ...typography.variants.button,
        color: colors.error,
    },
    btnIcon: {
        marginRight: spacing.sm,
    },
});
