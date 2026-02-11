import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeft, Trophy, CheckCircle2, AlertCircle, Copy, ArrowRight, Lightbulb, Target, ListChecks } from "lucide-react-native";
import { useSoftChallengeResults } from '../hooks/useChallengesResults';
import { ResultsSkeleton } from '../components/ResultsSkeleton';
import { Card } from '@components/ui/Card';
import { colors, typography, spacing, commonStyles } from '@/theme';
import { ChallengesStackParamList } from '@/types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Header } from '@/components/messages';
import { RetryState } from '@/components/ui/RetryState';

const { width } = Dimensions.get('window');

export const SoftChallengeResultsScreen: React.FC = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ChallengesStackParamList>>();
    const route = useRoute<RouteProp<ChallengesStackParamList, "ChallengeResult">>();
    const { submissionId } = route.params;
    const { resultData, feedback, loading, copied, copyToClipboard, error, fetchData } = useSoftChallengeResults(submissionId);
    const finalScore = feedback.finalScore ?? Math.round(resultData?.score ?? 0);
    const isPassed = finalScore >= 60;
    const handleGoHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'ChallengesList' }],
        });
    };

    return (
        <>
            <Header
                title="Resultados"
                leftIcon={<ChevronLeft color={colors.textColors.inverted} size={24} />}
                onLeftPress={() => {handleGoHome()}}
            />
            {loading ? (
                <ResultsSkeleton />
            ) : error ? (
                <RetryState
                    title="Error de conexión"
                    message="No logramos obtener los detalles de resultado."
                    onRetry={() => fetchData()}
                />
            ) : (
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                        {/* hero section */}
                        <View style={[styles.hero, isPassed ? styles.heroSuccess : styles.heroFail]}>
                            <View style={styles.heroContent}>
                                <View style={styles.iconCircle}>
                                    <Trophy color={colors.white} size={48} />
                                </View>
                                <Text style={styles.heroTitle}>{isPassed ? "¡FELICITACIONES!" : "BUEN INTENTO"}</Text>
                                <Text style={styles.heroSubtitle}>{resultData?.challenge?.title || "RESULTADO DEL RETO"}</Text>

                                <View style={[styles.scoreBadge, commonStyles.shadow]}>
                                    <Text style={[styles.scoreText, isPassed ? styles.textSuccess : styles.textFail]}>{finalScore}</Text>
                                    <Text style={styles.scorePercent}>%</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.mainContainer}>

                            {/* info row*/}
                            <View style={styles.infoRow}>
                                <Card variant="shadow" padding="md" style={styles.infoCard}>
                                    <AlertCircle size={18} color={colors.warning} />
                                    <View style={styles.infoTextContainer}>
                                        <Text style={styles.infoLabel}>Dificultad</Text>
                                        <View style={styles.difficultyBadge}>
                                            <Text style={styles.difficultyText}>Básico</Text>
                                        </View>
                                    </View>
                                </Card>
                                <Card variant="shadow" padding="md" style={styles.infoCard}>
                                    <ListChecks size={18} color={colors.info} />
                                    <View style={styles.infoTextContainer}>
                                        <Text style={styles.infoLabel}>Enviado</Text>
                                        <Text style={styles.infoValue}>10 feb</Text>
                                    </View>
                                </Card>
                            </View>
                            {/* ia note*/}
                            <Card variant="outline" padding="md" style={styles.aiWarningCard}>
                                <AlertCircle size={20} color={colors.warning} />
                                <Text style={styles.aiWarningText}>
                                    Esta retroalimentación fue generada por una inteligencia artificial y puede no ser completamente precisa. Úsala como guía de apoyo, no como una evaluación definitiva.
                                </Text>
                            </Card>

                            {/* Analisys*/}
                            {feedback.summary && (
                                <Card variant="shadow" style={styles.sectionMargin}>
                                    <Text style={styles.sectionLabel}>ANÁLISIS GENERAL</Text>
                                    <Text style={styles.summaryText}>{feedback.summary}</Text>
                                </Card>
                            )}

                            {/* stadistics */}
                            {feedback.answersOverview && (
                                <View style={styles.statsRow}>
                                    <Card variant="shadow" padding="sm" style={StyleSheet.flatten([styles.statBox, { borderLeftColor: colors.success, borderLeftWidth: 4 }])}>
                                        <Text style={styles.statNumber}>{feedback.answersOverview.correct ?? 0}</Text>
                                        <Text style={styles.statLabel}>Correctas</Text>
                                    </Card>
                                    <Card variant="shadow" padding="sm" style={StyleSheet.flatten([styles.statBox, { borderLeftColor: colors.error, borderLeftWidth: 4 }])}>
                                        <Text style={styles.statNumber}>{feedback.answersOverview.incorrect ?? 0}</Text>
                                        <Text style={styles.statLabel}>Incorrectas</Text>
                                    </Card>
                                    <Card variant="shadow" padding="sm" style={StyleSheet.flatten([styles.statBox, { borderLeftColor: colors.info, borderLeftWidth: 4 }])}>
                                        <Text style={styles.statNumber}>{feedback.answersOverview.total ?? 0}</Text>
                                        <Text style={styles.statLabel}>Total</Text>
                                    </Card>
                                </View>
                            )}

                            {/* tags */}
                            {feedback.tags && feedback.tags.length > 0 && (
                                <View style={styles.tagsContainer}>
                                    {feedback.tags.map((tag, index) => (
                                        <View key={index} style={styles.tagBadge}>
                                            <Text style={styles.tagText}>{tag}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}

                            {/* strenghts */}
                            {feedback.strengths && feedback.strengths.length > 0 && (
                                <Card variant="shadow" style={styles.sectionMargin}>
                                    <View style={styles.cardHeader}>
                                        <CheckCircle2 size={20} color={colors.emerald600} />
                                        <Text style={styles.cardTitle}>Fortalezas</Text>
                                    </View>
                                    {feedback.strengths.map((item, i) => (
                                        <View key={i} style={styles.itemRow}>
                                            <Text style={[styles.bullet, { color: colors.success }]}>•</Text>
                                            <Text style={styles.itemText}>{item}</Text>
                                        </View>
                                    ))}
                                </Card>
                            )}

                            {/* improvement */}
                            {feedback.areasForImprovement && feedback.areasForImprovement.length > 0 && (
                                <Card variant="shadow" style={styles.sectionMargin}>
                                    <View style={styles.cardHeader}>
                                        <Target size={20} color={colors.warning} />
                                        <Text style={styles.cardTitle}>Áreas de Mejora</Text>
                                    </View>
                                    {feedback.areasForImprovement.map((item, i) => (
                                        <View key={i} style={styles.itemRow}>
                                            <Text style={[styles.bullet, { color: colors.warning }]}>•</Text>
                                            <Text style={styles.itemText}>{item}</Text>
                                        </View>
                                    ))}
                                </Card>
                            )}

                            {/* next steps */}
                            {feedback.nextSteps && feedback.nextSteps.length > 0 && (
                                <Card variant="outline" style={StyleSheet.flatten([styles.sectionMargin, styles.nextStepsCard])}>
                                    <View style={styles.cardHeader}>
                                        <Lightbulb size={20} color={colors.info} />
                                        <Text style={[styles.cardTitle, { color: colors.info }]}>Siguientes Pasos</Text>
                                    </View>
                                    {feedback.nextSteps.map((item, i) => (
                                        <View key={i} style={styles.itemRow}>
                                            <Text style={[styles.stepNumber, { color: colors.info }]}>{i + 1}.</Text>
                                            <Text style={[styles.itemText, { color: colors.gray700 }]}>{item}</Text>
                                        </View>
                                    ))}
                                </Card>
                            )}

                            {/* feedback */}
                            {feedback.perQuestionFeedback && feedback.perQuestionFeedback.length > 0 && (
                                <Card variant="shadow" style={styles.sectionMargin}>
                                    <View style={styles.cardHeader}>
                                        <ListChecks size={20} color={colors.primary} />
                                        <Text style={styles.cardTitle}>Desglose Detallado</Text>
                                    </View>
                                    {feedback.perQuestionFeedback.map((q, i) => (
                                        <View key={i} style={StyleSheet.flatten([styles.questionBox, i === (feedback.perQuestionFeedback?.length ?? 0) - 1 && { borderBottomWidth: 0 }])}>
                                            <View style={styles.questionHeader}>
                                                <Text style={styles.questionNumber}>Pregunta {i + 1}</Text>
                                                <View style={[styles.statusBadge, { backgroundColor: q.correct ? colors.primaryLight : '#fee2e2' }]}>
                                                    <Text style={{ color: q.correct ? colors.primaryDark : colors.error, ...typography.captionSmall, fontWeight: 'bold' }}>
                                                        {q.correct ? 'CORRECTA' : 'INCORRECTA'}
                                                    </Text>
                                                </View>
                                            </View>
                                            <Text style={styles.explanationText}>{q.explanation}</Text>
                                        </View>
                                    ))}
                                </Card>
                            )}

                            {/* FOOTER */}
                            <View style={styles.footer}>
                                <TouchableOpacity onPress={copyToClipboard} style={styles.idButton}>
                                    <View>
                                        <Text style={styles.idLabel}>ID DE ENVÍO</Text>
                                        <Text style={styles.idValue}>{submissionId.slice(0, 24)}...</Text>
                                    </View>
                                    <View style={styles.copyIconContainer}>
                                        {copied ? <CheckCircle2 size={16} color={colors.success} /> : <Copy size={16} color={colors.muted} />}
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {handleGoHome()}}
                                    style={styles.primaryButton}
                                >
                                    <Text style={styles.primaryButtonText}>Continuar</Text>
                                    <ArrowRight color={colors.white} size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    aiWarningCard: {
        backgroundColor: '#FFFBEB',
        borderColor: '#FEF3C7',
        borderLeftWidth: 4,
        borderLeftColor: colors.warning,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.lg,
        gap: 12
    },
    aiWarningText: {
        flex: 1,
        ...typography.caption,
        color: '#92400E',
        lineHeight: 18,
    },
    safeArea: {
        flex: 1,
        backgroundColor: colors.gray50
    },
    scrollContent: {
        paddingBottom: spacing.xxxl
    },
    hero: {
        paddingHorizontal: spacing.xxl,
        paddingTop: 40,
        paddingBottom: 60,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40
    },
    heroSuccess: {
        backgroundColor: colors.success
    },
    heroFail: {
        backgroundColor: colors.error
    },
    backButton: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        width: 44, height: 44, borderRadius: 12,
        justifyContent: 'center', alignItems: 'center', marginBottom: spacing.xl
    },
    heroContent: {
        alignItems: 'center'
    },
    iconCircle: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: spacing.xl,
        borderRadius: 100,
        marginBottom: spacing.lg
    },
    heroTitle: {
        color: colors.white,
        ...typography.h2
    },
    heroSubtitle: {
        color: 'rgba(255,255,255,0.8)',
        ...typography.body,
        textAlign: 'center'
    },
    scoreBadge: {
        backgroundColor: colors.white,
        paddingHorizontal: 30, paddingVertical: spacing.md,
        borderRadius: 24, marginTop: 30,
        flexDirection: 'row', alignItems: 'baseline',
    },
    scoreText: {
        fontSize: 48,
        fontWeight: '900'
    },
    scorePercent: {
        ...typography.h3,
        color: colors.gray400,
        marginLeft: 2
    },
    textSuccess: {
        color: colors.success
    },
    textFail: {
        color: colors.error
    },
    mainContainer: {
        paddingHorizontal: spacing.lg,
        marginTop: -30
    },
    sectionMargin: {
        marginBottom: spacing.lg
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: spacing.lg,
        gap: spacing.md
    },
    infoCard: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoTextContainer: {
        marginLeft: 10
    },
    infoLabel: {
        color: colors.gray500,
        ...typography.captionSmall,
        fontWeight: 'bold'
    },
    infoValue: {
        ...typography.uiSmall,
        color: colors.text,
        fontWeight: 'bold'
    },
    difficultyBadge: {
        backgroundColor: colors.primaryLight,
        paddingHorizontal: 8,
        borderRadius: 10,
        marginTop: 2
    },
    difficultyText: {
        color: colors.primaryDark,
        ...typography.captionSmall,
        fontWeight: 'bold'
    },
    sectionLabel: {
        ...typography.caption,
        fontWeight: 'bold',
        color: colors.gray400,
        letterSpacing: 1,
        marginBottom: spacing.sm
    },
    summaryText: {
        ...typography.bodySmall,
        color: colors.gray700,
        lineHeight: 22
    },
    statsRow: {
        flexDirection: 'row',
        marginBottom: spacing.lg,
        gap: spacing.sm
    },
    statBox: {
        width: (width - 56) / 3
    },
    statNumber: {
        ...typography.h3,
        color: colors.text
    },
    statLabel: {
        ...typography.captionSmall,
        color: colors.gray500
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.lg
    },
    cardTitle: {
        ...typography.h3,
        fontSize: 17,
        color: colors.text,
        marginLeft: 10
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: spacing.sm
    },
    bullet: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 8
    },
    stepNumber: {
        ...typography.bodySmall,
        fontWeight: 'bold',
        marginRight: 8
    },
    itemText: {
        ...typography.bodySmall,
        color: colors.gray600,
        flex: 1
    },
    nextStepsCard: {
        backgroundColor: '#F8F7FF',
        borderColor: colors.border
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: spacing.xl,
        gap: spacing.sm
    },
    tagBadge: {
        backgroundColor: colors.primary,
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20
    },
    tagText: {
        color: colors.white,
        ...typography.caption,
        fontWeight: 'bold'
    },
    questionBox: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingVertical: spacing.md
    },
    questionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6
    },
    questionNumber: {
        ...typography.caption,
        fontWeight: 'bold',
        color: colors.gray500
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6
    },
    explanationText: {
        ...typography.bodySmall,
        color: colors.gray600,
        lineHeight: 18
    },
    footer: {
        marginTop: spacing.sm
    },
    idButton: {
        backgroundColor: colors.gray100,
        padding: spacing.lg,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xl
    },
    idLabel: {
        ...typography.captionSmall,
        color: colors.gray400,
        fontWeight: 'bold'
    },
    idValue: {
        fontSize: 11,
        color: colors.gray600,
        fontFamily: 'monospace'
    },
    copyIconContainer: {
        backgroundColor: colors.white,
        padding: 8, borderRadius: 10
    },
    primaryButton: {
        backgroundColor: colors.planButton,
        height: 60,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    primaryButtonText: {
        color: colors.white,
        ...typography.body,
        fontWeight: 'bold',
        marginRight: spacing.sm
    },
});