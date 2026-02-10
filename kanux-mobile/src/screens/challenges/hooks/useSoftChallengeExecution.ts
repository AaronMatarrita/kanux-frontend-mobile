import { useState, useEffect } from 'react';
import { challengesService, SoftChallenge } from '@/services/challenges.service';
import { useAuth } from '@/context/AuthContext';
import { Alert } from 'react-native';

export function useSoftChallengeExecution(id: string) {
    const { session } = useAuth();
    const [challenge, setChallenge] = useState<SoftChallenge | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await challengesService.getSoftChallenge(id);
                setChallenge(data);
                setTimeLeft((data.duration_minutes || 10) * 60);
            } catch (err) {
                Alert.alert("Error", "No se pudo cargar el desafío");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    useEffect(() => {
        if (loading || !challenge || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [loading, challenge, timeLeft]);

    const formatTime = () => {
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const selectOption = (questionId: string, optionId: string) => {
        setAnswers((prev) => ({ 
            ...prev, 
            [questionId]: optionId 
        }));
    };

    return {
        challenge,
        loading,
        currentStep,
        setCurrentStep,
        answers,
        timeLeft,
        formatTime,
        selectOption,
        isSubmitting,
        setIsSubmitting,
        profileId: session?.user?.profile?.id
    };
}