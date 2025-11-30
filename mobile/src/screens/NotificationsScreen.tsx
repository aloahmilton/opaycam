import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'promo' | 'alert' | 'system';
    date: string;
    read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: '1',
        title: 'Welcome to OpayCam!',
        message: 'Thanks for joining us. Start by verifying your identity to unlock all features.',
        type: 'system',
        date: '2025-11-28',
        read: true,
    },
    {
        id: '2',
        title: 'New Feature: Rewards',
        message: 'You can now earn points on every transaction! Check out the Rewards tab.',
        type: 'promo',
        date: '2025-11-30',
        read: false,
    },
    {
        id: '3',
        title: 'System Maintenance',
        message: 'Scheduled maintenance on Dec 5th from 2AM to 4AM. Services may be interrupted.',
        type: 'alert',
        date: '2025-11-29',
        read: false,
    },
];

export const NotificationsScreen: React.FC = () => {
    const navigation = useNavigation();
    const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

    const getIcon = (type: string) => {
        switch (type) {
            case 'promo': return 'gift-outline';
            case 'alert': return 'warning-outline';
            case 'system': return 'settings-outline';
            default: return 'notifications-outline';
        }
    };

    const getColor = (type: string) => {
        switch (type) {
            case 'promo': return colors.primary;
            case 'alert': return colors.error;
            case 'system': return colors.secondary;
            default: return colors.info;
        }
    };

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const renderItem = ({ item }: { item: Notification }) => (
        <TouchableOpacity
            style={[styles.notificationCard, !item.read && styles.unreadCard]}
            onPress={() => markAsRead(item.id)}
        >
            <View style={[styles.iconContainer, { backgroundColor: getColor(item.type) + '15' }]}>
                <Ionicons name={getIcon(item.type) as any} size={24} color={getColor(item.type)} />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.headerRow}>
                    <Text style={[styles.cardTitle, !item.read && styles.unreadText]}>{item.title}</Text>
                    <Text style={styles.dateText}>{item.date}</Text>
                </View>
                <Text style={styles.messageText} numberOfLines={3}>{item.message}</Text>
            </View>
            {!item.read && <View style={styles.unreadDot} />}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.title}>Notifications</Text>
                <View style={{ width: 24 }} />
            </View>

            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Ionicons name="notifications-off-outline" size={48} color={colors.gray300} />
                        <Text style={styles.emptyText}>No notifications yet</Text>
                    </View>
                }
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
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    backButton: {
        padding: spacing.xs,
    },
    title: {
        ...typography.variants.h3,
        color: colors.textPrimary,
        fontWeight: '600',
    },
    listContent: {
        padding: spacing.md,
    },
    notificationCard: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: borderRadius.medium,
        marginBottom: spacing.sm,
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: colors.border,
    },
    unreadCard: {
        backgroundColor: colors.primary + '05', // Very light primary tint
        borderColor: colors.primary + '30',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    contentContainer: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    cardTitle: {
        ...typography.variants.body,
        color: colors.textPrimary,
        fontWeight: '600',
        flex: 1,
        marginRight: spacing.sm,
    },
    unreadText: {
        fontWeight: 'bold',
        color: colors.primary,
    },
    dateText: {
        ...typography.variants.caption,
        color: colors.textSecondary,
        fontSize: 10,
    },
    messageText: {
        ...typography.variants.bodySmall,
        color: colors.textSecondary,
        lineHeight: 18,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.primary,
        position: 'absolute',
        top: spacing.md,
        right: spacing.md,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: spacing.xxl * 2,
    },
    emptyText: {
        ...typography.variants.body,
        color: colors.textSecondary,
        marginTop: spacing.md,
    },
});
