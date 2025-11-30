import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl, Modal, TextInput, Alert } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Feature, FeatureService } from '../services/FeatureService';

export const ComingSoonScreen: React.FC = () => {
    const navigation = useNavigation();
    const [features, setFeatures] = useState<Feature[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Feature Request Modal State
    const [modalVisible, setModalVisible] = useState(false);
    const [requestTitle, setRequestTitle] = useState('');
    const [requestDescription, setRequestDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const loadFeatures = async () => {
        try {
            const data = await FeatureService.getUpcomingFeatures();
            setFeatures(data);
        } catch (error) {
            console.error('Failed to load features', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadFeatures();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        loadFeatures();
    };

    const handleSubmitRequest = async () => {
        if (!requestTitle.trim() || !requestDescription.trim()) {
            Alert.alert('Error', 'Please fill in both the title and description.');
            return;
        }

        setSubmitting(true);
        try {
            await FeatureService.submitFeatureRequest({
                title: requestTitle,
                description: requestDescription
            });
            setModalVisible(false);
            setRequestTitle('');
            setRequestDescription('');
            Alert.alert('Success', 'Your feature request has been submitted! Thank you for helping us improve.');
        } catch (error) {
            Alert.alert('Error', 'Failed to submit request. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'In Development': return colors.info;
            case 'Testing': return colors.success;
            case 'Planned': return colors.textSecondary;
            default: return colors.primary;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.title}>Roadmap</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                contentContainerStyle={styles.content}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />}
            >
                <View style={styles.heroSection}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="rocket" size={40} color={colors.white} />
                    </View>
                    <Text style={styles.heroTitle}>What's Next?</Text>
                    <Text style={styles.heroSubtitle}>
                        We're constantly improving. Here is a sneak peek at the exciting features coming to OpayCam.
                    </Text>
                </View>

                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={colors.primary} />
                    </View>
                ) : (
                    <View style={styles.featuresList}>
                        {features.map((feature) => (
                            <View key={feature.id} style={styles.featureCard}>
                                <View style={styles.cardHeader}>
                                    <View style={[styles.iconContainer, { backgroundColor: feature.color + '15' }]}>
                                        <Ionicons name={feature.icon as any} size={24} color={feature.color} />
                                    </View>
                                    <View style={[styles.statusBadge, { borderColor: getStatusColor(feature.status) }]}>
                                        <View style={[styles.statusDot, { backgroundColor: getStatusColor(feature.status) }]} />
                                        <Text style={[styles.statusText, { color: getStatusColor(feature.status) }]}>
                                            {feature.status}
                                        </Text>
                                    </View>
                                </View>

                                <Text style={styles.featureTitle}>{feature.title}</Text>
                                <Text style={styles.featureDescription}>{feature.description}</Text>

                                {feature.eta && (
                                    <View style={styles.etaContainer}>
                                        <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
                                        <Text style={styles.etaText}>Expected: {feature.eta}</Text>
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                <View style={styles.feedbackCard}>
                    <Text style={styles.feedbackTitle}>Have a suggestion?</Text>
                    <Text style={styles.feedbackText}>
                        We build for you. Let us know what features you want to see next.
                    </Text>
                    <TouchableOpacity
                        style={styles.feedbackButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.feedbackButtonText}>Request a Feature</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Feature Request Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Request a Feature</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Ionicons name="close" size={24} color={colors.textSecondary} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.modalSubtitle}>
                            Tell us what you'd like to see in OpayCam. We read every suggestion!
                        </Text>

                        <Text style={styles.inputLabel}>Feature Title</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., Dark Mode, Split Bill"
                            value={requestTitle}
                            onChangeText={setRequestTitle}
                        />

                        <Text style={styles.inputLabel}>Description</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Describe how this feature should work..."
                            value={requestDescription}
                            onChangeText={setRequestDescription}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />

                        <TouchableOpacity
                            style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
                            onPress={handleSubmitRequest}
                            disabled={submitting}
                        >
                            {submitting ? (
                                <ActivityIndicator color={colors.white} />
                            ) : (
                                <Text style={styles.submitButtonText}>Submit Request</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    backButton: {
        padding: spacing.xs,
    },
    title: {
        ...typography.variants.h3,
        color: colors.textPrimary,
        fontWeight: '600',
    },
    content: {
        padding: spacing.md,
        paddingBottom: spacing.xl,
    },
    heroSection: {
        alignItems: 'center',
        marginBottom: spacing.xl,
        marginTop: spacing.md,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.md,
        ...shadows.medium,
    },
    heroTitle: {
        ...typography.variants.h2,
        color: colors.textPrimary,
        marginBottom: spacing.xs,
        textAlign: 'center',
    },
    heroSubtitle: {
        ...typography.variants.body,
        color: colors.textSecondary,
        textAlign: 'center',
        paddingHorizontal: spacing.lg,
        lineHeight: 22,
    },
    loadingContainer: {
        padding: spacing.xl,
        alignItems: 'center',
    },
    featuresList: {
        marginBottom: spacing.xl,
    },
    featureCard: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.medium,
        padding: spacing.md,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        ...shadows.small,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.md,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    featureTitle: {
        ...typography.variants.h4,
        color: colors.textPrimary,
        marginBottom: spacing.xs,
    },
    featureDescription: {
        ...typography.variants.bodySmall,
        color: colors.textSecondary,
        lineHeight: 20,
        marginBottom: spacing.md,
    },
    etaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.gray50,
        alignSelf: 'flex-start',
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: 4,
    },
    etaText: {
        ...typography.variants.caption,
        color: colors.textSecondary,
        marginLeft: 4,
        fontWeight: '500',
    },
    feedbackCard: {
        backgroundColor: colors.secondary + '10', // Light secondary color
        borderRadius: borderRadius.medium,
        padding: spacing.lg,
        alignItems: 'center',
    },
    feedbackTitle: {
        ...typography.variants.h4,
        color: colors.secondary,
        marginBottom: spacing.xs,
    },
    feedbackText: {
        ...typography.variants.bodySmall,
        color: colors.textSecondary,
        textAlign: 'center',
        marginBottom: spacing.md,
    },
    feedbackButton: {
        backgroundColor: colors.secondary,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.large,
    },
    feedbackButtonText: {
        color: colors.white,
        fontWeight: '600',
        fontSize: 14,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colors.surface,
        borderTopLeftRadius: borderRadius.large,
        borderTopRightRadius: borderRadius.large,
        padding: spacing.lg,
        minHeight: '60%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    modalTitle: {
        ...typography.variants.h3,
        color: colors.textPrimary,
    },
    modalSubtitle: {
        ...typography.variants.bodySmall,
        color: colors.textSecondary,
        marginBottom: spacing.lg,
    },
    inputLabel: {
        ...typography.variants.caption,
        color: colors.textPrimary,
        fontWeight: 'bold',
        marginBottom: spacing.xs,
    },
    input: {
        backgroundColor: colors.background,
        borderRadius: borderRadius.medium,
        padding: spacing.md,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        ...typography.variants.body,
    },
    textArea: {
        height: 120,
    },
    submitButton: {
        backgroundColor: colors.primary,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.medium,
        alignItems: 'center',
        marginTop: spacing.md,
    },
    submitButtonDisabled: {
        opacity: 0.7,
    },
    submitButtonText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
});
