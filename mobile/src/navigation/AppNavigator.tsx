import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthScreen } from '../screens/AuthScreen';
import { TabNavigator } from './TabNavigator';
import { ComingSoonScreen } from '../screens/ComingSoonScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen';
import { ResetPasswordScreen } from '../screens/ResetPasswordScreen';
import { PaymentMethodsScreen } from '../screens/PaymentMethodsScreen';
import { SendMoneyScreen } from '../screens/SendMoneyScreen';
import { BillPayScreen } from '../screens/BillPayScreen';
import { AirtimeScreen } from '../screens/AirtimeScreen';
import { TransactionDetailsScreen } from '../screens/TransactionDetailsScreen';
import { NotificationSettingsScreen } from '../screens/NotificationSettingsScreen';
import { PersonalInformationScreen } from '../screens/PersonalInformationScreen';
import { SecurityPrivacyScreen } from '../screens/SecurityPrivacyScreen';
import { LanguageScreen } from '../screens/LanguageScreen';
import { SavingsScreen } from '../screens/SavingsScreen';
import { ReceiveMoneyScreen } from '../screens/ReceiveMoneyScreen';
import { WithdrawScreen } from '../screens/WithdrawScreen';
import { RewardsScreen } from '../screens/RewardsScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { CryptoExchangeScreen } from '../screens/CryptoExchangeScreen';

export type RootStackParamList = {
    Splash: undefined;
    Auth: undefined;
    MainTabs: undefined;
    ComingSoon: undefined;
    ForgotPassword: undefined;
    ResetPassword: undefined;
    PaymentMethods: undefined;
    SendMoney: { recipient?: string; amount?: string } | undefined;
    BillPay: undefined;
    Airtime: undefined;
    Savings: undefined;
    ReceiveMoney: undefined;
    Withdraw: undefined;
    Rewards: undefined;
    CryptoExchange: undefined;
    Notifications: undefined;
    TransactionDetails: { transaction: any };
    NotificationSettings: undefined;
    PersonalInformation: undefined;
    SecurityPrivacy: undefined;
    Language: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: true, title: '' }} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen
                name="PaymentMethods"
                component={PaymentMethodsScreen}
                options={{
                    headerShown: true,
                    title: 'Payment Methods',
                }}
            />
            <Stack.Screen name="SendMoney" component={SendMoneyScreen} />
            <Stack.Screen name="BillPay" component={BillPayScreen} />
            <Stack.Screen name="Airtime" component={AirtimeScreen} />
            <Stack.Screen name="Savings" component={SavingsScreen} />
            <Stack.Screen name="ReceiveMoney" component={ReceiveMoneyScreen} />
            <Stack.Screen name="Withdraw" component={WithdrawScreen} />
            <Stack.Screen name="Rewards" component={RewardsScreen} />
            <Stack.Screen name="CryptoExchange" component={CryptoExchangeScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen
                name="TransactionDetails"
                component={TransactionDetailsScreen}
                options={{
                    headerShown: true,
                    title: 'Transaction Details',
                }}
            />
            <Stack.Screen
                name="NotificationSettings"
                component={NotificationSettingsScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="PersonalInformation"
                component={PersonalInformationScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="SecurityPrivacy"
                component={SecurityPrivacyScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Language"
                component={LanguageScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ComingSoon"
                component={ComingSoonScreen}
                options={{
                    headerShown: true,
                    title: 'Coming Soon',
                }}
            />
        </Stack.Navigator>
    );
};
