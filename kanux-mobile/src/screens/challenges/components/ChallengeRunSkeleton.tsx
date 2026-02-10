import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export const SoftChallengeSkeleton = () => {
    const opacity = React.useRef(new Animated.Value(0.3)).current;
    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
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
    }, []);

    return (
        <View style={styles.container}>
            {/* Header Skeleton */}
            <View style={styles.header}>
                <Animated.View style={[styles.headerCircle, { opacity }]} />
                <Animated.View style={[styles.headerBar, { opacity }]} />
                <Animated.View style={[styles.headerCircle, { opacity }]} />
            </View>

            {/* Progress Bar Skeleton */}
            <View style={styles.progressContainer}>
                <Animated.View style={[styles.progressBar, { opacity }]} />
            </View>

            {/* Content Skeleton */}
            <View style={styles.content}>
                <Animated.View style={[styles.labelSkeleton, { opacity }]} />
                <Animated.View style={[styles.titleSkeleton, { opacity }]} />
                <Animated.View style={[styles.titleSkeleton, { opacity, width: '60%' }]} />

                {/* Options Skeleton */}
                {[1, 2, 3, 4].map((i) => (
                    <Animated.View key={i} style={[styles.optionSkeleton, { opacity }]} />
                ))}
            </View>

            {/* Footer Skeleton */}
            <View style={styles.footer}>
                <Animated.View style={[styles.footerBtn, { opacity }]} />
                <Animated.View style={[styles.footerBtn, { opacity }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 20
    },
    headerCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#E2E8F0'
    },
    headerBar: {
        width: 100,
        height: 20,
        borderRadius: 4,
        backgroundColor: '#E2E8F0'
    },
    progressContainer: {
        paddingHorizontal: 20,
        marginBottom: 20
    },
    progressBar: {
        height: 6,
        borderRadius: 3,
        backgroundColor: '#E2E8F0'
    },
    content: {
        padding: 24
    },
    labelSkeleton: {
        width: 120,
        height: 14,
        borderRadius: 4,
        backgroundColor: '#E2E8F0',
        marginBottom: 12
    },
    titleSkeleton: {
        width: '100%',
        height: 24,
        borderRadius: 4,
        backgroundColor: '#E2E8F0',
        marginBottom: 8
    },
    optionSkeleton: {
        width: '100%',
        height: 60,
        borderRadius: 16,
        backgroundColor: '#E2E8F0',
        marginTop: 15
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderColor: '#E2E8F0'
    },
    footerBtn: {
        width: 80,
        height: 20,
        borderRadius: 4,
        backgroundColor: '#E2E8F0'
    }
});