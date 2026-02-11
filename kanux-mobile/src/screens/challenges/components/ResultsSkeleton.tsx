import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, ScrollView, SafeAreaView } from 'react-native';

const { width } = Dimensions.get('window');

const SkeletonItem = ({ style }: { style: any }) => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const opacity = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.7],
    });

    return <Animated.View style={[style, { backgroundColor: '#e2e8f0', opacity }]} />;
};

export const ResultsSkeleton = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false}>

                {/* Hero Skeleton */}
                <View style={styles.heroPlaceholder}>
                    <View style={styles.heroContent}>
                        <SkeletonItem style={styles.iconCircle} />
                        <SkeletonItem style={styles.titleLine} />
                        <SkeletonItem style={styles.subtitleLine} />
                        <SkeletonItem style={styles.scoreBadge} />
                    </View>
                </View>

                <View style={styles.mainContainer}>
                    {/* Info Row*/}
                    <View style={styles.infoRow}>
                        <SkeletonItem style={styles.infoCard} />
                        <SkeletonItem style={styles.infoCard} />
                    </View>

                    {/* AI Warning */}
                    <SkeletonItem style={styles.aiWarning} />

                    {/* Analysis Card */}
                    <View style={styles.card}>
                        <SkeletonItem style={{ width: 120, height: 12, marginBottom: 15, borderRadius: 4 }} />
                        <SkeletonItem style={{ width: '100%', height: 12, marginBottom: 8, borderRadius: 4 }} />
                        <SkeletonItem style={{ width: '100%', height: 12, marginBottom: 8, borderRadius: 4 }} />
                        <SkeletonItem style={{ width: '60%', height: 12, borderRadius: 4 }} />
                    </View>

                    {/* Stats Row */}
                    <View style={styles.statsRow}>
                        <SkeletonItem style={styles.statBox} />
                        <SkeletonItem style={styles.statBox} />
                        <SkeletonItem style={styles.statBox} />
                    </View>

                    {/* Tags */}
                    <View style={styles.tagsContainer}>
                        <SkeletonItem style={styles.tag} />
                        <SkeletonItem style={styles.tag} />
                        <SkeletonItem style={styles.tag} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8fafc'
    },
    heroPlaceholder: {
        backgroundColor: '#f1f5f9',
        paddingTop: 60,
        paddingBottom: 60,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        alignItems: 'center',
    },
    heroContent: {
        alignItems: 'center',
        width: '100%'
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 16
    },
    titleLine: {
        width: width * 0.5,
        height: 24,
        borderRadius: 8,
        marginBottom: 10
    },
    subtitleLine: {
        width: width * 0.3,
        height: 16,
        borderRadius: 8,
        marginBottom: 25
    },
    scoreBadge: {
        width: 140,
        height: 60,
        borderRadius: 24
    },

    mainContainer: {
        paddingHorizontal: 20,
        marginTop: -30
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16
    },
    infoCard: {
        flex: 1,
        height: 60,
        borderRadius: 16,
        marginHorizontal: 4
    },
    aiWarning: {
        width: '100%',
        height: 45,
        borderRadius: 12,
        marginBottom: 20
    },

    card: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 20,
        marginBottom: 16
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16
    },
    statBox: {
        width: (width - 64) / 3,
        height: 70,
        borderRadius: 16
    },

    tagsContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    tag: {
        width: 80,
        height: 32,
        borderRadius: 20,
        marginRight: 8
    }
});