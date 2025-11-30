import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const PersonalInformationScreen: React.FC = () => {
    const navigation = useNavigation();

    const [fullName, setFullName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');
    const [phoneNumber, setPhoneNumber] = useState('+237 670 000 000');
    const [dateOfBirth, setDateOfBirth] = useState('01/01/1990');
    const [address, setAddress] = useState('Douala, Cameroon');
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        Alert.alert('Success', 'Your information has been updated');
        setIsEditing(false);
    };

    const renderField = (
        label: string,
        value: string,
        onChangeText: (text: string) => void,
        icon: keyof typeof Ionicons.glyphMap,
        keyboardType: 'default' | 'email-address' | 'phone-pad' = 'default'
    ) => (
        <View style={styles.fieldContainer}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
                <Ionicons name={icon} size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                    style={[styles.input, !isEditing && styles.inputDisabled]}
                    value={value}
                    onChangeText={onChangeText}
                    editable={isEditing}
                    keyboardType={keyboardType}
                />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.title}>Personal Information</Text>
                <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
                    <Ionicons name={isEditing ? "close" : "create-outline"} size={24} color={colors.primary} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {renderField('Full Name', fullName, setFullName, 'person-outline')}
                {renderField('Email', email, setEmail, 'mail-outline', 'email-address')}
                {renderField('Phone Number', phoneNumber, setPhoneNumber, 'call-outline', 'phone-pad')}
                {renderField('Date of Birth', dateOfBirth, setDateOfBirth, 'calendar-outline')}
                {renderField('Address', address, setAddress, 'location-outline')}

                {isEditing && (
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    </TouchableOpacity>
                )}

                <View style={styles.infoBox}>
                    <Ionicons name="information-circle" size={20} color={colors.primary} />
                    <Text style={styles.infoText}>
                        Your personal information is encrypted and secure. We never share your data with third parties.
                    </Text>
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
    fieldContainer: {
        marginBottom: spacing.sm,
    },
    label: {
        ...typography.variants.bodySmall,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
        fontWeight: typography.fontWeight.medium,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: borderRadius.medium,
        padding: spacing.sm,
        ...shadows.small,
    },
    inputIcon: {
        marginRight: spacing.sm,
    },
    input: {
        flex: 1,
        ...typography.variants.body,
        color: colors.textPrimary,
    },
    inputDisabled: {
        color: colors.textSecondary,
    },
    saveButton: {
        backgroundColor: colors.primary,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.medium,
        alignItems: 'center',
        marginTop: spacing.md,
        ...shadows.medium,
    },
    saveButtonText: {
        ...typography.variants.button,
        color: colors.secondary,
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: colors.primary + '10',
        padding: spacing.sm,
        borderRadius: borderRadius.medium,
        marginTop: spacing.md,
    },
    infoText: {
        flex: 1,
        ...typography.variants.caption,
        color: colors.textSecondary,
        marginLeft: spacing.sm,
    },
});
