import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ScrollView } from 'react-native';
import { colors, spacing } from '@theme';
import { Card } from '@/components/ui/Card'; // Importamos tu componente Card

export const ChallengeDetailSkeleton = () => {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0.6,
                    duration: 850,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 850,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [opacity]);

    const SkeletonBox = ({ style }: { style?: any }) => (
        <Animated.View style={[styles.skeleton, style, { opacity }]} />
    );

    return (
        <View style={styles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {/* Hero Card con Shadow */}
                <Card variant="shadow" style={styles.cardMargin}>
                    <View style={styles.heroHeader}>
                        <SkeletonBox style={styles.iconCircle} />
                        <View style={styles.heroText}>
                            <SkeletonBox style={styles.titleLine} />
                            <View style={styles.badgeRow}>
                                <SkeletonBox style={styles.tagSmall} />
                                <SkeletonBox style={styles.tagSmall} />
                                <SkeletonBox style={styles.tagSmall} />
                            </View>
                        </View>
                    </View>
                    <SkeletonBox style={styles.buttonPlaceholder} />
                </Card>

                {/* Sección Descripción */}
                <SkeletonBox style={styles.labelPlaceholder} />
                <Card variant="shadow" style={styles.cardMargin}>
                    <SkeletonBox style={styles.textLine} />
                    <SkeletonBox style={styles.textLine} />
                    <SkeletonBox style={[styles.textLine, { width: '75%' }]} />
                    <SkeletonBox style={styles.secondaryBlockPlaceholder} />
                </Card>

                {/* Sección Detalles Técnicos */}
                <SkeletonBox style={styles.labelPlaceholder} />
                <Card variant="shadow" style={styles.cardMargin}>
                    <View style={styles.rowItem}>
                        <SkeletonBox style={{ height: 14, width: 80 }} />
                        <SkeletonBox style={{ height: 14, width: 100 }} />
                    </View>
                    <View style={styles.rowItem}>
                        <SkeletonBox style={{ height: 14, width: 80 }} />
                        <SkeletonBox style={{ height: 14, width: 100 }} />
                    </View>
                    <View style={[styles.rowItem, { borderBottomWidth: 0 }]}>
                        <SkeletonBox style={{ height: 14, width: 80 }} />
                        <SkeletonBox style={{ height: 14, width: 100 }} />
                    </View>
                </Card>

                {/* Sección Empresa/Autor */}
                <SkeletonBox style={styles.labelPlaceholder} />
                <Card variant="shadow" style={styles.companyCardRow}>
                    <SkeletonBox style={styles.companyIcon} />
                    <View style={{ marginLeft: 12, flex: 1 }}>
                        <SkeletonBox style={{ height: 14, width: '40%', marginBottom: 8 }} />
                        <SkeletonBox style={{ height: 12, width: '70%' }} />
                    </View>
                </Card>
                
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: { 
        flex: 1, 
        backgroundColor: colors.backgrounds.primary || '#F8FAFC' 
    },
    scrollContent: { 
        padding: spacing.md,
        paddingBottom: 40 
    },
    skeleton: { 
        backgroundColor: '#E2E8F0',
        borderRadius: 8 
    },
    cardMargin: {
        marginBottom: spacing.md,
        padding: 20,
    },
    heroHeader: { 
        flexDirection: 'row',
        alignItems: 'center', 
        marginBottom: 20
    },
    iconCircle: {
        width: 56, 
        height: 56,
        borderRadius: 14
    },
    heroText: { 
        flex: 1, 
        marginLeft: 16 
    },
    titleLine: {
        height: 22,
        width: '90%',
        marginBottom: 10 
    },
    badgeRow: {
        flexDirection: 'row', 
        gap: 8 
    },
    tagSmall: { 
        height: 22,
        width: 65, 
        borderRadius: 6
    },
    buttonPlaceholder: {
        height: 48, 
        borderRadius: 12,
        width: '100%',
        marginTop: 5
    },
    labelPlaceholder: { 
        height: 18, 
        width: 140, 
        marginBottom: 12,
        marginTop: 8,
        marginLeft: 4
    },
    textLine: { 
        height: 14, 
        width: '100%',
        marginBottom: 10
    },
    secondaryBlockPlaceholder: { 
        height: 80, 
        width: '100%', 
        marginTop: 15, 
        borderRadius: 12,
        opacity: 0.5 
    },
    rowItem: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingVertical: 16, 
        borderBottomWidth: 1, 
        borderBottomColor: '#F1F5F9' 
    },
    companyCardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    companyIcon: { 
        width: 44, 
        height: 44,
        borderRadius: 10 
    }
});