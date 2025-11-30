import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { NotificationListener } from './src/components/NotificationListener';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';

// Keep the splash screen visible while we fetch resources
try {
  SplashScreen.preventAutoHideAsync();
} catch (e) {
  console.warn('SplashScreen.preventAutoHideAsync error:', e);
}


import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
import { LanguageProvider } from './src/context/LanguageContext';
import { ThemeProvider } from './src/context/ThemeContext';

// Initialize PubNub
const pubnub = new PubNub({
  publishKey: 'pub-c-dm1-placeholder',
  subscribeKey: 'sub-c-dm1-placeholder',
  userId: 'user-123' // Replace with actual user ID after auth
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts
        await Font.loadAsync({
          ...Ionicons.font,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <PubNubProvider client={pubnub}>
      <LanguageProvider>
        <ThemeProvider>
          <NotificationListener />
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </LanguageProvider>
    </PubNubProvider>
  );
}
