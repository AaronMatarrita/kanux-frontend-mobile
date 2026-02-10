import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock, HelpCircle, Play, Building2, BarChart3, Activity, BrainCircuit } from 'lucide-react-native';
import { colors } from '@theme';
import { Card } from '@/components/ui/Card';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChallengesStackParamList } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';

interface SoftDetailsProps {
    data: any;
}

export const SoftChallengeDetails: React.FC<SoftDetailsProps> = ({
    data,
}) => {
    const navigation = useNavigation<NativeStackNavigationProp<ChallengesStackParamList>>();

    const handleStart = () => {
        console.log(data);
        if (!data?.id) return;
        navigation.navigate("ChallengeRun", {
            challengeId: data.id
        });
    };
    return (
        <View style={styles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <Card variant={"shadow"} style={styles.heroCard}>
                    <View style={styles.heroHeader}>
                        <View style={styles.iconContainer}>
                            <BrainCircuit size={24} color={colors.primary} />
                        </View>
                        <View style={styles.heroTextContainer}>
                            <Text style={styles.mainTitle}>
                                {data?.title || "Habilidades Blandas"}
                            </Text>
                            {/* details */}
                            <View style={styles.badgeRow}>
                                <View style={styles.tag}>
                                    <Clock size={12} color="#64748b" />
                                    <Text style={styles.tagText}>
                                        {data?.duration_minutes} m
                                    </Text>
                                </View>
                                <View style={styles.tag}>
                                    <Text style={styles.tagText}>
                                        {data?.challenge_type}
                                    </Text>
                                </View>
                                <View style={[styles.tag, styles.easyTag]}>
                                    <Text style={styles.easyText}>
                                        {data?.difficulty}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8} onPress={handleStart}>
                        <Play size={18} color="#fff" fill="#fff" />
                        <Text style={styles.buttonText}>
                            Iniciar desafío
                        </Text>
                    </TouchableOpacity>
                </Card>

                {/* about challenge */}
                <Text style={styles.sectionLabel}>
                    Acerca del desafío
                </Text>
                <Card
                    variant={"shadow"}
                    style={styles.contentCard}
                >
                    <Text style={styles.descriptionText}>
                        Lee cada situación y elige UNA sola opción. Prioriza respeto, comunicación clara, colaboración y responsabilidad.
                    </Text>
                    <View style={styles.infoAlert}>
                        <HelpCircle
                            size={18}
                            color="#64748b"
                        />
                        <Text style={styles.alertText}>
                            Este desafío contiene{" "}
                            <Text style={{ fontWeight: '700' }}>
                                {data?.questions_count || 4} preguntas
                            </Text>{" "}
                            para evaluar tu perfil profesional.
                        </Text>
                    </View>
                </Card>

                {/* sumary */}
                <Text style={styles.sectionLabel}>
                    Resumen del desafío
                </Text>
                <Card
                    variant={"shadow"}
                    style={styles.contentCard}
                >
                    <InfoItem
                        icon={<Activity size={18} color="#64748b" />}
                        label="Tipo"
                        value={data?.challenge_type || "Habilidades Blandas"}
                    />
                    <InfoItem
                        icon={<Clock size={18} color="#64748b" />}
                        label="Duración"
                        value={`${data?.duration_minutes} m`}
                    />
                    <InfoItem
                        icon={<BarChart3 size={18} color="#64748b" />}
                        label="Dificultad"
                        value={data?.difficulty || "General"}
                    />
                    <InfoItem
                        icon={<HelpCircle size={18} color="#64748b" />}
                        label="Preguntas"
                        value={`${data?.questions_count || 4} preguntas`}
                        isLast={true}
                    />
                </Card>

                {/* create by */}
                <Text style={styles.sectionLabel}>
                    Creado por
                </Text>
                <Card variant={"shadow"} style={styles.companyCard}>
                    <View style={styles.companyIcon}>
                        <Building2 size={20} color="#64748b" />
                    </View>
                    <View style={styles.companyInfo}>
                        <Text style={styles.companyName}>
                            KÁNUX
                        </Text>
                        <Text style={styles.companySub}>
                            Desafío oficial de la plataforma KÁNUX
                        </Text>
                    </View>
                </Card>
            </ScrollView>
        </View>
    );
};

const InfoItem = ({
    icon,
    label,
    value,
    isLast
}: {
    icon?: React.ReactNode,
    label: string,
    value: string,
    isLast?: boolean
}) => (
    <View style={[
        styles.infoRow,
        isLast && { borderBottomWidth: 0 }
    ]}>
        <View style={styles.infoLabelGroup}>
            {icon}
            <Text style={styles.infoLabel}>
                {label}
            </Text>
        </View>
        <Text style={styles.infoValue}>
            {value}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F8FAFC'
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40
    },
    heroCard: {
        padding: 20,
        marginBottom: 16
    },
    heroHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    iconContainer: {
        width: 48,
        height: 48,
        backgroundColor: '#F1F5F9',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heroTextContainer: {
        flex: 1,
        marginLeft: 16
    },
    mainTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 6
    },
    badgeRow: {
        flexDirection: 'row',
        gap: 8,
        flexWrap: 'wrap'
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6
    },
    tagText: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: '500'
    },
    easyTag: {
        backgroundColor: '#DCFCE7'
    },
    easyText: {
        fontSize: 12,
        color: '#166534',
        fontWeight: '600'
    },
    primaryButton: {
        backgroundColor: colors.emerald600,
        flexDirection: 'row',
        height: 48,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    },
    sectionLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: '#334155',
        marginBottom: 10,
        marginTop: 10
    },
    contentCard: {
        padding: 16,
        marginBottom: 16
    },
    descriptionText: {
        fontSize: 15,
        color: '#475569',
        lineHeight: 22
    },
    infoAlert: {
        flexDirection: 'row',
        gap: 10,
        backgroundColor: '#F8FAFC',
        padding: 12,
        borderRadius: 8,
        marginTop: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        alignItems: 'center'
    },
    alertText: {
        flex: 1,
        fontSize: 13,
        color: '#475569'
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9'
    },
    infoLabelGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    infoLabel: {
        fontSize: 14,
        color: '#64748b'
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1E293B'
    },
    companyCard: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    companyIcon: {
        width: 40,
        height: 40,
        backgroundColor: '#F1F5F9',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    companyInfo: {
        marginLeft: 12
    },
    companyName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1E293B'
    },
    companySub: {
        fontSize: 12,
        color: '#64748b'
    }
});