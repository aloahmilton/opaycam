import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { colors, spacing, typography } from '../theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type SplashScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

export const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
    const textScale = useRef(new Animated.Value(1)).current;
    const textOpacity = useRef(new Animated.Value(1)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const taglineOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Start with text visible, then zoom + fade out
        setTimeout(() => {
            Animated.parallel([
                Animated.timing(textScale, {
                    toValue: 2, // Bigger zoom for more dramatic effect
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(textOpacity, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                // After text disappears, show logo and tagline
                Animated.parallel([
                    Animated.timing(logoOpacity, {
                        toValue: 1,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                    Animated.timing(taglineOpacity, {
                        toValue: 1,
                        duration: 600,
                        delay: 200,
                        useNativeDriver: true,
                    }),
                ]).start();
            });
        }, 800);

        // Navigate to Auth
        const timer = setTimeout(() => {
            navigation.replace('Auth');
        }, 3500);

        return () => clearTimeout(timer);
    }, [navigation, textScale, textOpacity, logoOpacity, taglineOpacity]);

    return (
        <View style={styles.container}>
            {/* Text that zooms and fades out */}
            <Animated.View
                style={[
                    styles.brandContainer,
                    {
                        opacity: textOpacity,
                        transform: [{ scale: textScale }]
                    }
                ]}
            >
                <Text style={styles.oText}>O</Text>
                <Text style={styles.payText}>Pay</Text>
                <Text style={styles.camText}>Cam</Text>
            </Animated.View>

            {/* Logo appears after text disappears */}
            <Animated.Image
                source={require('../../assets/adaptive-icon.png')}
                style={[styles.logo, { opacity: logoOpacity }]}
                resizeMode="contain"
            />

            {/* Tagline appears under logo */}
            <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
                Fast, Secure & Reliable
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    brandContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
    },
    oText: {
        fontSize: 54, // Increased from 48
        fontWeight: typography.fontWeight.bold,
        color: colors.secondary,
        letterSpacing: -1,
    },
    payText: {
        fontSize: 54, // Increased from 48
        fontWeight: typography.fontWeight.bold,
        color: colors.secondary,
        letterSpacing: -1,
    },
    camText: {
        fontSize: 54, // Increased from 48
        fontWeight: typography.fontWeight.bold,
        color: colors.primary,
        letterSpacing: -1,
    },
    logo: {
        width: 180, // Increased from 160
        height: 180, // Increased from 160
        borderRadius: 3,
        marginBottom: spacing.xs,
    },
    tagline: {
        ...typography.variants.body,
        color: colors.textSecondary,
        fontSize: 18, // Increased from 16
        letterSpacing: 0.5,
        marginTop: spacing.xs, // Increased spacing slightly
    },
});
