import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { Ionicons } from '@expo/vector-icons';

interface TransactionModalProps {
    visible: boolean;
    type: 'success' | 'error' | 'loading';
    title?: string;
    message?: string;
    onClose?: () => void;
    primaryButtonText?: string;
    secondaryButtonText?: string;
    onPrimaryPress?: () => void;
    onSecondaryPress?: () => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
    visible,
    type,
    title,
    message,
    onClose,
    primaryButtonText = 'OK',
    secondaryButtonText,
    onPrimaryPress,
    onSecondaryPress,
}) => {
    const getIcon = () => {
        switch (type) {
            case 'success':
                return { name: 'checkmark-circle', color: colors.success, size: 80 };
            case 'error':
                return { name: 'close-circle', color: colors.error, size: 80 };
            case 'loading':
                return { name: 'time', color: colors.primary, size: 80 };
        }
    };

    const icon = getIcon();

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Ionicons name={icon.name as any} size={icon.size} color={icon.color} />

                    {title && <Text style={styles.title}>{title}</Text>}
                    {message && <Text style={styles.message}>{message}</Text>}

                    <View style={styles.buttonContainer}>
                        {onPrimaryPress && (
                            <TouchableOpacity
                                style={[styles.button, styles.primaryButton]}
                                onPress={onPrimaryPress}
                            >
                                <Text style={styles.primaryButtonText}>{primaryButtonText}</Text>
                            </TouchableOpacity>
                        )}

                        {secondaryButtonText && onSecondaryPress && (
                            <TouchableOpacity
                                style={[styles.button, styles.secondaryButton]}
                                onPress={onSecondaryPress}
                            >
                                <Text style={styles.secondaryButtonText}>{secondaryButtonText}</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {onClose && !onPrimaryPress && (
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Ionicons name="close" size={24} color={colors.textSecondary} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.lg,
    },
    container: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.large,
        padding: spacing.xl,
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
        ...shadows.large,
    },
    title: {
        ...typography.variants.h2,
        color: colors.textPrimary,
        marginTop: spacing.md,
        marginBottom: spacing.xs,
        textAlign: 'center',
    },
    message: {
        ...typography.variants.body,
        color: colors.textSecondary,
        textAlign: 'center',
        marginBottom: spacing.lg,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: spacing.sm,
        width: '100%',
    },
    button: {
        flex: 1,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.medium,
        alignItems: 'center',
    },
    primaryButton: {
        backgroundColor: colors.primary,
    },
    secondaryButton: {
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
    },
    primaryButtonText: {
        ...typography.variants.button,
        color: colors.textPrimary, // Dark text on yellow for better contrast
        fontWeight: typography.fontWeight.bold,
    },
    secondaryButtonText: {
        ...typography.variants.button,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
    },
    closeButton: {
        position: 'absolute',
        top: spacing.md,
        right: spacing.md,
    },
});
