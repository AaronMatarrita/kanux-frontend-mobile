import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, Platform } from 'react-native';
import { Code2, Clock, BarChart3, Building2, Play } from 'lucide-react-native';
import { challengesService } from '@/services/challenges.service';
import { colors } from '@theme';
import { Card } from '@/components/ui/Card';
import Markdown from 'react-native-markdown-display';

interface TechnicalDetailsProps {
   data:any
}

export const TechnicalChallengeDetails: React.FC<TechnicalDetailsProps> = ({
    data,
}) => {

    return (
        <View style={styles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <Card variant={"shadow"} style={styles.heroCard}>
                    <View style={styles.heroHeader}>
                        <View style={styles.iconContainer}>
                            <Code2 size={24} color={colors.primary} />
                        </View>
                        <View style={styles.heroTextContainer}>
                            <Text style={styles.mainTitle}>
                                {data?.title}
                            </Text>
                            <View style={styles.badgeRow}>
                                <View style={styles.tag}>
                                    <Clock size={12} color="#64748b" />
                                    <Text style={styles.tagText}>
                                        {data.duration_minutes} m
                                    </Text>
                                </View>
                                <View style={styles.tag}>
                                    <Text style={styles.tagText}>
                                        {data.challenge_type}
                                    </Text>
                                </View>
                                <View style={[styles.tag, styles.easyTag]}>
                                    <Text style={styles.easyText}>
                                        {data.difficulty}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
                        <Play size={18} color="#fff" fill="#fff" />
                        <Text style={styles.buttonText}>Iniciar desafío</Text>
                    </TouchableOpacity>
                </Card>

                <Text style={styles.sectionLabel}>Descripción</Text>
                <Card variant={"shadow"} style={styles.contentCard}>
                    <Markdown style={markdownStyles}>
                        {data?.description}
                    </Markdown>
                </Card>

                <Text style={styles.sectionLabel}>Resumen del desafío</Text>
                <Card variant={"shadow"} style={styles.contentCard}>
                    <InfoItem icon={<Code2 size={18} color="#64748b" />} label="Tipo" value={data.challenge_type} />
                    <InfoItem icon={<Clock size={18} color="#64748b" />} label="Duración" value={`${data.duration_minutes} m`}/>
                    <InfoItem icon={<BarChart3 size={18} color="#64748b" />} label="Dificultad" value={data.difficulty} isLast={true} />
                </Card>

                <Text style={styles.sectionLabel}>Creado por</Text>
                <Card variant={"shadow"} style={styles.companyCard}>
                    <View style={styles.companyIcon}>
                        <Building2 size={20} color="#64748b" />
                    </View>
                    <View style={styles.companyInfo}>
                        <Text style={styles.companyName}>KÁNUX</Text>
                        <Text style={styles.companySub}>Desafío oficial de la plataforma KÁNUX</Text>
                    </View>
                </Card>
            </ScrollView>
        </View>
    );
};

const InfoItem = ({ icon, label, value, isLast }: any) => (
    <View style={[styles.infoRow, isLast && { borderBottomWidth: 0 }]}>
        <View style={styles.infoLabelGroup}>
            {icon}
            <Text style={styles.infoLabel}>{label}</Text>
        </View>
        <Text style={styles.infoValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.backgrounds.primary
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        marginTop: 10,
        color: '#64748b'
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
        fontSize: 22,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 6
    },
    badgeRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8
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
        color: colors.textColors.inverted,
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
    codeBlock: {
        backgroundColor: '#1E293B',
        padding: 16,
        borderRadius: 8,
        marginTop: 16
    },
    codeTitle: {
        color: '#94A3B8',
        fontSize: 12,
        marginBottom: 8,
        fontWeight: '600'
    },
    codeContent: {
        color: '#38BDF8',
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
        fontSize: 13,
        lineHeight: 20
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
const markdownStyles = StyleSheet.create({
    body: {
        color: colors.gray700,
        fontSize: 15,
        lineHeight: 22,
    },
    heading1: {
        color: '#1e293b',
        fontWeight: '700',
        marginVertical: 10,
    },
    strong: {
        fontWeight: 'bold',
        color: colors.primary,
    },
    list_item: {
        marginVertical: 4,
    },
    link: {
        color: colors.primary,
        textDecorationLine: 'underline',
    },
    code_inline: {
        backgroundColor: '#003b75',
        color: '#dc2626',
        padding: 4,
        borderRadius: 4,
    },
});