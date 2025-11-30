import React, { useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { ScanScreen } from '../screens/ScanScreen';
import { SavingsScreen } from '../screens/SavingsScreen';
import { RewardsScreen } from '../screens/RewardsScreen';
import { ComingSoonScreen } from '../screens/ComingSoonScreen';
import { spacing, shadows, typography } from '../theme';
import { useTheme } from '../context/ThemeContext';
import { legacyColors } from '../theme/legacyColors';
import { Ionicons } from '@expo/vector-icons';
import { View, Platform } from 'react-native';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
    const { theme } = useTheme();
    const colors = legacyColors(theme);
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: colors.secondary, // Brand color
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarStyle: {
                    backgroundColor: colors.surface,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    height: Platform.OS === 'ios' ? 88 : 60,
                    paddingBottom: Platform.OS === 'ios' ? 28 : 8,
                    paddingTop: 8,
                    ...shadows.medium,
                },
                tabBarLabelStyle: {
                    ...typography.variants.caption,
                    fontSize: 10,
                    fontWeight: typography.fontWeight.medium,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'History') {
                        iconName = focused ? 'time' : 'time-outline';
                    } else if (route.name === 'Scan') {
                        iconName = focused ? 'scan' : 'scan-outline';
                    } else if (route.name === 'Savings') {
                        iconName = focused ? 'wallet' : 'wallet-outline';
                    } else if (route.name === 'Rewards') {
                        iconName = focused ? 'gift' : 'gift-outline';
                    } else {
                        iconName = 'help-outline';
                    }

                    // Special styling for Scan button
                    if (route.name === 'Scan') {
                        return (
                            <View style={{
                                width: 56,
                                height: 56,
                                borderRadius: 28,
                                backgroundColor: colors.secondary, // Brand color
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 24,
                                ...shadows.medium,
                            }}>
                                <Ionicons name="scan" size={30} color={colors.textInverse} />
                            </View>
                        );
                    }

                    return <Ionicons name={iconName} size={24} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="History" component={HistoryScreen} />
            <Tab.Screen
                name="Scan"
                component={ScanScreen}
                options={{ tabBarLabel: () => null }}
            />
            <Tab.Screen name="Savings" component={SavingsScreen} />
            <Tab.Screen name="Rewards" component={RewardsScreen} />
        </Tab.Navigator>
    );
};
