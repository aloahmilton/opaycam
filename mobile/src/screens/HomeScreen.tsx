import React, { useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Image,
    Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing, borderRadius, shadows, typography } from '../theme';
import { useTheme } from '../context/ThemeContext';
import { ThemeColors } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useLanguage } from '../context/LanguageContext';

interface QuickAction {
    id: string;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
    route?: keyof RootStackParamList;
}



interface Transaction {
    id: string;
    type: string;
    recipient: string;
    amount: string;
    date: string;
    isPositive: boolean;
    status: 'Success' | 'Failed' | 'Pending';
}

const recentTransactions: Transaction[] = [
    {
        id: '1',
        type: 'Transfer',
        recipient: 'John Doe',
        amount: '5,000',
        date: 'Today, 2:30 PM',
        isPositive: false,
        status: 'Success',
    },
];

export const HomeScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [balanceVisible, setBalanceVisible] = React.useState(false);
    const [profileDrawerVisible, setProfileDrawerVisible] = React.useState(false);
    const [languageDropdownVisible, setLanguageDropdownVisible] = React.useState(false);
    const { language, setLanguage, t } = useLanguage();
    const { theme: colors, setThemeType, isDark } = useTheme();
    const styles = useMemo(() => createStyles(colors), [colors]);

    const quickActions: QuickAction[] = [
        { id: '1', label: t.sendMoney, icon: 'cash-outline', color: colors.primary, route: 'SendMoney' },
        { id: '2', label: t.receive, icon: 'wallet-outline', color: colors.secondary, route: 'ReceiveMoney' },
        { id: '3', label: t.payBills, icon: 'receipt-outline', color: colors.warning, route: 'BillPay' },
        { id: '4', label: t.airtime, icon: 'phone-portrait-outline', color: colors.success, route: 'Airtime' },
        { id: '5', label: t.savings, icon: 'trending-up-outline', color: colors.primary, route: 'Savings' },
        { id: '6', label: 'Withdraw', icon: 'cash-outline', color: colors.error, route: 'Withdraw' },
        { id: '7', label: 'Crypto', icon: 'logo-bitcoin', color: '#2563eb', route: 'CryptoExchange' },
        { id: '8', label: 'Coming Soon', icon: 'time-outline', color: colors.textTertiary, route: 'ComingSoon' },
    ];

    const handleQuickAction = (action: QuickAction) => {
        if (action.route) {
            navigation.navigate(action.route as any);
        } else {
            switch (action.id) {
                case '1':
                    navigation.navigate('SendMoney');
                    break;
                default:
                    navigation.navigate('ComingSoon');
            }
        }
    };

    const handleLanguageSelect = (lang: string, code: string) => {
        setLanguage(code as any);
        setLanguageDropdownVisible(false);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.secondary} />
            <View style={styles.header}>
                <View style={styles.headerTopRow}>
                    <TouchableOpacity
                        style={styles.profileContainer}
                        onPress={() => setProfileDrawerVisible(true)}
                    >
                        <View style={styles.profileImageContainer}>
                            <Text style={styles.profileInitials}>JD</Text>
                        </View>
                        <View style={styles.greetingContainer}>
                            <Text style={styles.welcomeSubText}>{t.welcomeBack || 'Welcome back'}</Text>
                            <Text style={styles.welcomeText}>John Doe</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.headerActions}>
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => setLanguageDropdownVisible(true)}
                        >
                            <Ionicons name="globe-outline" size={24} color={colors.textInverse} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => navigation.navigate('Notifications')}
                        >
                            <Ionicons name="notifications-outline" size={24} color={colors.textInverse} />
                            <View style={styles.notificationBadge} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceLabel}>{t.totalBalance || 'Total Balance'}</Text>
                    <View style={styles.balanceRow}>
                        <Text style={styles.balanceAmount}>
                            {balanceVisible ? 'XAF 485,250' : '••••••'}
                        </Text>
                        <TouchableOpacity
                            onPress={() => setBalanceVisible(!balanceVisible)}
                            style={styles.eyeButton}>
                            <Ionicons
                                name={balanceVisible ? 'eye' : 'eye-off'}
                                size={20}
                                color={colors.textInverse}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                    style={styles.featuredAction}
                    onPress={() => navigation.navigate('SendMoney')}
                    activeOpacity={0.8}
                >
                    <View style={styles.featuredActionLeft}>
                        <View style={styles.featuredIcon}>
                            <Ionicons name="globe-outline" size={32} color={colors.textInverse} />
                        </View>
                        <View>
                            <Text style={styles.featuredTitle}>{t.sendToCountry}</Text>
                            <Text style={styles.featuredSubtitle}>{t.fastSecure}</Text>
                        </View>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color={colors.textInverse} />
                </TouchableOpacity>

                <View style={styles.quickActionsContainer}>
                    <View style={styles.quickActionsGrid}>
                        {quickActions.map(action => (
                            <TouchableOpacity
                                key={action.id}
                                style={styles.quickActionButton}
                                activeOpacity={0.7}
                                onPress={() => handleQuickAction(action)}>
                                <View style={[styles.quickActionIconContainer, { backgroundColor: action.color + '20' }]}>
                                    <Ionicons name={action.icon} size={24} color={action.color} />
                                </View>
                                <Text style={styles.quickActionLabel}>{action.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.transactionsContainer}>
                    <View style={styles.transactionsHeader}>
                        <Text style={styles.transactionsTitle}>{t.recentTransactions}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('History' as any)}>
                            <Text style={styles.seeAllButton}>{t.seeAll}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.transactionsList}>
                        {recentTransactions.map((transaction, index) => (
                            <TouchableOpacity
                                key={transaction.id}
                                style={[
                                    styles.transactionCard,
                                    index === recentTransactions.length - 1 && { borderBottomWidth: 0 }
                                ]}
                                activeOpacity={0.7}
                                onPress={() => navigation.navigate('TransactionDetails', { transaction })}>
                                <View style={styles.transactionLeft}>
                                    <View style={[
                                        styles.transactionIcon,
                                        { backgroundColor: transaction.isPositive ? colors.success + '20' : colors.error + '20' }
                                    ]}>
                                        <Ionicons
                                            name={transaction.isPositive ? 'arrow-down' : 'arrow-up'}
                                            size={18}
                                            color={transaction.isPositive ? colors.success : colors.error}
                                        />
                                    </View>
                                    <View>
                                        <Text style={styles.transactionType}>
                                            {transaction.type}
                                        </Text>
                                        <Text style={styles.transactionRecipient}>
                                            {transaction.recipient}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.transactionRight}>
                                    <Text
                                        style={[
                                            styles.transactionAmount,
                                            transaction.isPositive && styles.transactionAmountPositive,
                                        ]}>
                                        {transaction.isPositive ? '+' : '-'}
                                        {transaction.amount} XAF
                                    </Text>
                                    <Text style={styles.transactionDate}>{transaction.date}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
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

            {/* Profile Drawer Modal */}
            <Modal
                visible={profileDrawerVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setProfileDrawerVisible(false)}
            >
                <TouchableOpacity
                    style={styles.drawerOverlay}
                    activeOpacity={1}
                    onPress={() => setProfileDrawerVisible(false)}
                >
                    <View style={styles.drawerContainer}>
                        <View style={styles.drawerHeader}>
                            <Image
                                source={require('../../assets/adaptive-icon.png')}
                                style={styles.drawerAvatar}
                            />
                            <Text style={styles.drawerName}>John Doe</Text>
                            <Text style={styles.drawerEmail}>john.doe@example.com</Text>
                        </View>

                        <ScrollView style={styles.drawerMenu}>
                            <TouchableOpacity
                                style={styles.drawerItem}
                                onPress={() => {
                                    setProfileDrawerVisible(false);
                                    navigation.navigate('PersonalInformation');
                                }}
                            >
                                <Ionicons name="person-outline" size={22} color={colors.textPrimary} />
                                <Text style={styles.drawerItemText}>Personal Info</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.drawerItem}
                                onPress={() => {
                                    setProfileDrawerVisible(false);
                                    navigation.navigate('PaymentMethods');
                                }}
                            >
                                <Ionicons name="card-outline" size={22} color={colors.textPrimary} />
                                <Text style={styles.drawerItemText}>Payment Methods</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.drawerItem}
                                onPress={() => {
                                    setProfileDrawerVisible(false);
                                    navigation.navigate('SecurityPrivacy');
                                }}
                            >
                                <Ionicons name="shield-checkmark-outline" size={22} color={colors.textPrimary} />
                                <Text style={styles.drawerItemText}>Security & Privacy</Text>
                            </TouchableOpacity>

                            <View style={styles.drawerDivider} />

                            <TouchableOpacity
                                style={styles.drawerItem}
                                onPress={() => {
                                    setProfileDrawerVisible(false);
                                    navigation.navigate('NotificationSettings');
                                }}
                            >
                                <Ionicons name="notifications-outline" size={22} color={colors.textPrimary} />
                                <Text style={styles.drawerItemText}>Notifications</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.drawerItem}
                                onPress={() => {
                                    setThemeType(isDark ? 'light' : 'dark');
                                }}
                            >
                                <Ionicons name={isDark ? "sunny-outline" : "moon-outline"} size={22} color={colors.textPrimary} />
                                <Text style={styles.drawerItemText}>{isDark ? 'Light Mode' : 'Dark Mode'}</Text>
                            </TouchableOpacity>

                            <View style={styles.drawerDivider} />

                            <TouchableOpacity
                                style={styles.drawerItem}
                                onPress={() => {
                                    setProfileDrawerVisible(false);
                                    navigation.replace('Auth');
                                }}
                            >
                                <Ionicons name="log-out-outline" size={22} color={colors.error} />
                                <Text style={[styles.drawerItemText, { color: colors.error }]}>Logout</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const createStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        backgroundColor: colors.secondary,
        paddingTop: spacing.xl,
        paddingBottom: spacing.md,
        paddingHorizontal: spacing.md,
        borderBottomLeftRadius: borderRadius.large,
        borderBottomRightRadius: borderRadius.large,
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImageContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.secondary, // Changed to brand color
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    profileInitials: {
        ...typography.variants.body,
        color: colors.textInverse,
        fontWeight: 'bold',
    },
    greetingContainer: {
        marginLeft: spacing.sm,
    },
    welcomeSubText: {
        ...typography.variants.caption,
        color: colors.textTertiary,
        fontSize: 12,
    },
    welcomeText: {
        ...typography.variants.h3,
        color: colors.textInverse,
        fontSize: 16,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    iconButton: {
        padding: 4,
        marginLeft: spacing.xs,
    },
    notificationBadge: {
        position: 'absolute',
        top: 2,
        right: 4,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.error,
        borderWidth: 1,
        borderColor: colors.secondary,
    },
    balanceContainer: {
        marginTop: spacing.xs,
        paddingHorizontal: spacing.xs,
    },
    balanceLabel: {
        ...typography.variants.bodySmall,
        color: colors.textTertiary,
        marginBottom: spacing.xxs,
    },
    balanceRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    balanceAmount: {
        ...typography.variants.h2,
        color: colors.textInverse,
        marginRight: spacing.sm,
    },
    eyeButton: {
        paddingHorizontal: spacing.xs,
        paddingVertical: 4,
        borderRadius: borderRadius.small,
    },
    content: {
        flex: 1,
    },
    featuredAction: {
        backgroundColor: colors.primary,
        marginHorizontal: spacing.sm,
        marginTop: spacing.md,
        marginBottom: spacing.sm,
        padding: spacing.md,
        borderRadius: borderRadius.medium,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...shadows.medium,
    },
    featuredActionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    featuredIcon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    featuredTitle: {
        ...typography.variants.h3,
        color: colors.secondary,
        marginBottom: 2,
    },
    featuredSubtitle: {
        ...typography.variants.caption,
        color: colors.secondary,
        opacity: 0.9,
    },
    quickActionsContainer: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.sm,
    },
    quickActionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    quickActionButton: {
        width: '23%',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    quickActionIconContainer: {
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    quickActionLabel: {
        ...typography.variants.caption,
        color: colors.textPrimary,
        textAlign: 'center',
        fontSize: 11,
    },
    transactionsContainer: {
        paddingHorizontal: spacing.sm,
        paddingBottom: spacing.md,
    },
    transactionsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    transactionsTitle: {
        ...typography.variants.h3,
        color: colors.textPrimary,
    },
    seeAllButton: {
        ...typography.variants.bodySmall,
        color: colors.secondary, // Changed to brand color
        fontWeight: typography.fontWeight.bold,
    },
    transactionsList: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.medium,
        padding: spacing.sm,
        ...shadows.small,
    },
    transactionCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.divider,
    },
    transactionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    transactionIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.sm,
    },
    transactionType: {
        ...typography.variants.bodySmall,
        fontWeight: typography.fontWeight.medium,
        color: colors.textPrimary,
        marginBottom: 2,
    },
    transactionRecipient: {
        ...typography.variants.caption,
        color: colors.textSecondary,
        fontSize: 11,
    },
    transactionRight: {
        alignItems: 'flex-end',
    },
    transactionAmount: {
        ...typography.variants.body,
        color: colors.error,
        fontWeight: typography.fontWeight.bold,
        fontSize: 14,
    },
    transactionAmountPositive: {
        color: colors.success,
    },
    transactionDate: {
        ...typography.variants.caption,
        color: colors.textSecondary,
        fontSize: 11,
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
    drawerOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    drawerContainer: {
        backgroundColor: colors.surface,
        borderTopLeftRadius: borderRadius.large,
        borderTopRightRadius: borderRadius.large,
        maxHeight: '75%',
    },
    drawerHeader: {
        alignItems: 'center',
        paddingTop: spacing.lg,
        paddingBottom: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.divider,
    },
    drawerAvatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: spacing.sm,
    },
    drawerName: {
        ...typography.variants.h3,
        color: colors.textPrimary,
        marginBottom: 2,
    },
    drawerEmail: {
        ...typography.variants.caption,
        color: colors.textSecondary,
    },
    drawerMenu: {
        paddingHorizontal: spacing.md,
        paddingTop: spacing.sm,
        maxHeight: '60%',
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.sm,
    },
    drawerItemText: {
        ...typography.variants.body,
        color: colors.textPrimary,
        marginLeft: spacing.md,
    },
    drawerDivider: {
        height: 1,
        backgroundColor: colors.divider,
        marginVertical: spacing.sm,
    },
});
