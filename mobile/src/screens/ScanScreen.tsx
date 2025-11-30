import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { colors, spacing, typography, borderRadius } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

export const ScanScreen: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <View style={styles.permissionContainer}>
                    <Text style={styles.permissionText}>We need your permission to show the camera</Text>
                    <Button onPress={requestPermission} title="grant permission" color={colors.primary} />
                </View>
            </View>
        );
    }

    const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
        setScanned(true);
        // Mock parsing logic: assume data is just a recipient ID or name for now
        // In a real app, we'd parse a URI scheme like opaycam://pay?recipient=...&amount=...

        Alert.alert(
            "QR Code Detected",
            `Pay to: ${data}?`,
            [
                {
                    text: "Cancel",
                    onPress: () => setScanned(false),
                    style: "cancel"
                },
                {
                    text: "Pay Now",
                    onPress: () => {
                        setScanned(false);
                        // Navigate to SendMoney with the scanned data
                        navigation.navigate('SendMoney', {
                            recipient: data,
                            amount: '500' // Mock amount or extract from QR if available
                        });
                    }
                }
            ]
        );
    };

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={facing}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
            />
            <View style={styles.overlay}>
                <View style={styles.header}>
                    <Text style={styles.title}>Scan QR Code</Text>
                    <Text style={styles.subtitle}>Align code within the frame to pay</Text>
                </View>

                <View style={styles.scanFrameContainer}>
                    <View style={styles.scanFrame} />
                    <View style={styles.cornerTL} />
                    <View style={styles.cornerTR} />
                    <View style={styles.cornerBL} />
                    <View style={styles.cornerBR} />
                </View>

                <View style={styles.controls}>
                    <TouchableOpacity style={styles.iconButton} onPress={toggleCameraFacing}>
                        <Ionicons name="camera-reverse-outline" size={28} color={colors.white} />
                    </TouchableOpacity>

                    <View style={styles.flashButtonPlaceholder} />

                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="image-outline" size={28} color={colors.white} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        padding: spacing.lg,
    },
    permissionText: {
        ...typography.variants.body,
        textAlign: 'center',
        marginBottom: spacing.md,
        color: colors.textPrimary,
    },
    camera: {
        flex: 1,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'space-between',
        paddingVertical: spacing.xxl,
    },
    header: {
        alignItems: 'center',
        marginTop: spacing.xl,
    },
    title: {
        ...typography.variants.h2,
        color: colors.white,
        marginBottom: spacing.xs,
    },
    subtitle: {
        ...typography.variants.body,
        color: colors.white,
        opacity: 0.8,
    },
    scanFrameContainer: {
        alignSelf: 'center',
        width: 260,
        height: 260,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    scanFrame: {
        width: 260,
        height: 260,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        borderRadius: borderRadius.large,
    },
    cornerTL: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 40,
        height: 40,
        borderTopWidth: 4,
        borderLeftWidth: 4,
        borderColor: colors.primary,
        borderTopLeftRadius: borderRadius.large,
    },
    cornerTR: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 40,
        height: 40,
        borderTopWidth: 4,
        borderRightWidth: 4,
        borderColor: colors.primary,
        borderTopRightRadius: borderRadius.large,
    },
    cornerBL: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 40,
        height: 40,
        borderBottomWidth: 4,
        borderLeftWidth: 4,
        borderColor: colors.primary,
        borderBottomLeftRadius: borderRadius.large,
    },
    cornerBR: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 40,
        height: 40,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderColor: colors.primary,
        borderBottomRightRadius: borderRadius.large,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
        marginBottom: spacing.lg,
    },
    iconButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flashButtonPlaceholder: {
        width: 50,
    }
});
