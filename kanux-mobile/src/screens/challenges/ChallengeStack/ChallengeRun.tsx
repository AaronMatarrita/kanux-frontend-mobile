import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { X, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { colors } from '@theme';
import { useSoftChallengeExecution } from '../hooks/useSoftChallengeExecution';
import { challengesService } from '@/services/challenges.service';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ChallengesStackParamList } from '@/types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SoftChallengeSkeleton } from '../components/ChallengeRunSkeleton';
import Header from '@/components/ui/Header';
import { RetryState } from '@/components/ui/RetryState';

export const SoftChallengeExecutionScreen: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ChallengesStackParamList>>();
    const route = useRoute<RouteProp<ChallengesStackParamList, "ChallengeRun">>();
    const { challengeId } = route.params;

    const {
        challenge,
        loading,
        currentStep,
        setCurrentStep,
        answers,
        selectOption,
        formatTime,
        timeLeft,
        isSubmitting,
        setIsSubmitting,
        profileId,
        error,
        load
    } = useSoftChallengeExecution(challengeId);

    // redirect automatic
    useEffect(() => {
        if (!loading && challenge && timeLeft === 0) {
            Alert.alert(
                "Tiempo agotado",
                "El tiempo ha finalizado. Serás redirigido a los detalles.",
                [{
                    text: "Entendido",
                    onPress: () => navigation.pop()
                }]
            );
        }
    }, [timeLeft, loading]);
    // quit challenges 
    const handleExitWithWarning = () => {
        Alert.alert(
            "¿Abandonar desafío?",
            "Si sales ahora, se perderá tu progreso actual.",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Salir",
                    style: "destructive",
                    onPress: () => navigation.pop()
                }
            ]
        );
    };


    const questions = challenge?.non_technical_challenges?.[0]?.non_technical_questions || [];
    const currentQuestion = questions[currentStep] || null;
    const totalQuestions = questions.length || 0;
    const progress = totalQuestions > 0 ? (Object.keys(answers).length / totalQuestions) * 100 : 0;
    
    const handleFinish = async () => {
        if (Object.keys(answers).length < totalQuestions) {
            Alert.alert("Atención", "Debes responder todas las preguntas.");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await challengesService.submitSoftChallenge(challengeId, {
                id_profile: profileId || "",
                answers: Object.entries(answers).map(([qId, oId]) => ({
                    question_id: qId,
                    selected_option_id: oId
                }))
            });
            console.log(res);

            //navegation to result
            navigation.replace("ChallengeResult", {
                submissionId: res.submission_id
            });
        } catch (err) {
            Alert.alert("Error", "No se pudo enviar el desafío.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Header
                title="Desafío"
                leftIcon={<ChevronLeft color={colors.textColors.inverted} size={24} />}
                onLeftPress={() => handleExitWithWarning()}
            />
            {loading ? (
                <SoftChallengeSkeleton />
            ) : error ? (
                <RetryState
                    title="Error de conexión"
                    message="No logramos obtener las preguntas del desafío."
                    onRetry={() => load()}
                />
            ) : (
                <View style={styles.mainContainer}>
                    {/* --- HEADER --- */}
                    <View style={styles.header}>
                        <View style={styles.headerTopRow}>
                            <Text style={styles.timerText}>
                                ⏳ {formatTime()}
                            </Text>
                            <TouchableOpacity
                                onPress={handleFinish}
                                disabled={isSubmitting}
                            >
                                <Text style={[
                                    styles.submitText,
                                    isSubmitting && styles.submitTextDisabled
                                ]}>
                                    {isSubmitting ? "..." : "Enviar"}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* progress bar */}
                        <View style={styles.progressTrack}>
                            <View style={[styles.progressFill, { width: `${progress}%` }]} />
                        </View>
                    </View>

                    {/* --- content --- */}
                    <ScrollView
                        contentContainerStyle={styles.scrollBody}
                        showsVerticalScrollIndicator={false}
                    >
                        <Text style={styles.stepIndicator}>
                            Pregunta {currentStep + 1} de {totalQuestions}
                        </Text>

                        <Text style={styles.questionTitle}>
                            {currentQuestion?.question}
                        </Text>

                        {currentQuestion?.non_technical_question_options?.map((opt) => {
                            const isSelected = answers[currentQuestion?.id] === opt.id;
                            return (
                                <TouchableOpacity
                                    key={opt.id}
                                    activeOpacity={0.7}
                                    style={[
                                        styles.optionCard,
                                        isSelected && styles.optionCardSelected
                                    ]}
                                    onPress={() => currentQuestion && selectOption(currentQuestion.id, opt.id)}
                                >
                                    <View style={[
                                        styles.radioButton,
                                        isSelected && styles.radioButtonActive
                                    ]} />
                                    <Text style={[
                                        styles.optionLabel,
                                        isSelected && styles.optionLabelSelected
                                    ]}>
                                        {opt.option_text}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>

                    {/* --- FOOTER --- */}
                    <View style={styles.footerNav}>
                        <TouchableOpacity
                            onPress={() => setCurrentStep(prev => prev - 1)}
                            disabled={currentStep === 0}
                            style={[styles.navAction, currentStep === 0 && styles.navActionDisabled]}
                        >
                            <ChevronLeft size={20} color={currentStep === 0 ? "#cbd5e1" : colors.primary} />
                            <Text style={[styles.navActionText, currentStep === 0 && styles.navActionTextDisabled]}>
                                Anterior
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.paginationDots}>
                            {questions.map((_, i) => (
                                <View
                                    key={i}
                                    style={[
                                        styles.dotItem,
                                        currentStep === i && styles.dotItemActive,
                                        answers[questions[i].id] && styles.dotItemDone
                                    ]}
                                />
                            ))}
                        </View>

                        <TouchableOpacity
                            onPress={() => setCurrentStep(prev => prev + 1)}
                            disabled={currentStep === totalQuestions - 1}
                            style={[styles.navAction, currentStep === totalQuestions - 1 && styles.navActionDisabled]}
                        >
                            <Text style={[styles.navActionText, currentStep === totalQuestions - 1 && styles.navActionTextDisabled]}>
                                Siguiente
                            </Text>
                            <ChevronRight size={20} color={currentStep === totalQuestions - 1 ? "#cbd5e1" : colors.primary} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F8FAFC'
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        backgroundColor: '#ffffff',
        paddingTop: 15,
        paddingHorizontal: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderColor: '#e2e8f0'
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    iconButton: {
        padding: 4
    },
    timerText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1e293b'
    },
    submitText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#10b981'
    },
    submitTextDisabled: {
        color: '#cbd5e1'
    },
    progressTrack: {
        height: 6,
        backgroundColor: '#f1f5f9',
        borderRadius: 3,
        overflow: 'hidden'
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#10b981'
    },
    scrollBody: {
        padding: 24
    },
    stepIndicator: {
        fontSize: 14,
        color: '#64748b',
        marginBottom: 8,
        fontWeight: '500'
    },
    questionTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#0f172a',
        lineHeight: 30,
        marginBottom: 30
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 18,
        borderRadius: 16,
        marginBottom: 14,
        borderWidth: 1.5,
        borderColor: '#e2e8f0'
    },
    optionCardSelected: {
        borderColor: '#10b981',
        backgroundColor: '#f0fdf4'
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#cbd5e1',
        marginRight: 14
    },
    radioButtonActive: {
        borderColor: '#10b981',
        borderWidth: 6
    },
    optionLabel: {
        flex: 1,
        fontSize: 16,
        color: '#475569',
        lineHeight: 22
    },
    optionLabelSelected: {
        color: '#064e3b',
        fontWeight: '600'
    },
    footerNav: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        paddingVertical: 20,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: '#e2e8f0'
    },
    navAction: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8
    },
    navActionDisabled: {
        opacity: 0.4
    },
    navActionText: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.primary,
        marginHorizontal: 4
    },
    navActionTextDisabled: {
        color: '#94a3b8'
    },
    paginationDots: {
        flexDirection: 'row',
        gap: 6
    },
    dotItem: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#e2e8f0'
    },
    dotItemActive: {
        backgroundColor: colors.primary,
        width: 14
    },
    dotItemDone: {
        backgroundColor: '#10b981'
    }
});