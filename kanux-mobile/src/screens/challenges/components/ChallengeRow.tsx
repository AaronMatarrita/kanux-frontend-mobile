import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckCircle2, Eye } from 'lucide-react-native';
import { spacing, typography } from '@/theme';
import { Card } from '@/components/ui/Card'; // Asumiendo esta ruta

interface ProgressChallengeProps {
    title: string;
    difficulty: string;
    date: string;
    score: number;
    onPress: () => void;
}

const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
        case 'básico': return { text: '#059669', bg: '#ecfdf5', border: '#d1fae5' };
        case 'intermedio': return { text: '#d97706', bg: '#fffbeb', border: '#fef3c7' };
        case 'avanzado': return { text: '#dc2626', bg: '#fef2f2', border: '#fee2e2' };
        default: return { text: '#64748b', bg: '#f1f5f9', border: '#e2e8f0' };
    }
};

export const ProgressChallengeCard: React.FC<ProgressChallengeProps> = ({
    title,
    difficulty,
    date,
    score,
    onPress
}) => {
    const diffStyle = getDifficultyColor(difficulty);

    return (
        <Card variant="shadow" style={styles.cardContainer} >
            <View style={styles.content}>
                {/* Check Icon */}
                <View style={styles.statusIcon}>
                    <CheckCircle2 size={24} color="#10b981" />
                </View>

                {/* Info Center */}
                <View style={styles.infoContainer}>
                    <Text style={styles.title} numberOfLines={1}>
                        {title}
                    </Text>
                    <View style={styles.metaColumn}>
                        <View style={[styles.difficultyBadge, { backgroundColor: diffStyle.bg, borderColor: diffStyle.border }]}>
                            <Text style={[styles.difficultyText, { color: diffStyle.text }]}>
                                {difficulty}
                            </Text>
                        </View>
                        <Text style={styles.dateText}>{date}</Text>
                    </View>
                </View>

                {/* Score and Action */}
                <View style={styles.actionContainer}>
                    <View style={styles.scoreBadge}>
                        <Text style={styles.scoreText}>🏆 {score}/100</Text>
                    </View>
                    <TouchableOpacity style={styles.viewButton} onPress={onPress}>
                        <Eye size={16} color="#1e293b" />
                        <Text style={styles.viewButtonText}>Ver Detalles</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        padding: spacing.md,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusIcon: {
        marginRight: spacing.sm,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 4,
    },
    metaColumn: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    difficultyBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        borderWidth: 1,
        marginBottom: 4,
    },
    difficultyText: {
        fontSize: 11,
        fontWeight: '600',
    },
    dateText: {
        fontSize: 11,
        color: '#94a3b8',
        marginLeft: 0,
    },
    actionContainer: {
        alignItems: 'flex-end',
        marginLeft: spacing.sm,
        gap: 8,
    },
    scoreBadge: {
        backgroundColor: '#f0fdf4',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    scoreText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#16a34a',
    },
    viewButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    viewButtonText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#1e293b',
    },
});