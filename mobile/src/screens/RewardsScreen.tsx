import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../context/LanguageContext';

interface Reward {
    id: string;
    title: string;
    description: string;
    points: number;
    icon: string;
    color: string;
    claimed: boolean;
}

export const RewardsScreen: React.FC = () => {
    const navigation = useNavigation();
    const { t } = useLanguage();

    // State management
    const [userPoints, setUserPoints] = useState(1250);
    const [selectedTab, setSelectedTab] = useState<'available' | 'history'>('available');
    const [claimedRewardIds, setClaimedRewardIds] = useState<string[]>([]);
    const [rewardHistory, setRewardHistory] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // All available rewards (before filtering claimed ones)
    const allRewards: Reward[] = [
        {
            id: '1',
            title: '500 XAF Cashback',
            description: 'Get 500 XAF added to your wallet',
            points: 500,
            icon: 'cash-outline',
            color: colors.success,
            claimed: false,
        },
        {
            id: '2',
            title: '1000 XAF Cashback',
            description: 'Get 1000 XAF added to your wallet',
            points: 1000,
            icon: 'cash-outline',
            color: colors.secondary,
            claimed: false,
        },
        {
            id: '3',
            title: 'Free Airtime 500 XAF',
            description: 'Get 500 XAF free airtime',
            points: 400,
            icon: 'phone-portrait-outline',
            color: colors.info,
            claimed: false,
        },
        {
            id: '4',
            title: 'Free Transfer (5x)',
            description: 'Get 5 free money transfers',
            points: 300,
            icon: 'paper-plane-outline',
            color: colors.secondary,
            claimed: false,
        },
        {
            id: '5',
            title: '2000 XAF Cashback',
            description: 'Get 2000 XAF added to your wallet',
            points: 2000,
            icon: 'cash-outline',
            color: colors.error,
            claimed: false,
        },
    ];

    // Filter out claimed rewards from available list
    const availableRewards = allRewards.filter(reward => !claimedRewardIds.includes(reward.id));

    // Load rewards data from storage on component mount
    useEffect(() => {
        loadRewardsData();
    }, []);

    const loadRewardsData = async () => {
        try {
            const storedPoints = await AsyncStorage.getItem('userPoints');
            const storedClaimedIds = await AsyncStorage.getItem('claimedRewardIds');
            const storedHistory = await AsyncStorage.getItem('rewardHistory');

            if (storedPoints !== null) {
                setUserPoints(parseInt(storedPoints));
            }
            if (storedClaimedIds !== null) {
                setClaimedRewardIds(JSON.parse(storedClaimedIds));
            }
            if (storedHistory !== null) {
                setRewardHistory(JSON.parse(storedHistory));
            }
        } catch (error) {
            console.error('Error loading rewards data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveRewardsData = async (points: number, claimedIds: string[], history: any[]) => {
        try {
            await AsyncStorage.setItem('userPoints', points.toString());
            await AsyncStorage.setItem('claimedRewardIds', JSON.stringify(claimedIds));
            await AsyncStorage.setItem('rewardHistory', JSON.stringify(history));
        } catch (error) {
            console.error('Error saving rewards data:', error);
        }
    };

    const handleClaimReward = (reward: Reward) => {
        if (userPoints >= reward.points) {
            // Update points
            const newPoints = userPoints - reward.points;
            setUserPoints(newPoints);

            // Add to claimed IDs
            const newClaimedIds = [...claimedRewardIds, reward.id];
            setClaimedRewardIds(newClaimedIds);

            // Add to history
            const newHistoryItem = {
                id: `h${Date.now()}`,
                title: reward.title,
                points: reward.points,
                date: new Date().toISOString().split('T')[0],
                status: 'Redeemed',
            };
            const newHistory = [newHistoryItem, ...rewardHistory];
            setRewardHistory(newHistory);

            // Save to storage
            saveRewardsData(newPoints, newClaimedIds, newHistory);

            Alert.alert(
                'Success!',
                `You have successfully claimed: ${reward.title}!\n\nRemaining Points: ${newPoints}`,
                [{ text: 'OK' }]
            );
        } else {
            Alert.alert(
                'Insufficient Points',
                `You need ${reward.points - userPoints} more points to claim this reward.`,
                [{ text: 'OK' }]
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.title}>Rewards</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Points Card */}
                <View style={styles.pointsCard}>
                    <View style={styles.pointsIconContainer}>
                        <Ionicons name="star" size={32} color={colors.white} />
                    </View>
                    <View style={styles.pointsInfo}>
                        <Text style={styles.pointsLabel}>Your Points</Text>
                        <Text style={styles.pointsAmount}>{userPoints.toLocaleString()}</Text>
                    </View>
                    <TouchableOpacity style={styles.infoButton}>
                        <Ionicons name="information-circle-outline" size={24} color={colors.textSecondary} />
                    </TouchableOpacity>
                </View>

                {/* How to Earn Card */}
                <View style={styles.earnCard}>
                    <Text style={styles.earnTitle}>How to Earn Points</Text>
                    <View style={styles.earnItem}>
                        <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                        <Text style={styles.earnText}>Send Money: 10 points per 1000 XAF</Text>
                    </View>
                    <View style={styles.earnItem}>
                        <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                        <Text style={styles.earnText}>Pay Bills: 5 points per transaction</Text>
                    </View>
                    <View style={styles.earnItem}>
                        <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                        <Text style={styles.earnText}>Buy Airtime: 3 points per 1000 XAF</Text>
                    </View>
                    <View style={styles.earnItem}>
                        <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                        <Text style={styles.earnText}>Savings Goals: 20 points when completed</Text>
                    </View>
                </View>

                {/* Tabs */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, selectedTab === 'available' && styles.tabActive]}
                        onPress={() => setSelectedTab('available')}
                    >
                        <Text style={[styles.tabText, selectedTab === 'available' && styles.tabTextActive]}>
                            Available Rewards
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, selectedTab === 'history' && styles.tabActive]}
                        onPress={() => setSelectedTab('history')}
                    >
                        <Text style={[styles.tabText, selectedTab === 'history' && styles.tabTextActive]}>
                            History
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Content */}
                {selectedTab === 'available' ? (
                    <View>
                        {availableRewards.map((reward) => (
                            <View key={reward.id} style={styles.rewardCard}>
                                <View style={[styles.rewardIcon, { backgroundColor: reward.color + '20' }]}>
                                    <Ionicons name={reward.icon as any} size={28} color={reward.color} />
                                </View>
                                <View style={styles.rewardInfo}>
                                    <Text style={styles.rewardTitle}>{reward.title}</Text>
                                    <Text style={styles.rewardDescription}>{reward.description}</Text>
                                    <View style={styles.pointsBadge}>
                                        <Ionicons name="star" size={14} color={colors.secondary} />
                                        <Text style={styles.pointsText}>{reward.points} points</Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={[
                                        styles.claimButton,
                                        userPoints < reward.points && styles.claimButtonDisabled
                                    ]}
                                    onPress={() => handleClaimReward(reward)}
                                    disabled={userPoints < reward.points}
                                >
                                    <Text style={styles.claimButtonText}>
                                        {userPoints >= reward.points ? 'Claim' : 'Locked'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                ) : (
                    <View>
                        {rewardHistory.map((item) => (
                            <View key={item.id} style={styles.historyCard}>
                                <View style={styles.historyInfo}>
                                    <Text style={styles.historyTitle}>{item.title}</Text>
                                    <Text style={styles.historyDate}>{item.date}</Text>
                                </View>
                                <View style={styles.historyRight}>
                                    <Text style={styles.historyPoints}>-{item.points} pts</Text>
                                    <View style={styles.statusBadge}>
                                        <Text style={styles.statusText}>{item.status}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
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
    pointsCard: {
        flexDirection: 'row',
        backgroundColor: colors.secondary, // Brand color
        padding: spacing.md,
        borderRadius: borderRadius.medium,
        alignItems: 'center',
        marginBottom: spacing.md,
        ...shadows.medium,
    },
    pointsIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.white + '30',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    pointsInfo: {
        flex: 1,
    },
    pointsLabel: {
        ...typography.variants.caption,
        color: colors.white, // White text on blue card
        opacity: 0.8,
    },
    pointsAmount: {
        ...typography.variants.h1,
        color: colors.white, // White text on blue card
        fontWeight: typography.fontWeight.bold,
    },
    infoButton: {
        padding: spacing.xs,
    },
    earnCard: {
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: borderRadius.medium,
        marginBottom: spacing.md,
        ...shadows.small,
    },
    earnTitle: {
        ...typography.variants.body,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.sm,
    },
    earnItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    earnText: {
        ...typography.variants.bodySmall,
        color: colors.textSecondary,
        marginLeft: spacing.sm,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        borderRadius: borderRadius.medium,
        padding: 4,
        marginBottom: spacing.md,
    },
    tab: {
        flex: 1,
        paddingVertical: spacing.sm,
        alignItems: 'center',
        borderRadius: borderRadius.small,
    },
    tabActive: {
        backgroundColor: colors.secondary, // Brand color
    },
    tabText: {
        ...typography.variants.bodySmall,
        color: colors.textSecondary,
    },
    tabTextActive: {
        color: colors.white, // White text on blue tab
        fontWeight: typography.fontWeight.bold,
    },
    rewardCard: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: borderRadius.medium,
        marginBottom: spacing.sm,
        alignItems: 'center',
        ...shadows.small,
    },
    rewardIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    rewardInfo: {
        flex: 1,
    },
    rewardTitle: {
        ...typography.variants.body,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
        marginBottom: 4,
    },
    rewardDescription: {
        ...typography.variants.caption,
        color: colors.textSecondary,
        fontSize: 11,
        marginBottom: 4,
    },
    pointsBadge: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pointsText: {
        ...typography.variants.caption,
        color: colors.secondary, // Brand color
        marginLeft: 4,
        fontWeight: typography.fontWeight.bold,
    },
    claimButton: {
        backgroundColor: colors.secondary, // Brand color
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.small,
    },
    claimButtonDisabled: {
        backgroundColor: colors.gray300,
    },
    claimButtonText: {
        ...typography.variants.bodySmall,
        color: colors.white, // White text on blue button
        fontWeight: typography.fontWeight.bold,
    },
    historyCard: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: borderRadius.medium,
        marginBottom: spacing.sm,
        ...shadows.small,
    },
    historyInfo: {
        flex: 1,
    },
    historyTitle: {
        ...typography.variants.body,
        color: colors.textPrimary,
        marginBottom: 4,
    },
    historyDate: {
        ...typography.variants.caption,
        color: colors.textSecondary,
        fontSize: 11,
    },
    historyRight: {
        alignItems: 'flex-end',
    },
    historyPoints: {
        ...typography.variants.bodySmall,
        color: colors.error,
        fontWeight: typography.fontWeight.bold,
        marginBottom: 4,
    },
    statusBadge: {
        backgroundColor: colors.success + '20',
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: borderRadius.small,
    },
    statusText: {
        ...typography.variants.caption,
        color: colors.success,
        fontSize: 10,
        fontWeight: typography.fontWeight.bold,
    },
});
