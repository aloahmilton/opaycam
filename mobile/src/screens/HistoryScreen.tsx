import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useLanguage } from '../context/LanguageContext';

const transactions = [
    { id: '1', type: 'Transfer', recipient: 'John Doe', amount: '5,000', date: 'Today, 2:30 PM', isPositive: false, status: 'Success' },
    { id: '2', type: 'Received', recipient: 'Mary Smith', amount: '12,500', date: 'Today, 11:45 AM', isPositive: true, status: 'Success' },
    { id: '3', type: 'Bill Payment', recipient: 'Eneo', amount: '8,200', date: 'Yesterday', isPositive: false, status: 'Success' },
    { id: '4', type: 'Airtime', recipient: 'MTN', amount: '500', date: 'Yesterday', isPositive: false, status: 'Success' },
    { id: '5', type: 'Received', recipient: 'Work', amount: '150,000', date: 'Nov 25', isPositive: true, status: 'Success' },
];

export const HistoryScreen: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { t } = useLanguage();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{t.transactionHistory}</Text>
            </View>
            <FlatList
                data={transactions}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.transactionCard}
                        onPress={() => navigation.navigate('TransactionDetails', { transaction: item })}
                    >
                        <View style={styles.transactionLeft}>
                            <View style={[
                                styles.iconContainer,
                                { backgroundColor: item.isPositive ? colors.success + '20' : colors.error + '20' }
                            ]}>
                                <Ionicons
                                    name={item.isPositive ? 'arrow-down' : 'arrow-up'}
                                    size={20}
                                    color={item.isPositive ? colors.success : colors.error}
                                />
                            </View>
                            <View>
                                <Text style={styles.type}>{item.type}</Text>
                                <Text style={styles.recipient}>{item.recipient}</Text>
                            </View>
                        </View>
                        <View style={styles.transactionRight}>
                            <Text style={[
                                styles.amount,
                                item.isPositive && styles.amountPositive
                            ]}>
                                {item.isPositive ? '+' : '-'}{item.amount} XAF
                            </Text>
                            <Text style={styles.date}>{item.date}</Text>
                        </View>
                    </TouchableOpacity>
                )}
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
        paddingTop: 60,
        paddingBottom: spacing.md,
        paddingHorizontal: spacing.lg,
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    headerTitle: {
        ...typography.variants.h2,
        color: colors.textPrimary,
    },
    listContent: {
        padding: spacing.md,
    },
    transactionCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.md,
        backgroundColor: colors.surface,
        marginBottom: spacing.sm,
        borderRadius: borderRadius.medium,
        ...shadows.small,
    },
    transactionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    type: {
        ...typography.variants.body,
        fontWeight: typography.fontWeight.semiBold,
        color: colors.textPrimary,
    },
    recipient: {
        ...typography.variants.caption,
        color: colors.textSecondary,
    },
    transactionRight: {
        alignItems: 'flex-end',
    },
    amount: {
        ...typography.variants.body,
        fontWeight: typography.fontWeight.bold,
        color: colors.error,
    },
    amountPositive: {
        color: colors.success,
    },
    date: {
        ...typography.variants.caption,
        color: colors.textSecondary,
        marginTop: 2,
    },
});
