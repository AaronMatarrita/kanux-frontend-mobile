import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Beaker, Code2, Clock, BrainCircuit } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { typography, colors, spacing } from '@/theme';

export interface Challenge {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    duration_minutes: number;
    challenge_type?: string;
}

interface ChallengeCardProps {
    challenge: Challenge;
    onPress: (id: string) => void;
}

// set colors difficulty
const getDifficultyStyles = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
        case 'básico':
            return { bg: '#ecfdf5', border: '#d1fae5', text: '#059669' };
        case 'intermedio':
            return { bg: '#fffbeb', border: '#fef3c7', text: '#d97706' };
        case 'avanzado':
            return { bg: '#fef2f2', border: '#fee2e2', text: '#dc2626' };
        default:
            return { bg: '#f8fafc', border: '#e2e8f0', text: '#64748b' };
    }
};

// set colors and icons
const getTypeStyles = (type?: string) => {
    const normalizedType = type?.toLowerCase() || '';
    if (normalizedType === "técnico") {
        return { bg: '#eff6ff', border: '#dbeafe', text: '#2563eb', icon: <Code2 size={22} color="#2563eb" /> };
    }
    return { bg: '#f5f3ff', border: '#ede9fe', text: '#7c3aed', icon: <BrainCircuit size={22} color="#7c3aed" /> };
};

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, onPress }) => {
    const diffStyle = getDifficultyStyles(challenge.difficulty);
    const typeStyle = getTypeStyles(challenge.challenge_type);
    const textType = "challenge_type" in challenge && challenge.challenge_type === "Técnico" ? "Desafío de código" : "Habilidades blandas";
    return (
        <Card variant="shadow" padding="md" style={styles.card}>
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    {typeStyle.icon}
                </View>
                <View style={styles.badgeContainer}>
                    <View style={[styles.badge, { backgroundColor: diffStyle.bg, borderColor: diffStyle.border }]}>
                        <Text style={[styles.badgeText, { color: diffStyle.text }]}>
                            {challenge.difficulty}
                        </Text>
                    </View>
                    <View style={[styles.badge, { backgroundColor: typeStyle.bg, borderColor: typeStyle.border }]}>
                        <Text style={[styles.badgeText, { color: typeStyle.text }]}>
                            {textType}
                        </Text>
                    </View>

                </View>
            </View>
            <View style={styles.body}>
                <Text style={[typography.h3, styles.title]} numberOfLines={1}>
                    {challenge.title}
                </Text>
                <Text style={[typography.bodySmall, styles.description]} numberOfLines={2}>
                    {challenge.description}
                </Text>
            </View>
            <View style={styles.footer}>
                <View style={styles.durationRow}>
                    <Clock size={16} color={colors.gray500} />
                    <Text style={styles.durationLabel}>
                        {challenge.duration_minutes}
                    </Text>
                </View>
                <Button title="Ver detalles" onPress={() => { onPress(challenge.id); }} variant="success" style={styles.buttonExtra} />
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        backgroundColor: colors.backgrounds.secondary,
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.md
    },
    iconContainer: {
        padding: 10,
        borderRadius: 12
    },
    badgeContainer: {
        alignItems: 'flex-end',
        gap: 6
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        borderWidth: 1
    },
    badgeText: {
        ...typography.captionSmall,
    },
    body: {
        marginBottom: spacing.lg
    },
    title: {
        color: colors.primary,
        marginBottom: 4
    },
    description: {
        color: colors.gray500,
        lineHeight: 18
    },
    footer: {
        gap: spacing.sm
    },
    durationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
    },
    durationLabel: {
        fontSize: 14,
        color: colors.gray500
    },
    buttonExtra: {
        backgroundColor: colors.emerald600,
        width: '100%',
        height: 46
    },
});