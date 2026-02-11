import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, FlatList } from 'react-native';
import { spacing, colors } from '@theme';
import { Card } from '@/components/ui/Card'; // Importamos tu componente Card

const SkeletonBase = ({ style }: { style?: any }) => {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0.6,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [opacity]);

    return <Animated.View style={[styles.skeleton, style, { opacity }]} />;
};

export const ChallengeCardSkeleton = () => (
    <Card variant="shadow" style={styles.cardContainer}>
        <View style={styles.header}>
            <SkeletonBase style={styles.iconSquare} />
            <View style={styles.badgeContainer}>
                <SkeletonBase style={styles.badge} />
                <SkeletonBase style={styles.badge} />
            </View>
        </View>
        
        <View style={styles.body}>
            <SkeletonBase style={styles.titleLine} />
            <SkeletonBase style={styles.descLine} />
            <SkeletonBase style={[styles.descLine, { width: '60%' }]} />
        </View>
        
        <View style={styles.footer}>
            <SkeletonBase style={styles.durationLine} />
            <SkeletonBase style={styles.buttonPlaceholder} />
        </View>
    </Card>
);

export const ProgressCardSkeleton = () => (
    <Card variant="shadow" style={styles.progressCardContainer}>
        <View style={styles.row}>
            <SkeletonBase style={styles.statusCircle} />
            <View style={styles.infoCenter}>
                <SkeletonBase style={styles.titleSmall} />
                <SkeletonBase style={styles.badgeSmall} />
                <SkeletonBase style={styles.dateSmall} />
            </View>
            <View style={styles.actionRight}>
                <SkeletonBase style={styles.scoreBadge} />
                <SkeletonBase style={styles.viewButton} />
            </View>
        </View>
    </Card>
);

export const ChallengeListSkeleton = ({ isProgress = false }: { isProgress?: boolean }) => (
    <FlatList
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(item) => item.toString()}
        renderItem={() => isProgress ? <ProgressCardSkeleton /> : <ChallengeCardSkeleton />}
        contentContainerStyle={styles.listPadding}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        showsVerticalScrollIndicator={false}
    />
);

const styles = StyleSheet.create({
    skeleton: {
        backgroundColor: '#E2E8F0',
        borderRadius: 8,
    },
    listPadding: {
        paddingHorizontal: spacing.md, 
        paddingTop: spacing.md,
        paddingBottom: 100 
    },
    cardContainer: {
        padding: spacing.md,
        borderRadius: 16,
    },
    progressCardContainer: {
        padding: spacing.md,
        borderRadius: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.md
    },
    iconSquare: {
        width: 44,
        height: 44,
        borderRadius: 12
    },
    badgeContainer: {
        alignItems: 'flex-end',
        gap: 6
    },
    badge: {
        width: 80,
        height: 22,
        borderRadius: 20
    },
    body: {
        marginBottom: spacing.lg,
        gap: 8
    },
    titleLine: {
        height: 22,
        width: '70%',
        marginBottom: 4
    },
    descLine: {
        height: 14,
        width: '100%'
    },
    footer: {
        gap: spacing.sm
    },
    durationLine: {
        height: 16,
        width: 60
    },
    buttonPlaceholder: {
        height: 46,
        width: '100%',
        borderRadius: 12
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    statusCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: spacing.sm
    },
    infoCenter: {
        flex: 1,
        gap: 6
    },
    titleSmall: {
        height: 16,
        width: '80%'
    },
    badgeSmall: {
        height: 18,
        width: 60,
        borderRadius: 6
    },
    dateSmall: {
        height: 12,
        width: 100
    },
    actionRight: {
        alignItems: 'flex-end',
        gap: 8,
        marginLeft: spacing.sm
    },
    scoreBadge: {
        width: 70,
        height: 22,
        borderRadius: 8
    },
    viewButton: {
        width: 90,
        height: 24,
        borderRadius: 6
    },
});