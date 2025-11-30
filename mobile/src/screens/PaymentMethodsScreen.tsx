import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';

export const PaymentMethodsScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Payment Methods Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    text: {
        ...typography.variants.h3,
        color: colors.textPrimary,
    },
});
