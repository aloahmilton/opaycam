import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const LANGUAGES = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', countries: 'Cameroon, Kenya, Uganda, Rwanda' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', countries: 'Cameroon, Benin, Côte d\'Ivoire, Rwanda' },
    { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪', countries: 'Kenya, Uganda' },
    { code: 'rw', name: 'Kinyarwanda', nativeName: 'Ikinyarwanda', flag: '🇷🇼', countries: 'Rwanda' },
];

export const LanguageScreen: React.FC = () => {
    const navigation = useNavigation();
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const handleSelectLanguage = (code: string) => {
        setSelectedLanguage(code);
        // In a real app, this would update the app's language
        setTimeout(() => navigation.goBack(), 300);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.title}>Language</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.description}>
                    Select your preferred language. The app will restart to apply changes.
                </Text>

                {LANGUAGES.map((language) => (
                    <TouchableOpacity
                        key={language.code}
                        style={[
                            styles.languageItem,
                            selectedLanguage === language.code && styles.selectedLanguageItem
                        ]}
                        onPress={() => handleSelectLanguage(language.code)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.flag}>{language.flag}</Text>
                        <View style={styles.languageTextContainer}>
                            <Text style={styles.languageName}>{language.name}</Text>
                            <Text style={styles.languageNativeName}>{language.nativeName}</Text>
                        </View>
                        {selectedLanguage === language.code && (
                            <Ionicons name="checkmark-circle" size={24} color={colors.secondary} />
                        )}
                    </TouchableOpacity>
                ))}
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
        padding: spacing.sm,
    },
    description: {
        ...typography.variants.body,
        color: colors.textSecondary,
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    languageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        padding: spacing.sm,
        borderRadius: borderRadius.medium,
        marginBottom: spacing.xs,
        ...shadows.small,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedLanguageItem: {
        borderColor: colors.secondary, // Brand color
        backgroundColor: colors.secondary + '10',
    },
    flag: {
        fontSize: 28,
        marginRight: spacing.sm,
    },
    languageTextContainer: {
        flex: 1,
    },
    languageName: {
        ...typography.variants.body,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.medium,
    },
    languageNativeName: {
        ...typography.variants.caption,
        color: colors.textSecondary,
        marginTop: 2,
    },
});
