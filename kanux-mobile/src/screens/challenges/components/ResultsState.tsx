import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AlertCircle, Zap, ArrowLeft } from 'lucide-react-native';

interface ResultsStateProps {
    state: "error" | "loading" | "empty";
    error?: string;
    onBack: () => void;
}

export const ResultsState = ({ state, error, onBack }: ResultsStateProps) => {
    return (
        <View style={styles.stateContainer}>
            <View style={styles.stateCard}>
                {state === "loading" ? (
                    <>
                        <ActivityIndicator size="large" color="#6366F1" />
                        <Text style={styles.stateTitle}>Cargando tu resultado...</Text>
                    </>
                ) : (
                    <>
                        <View style={[styles.iconContainer, state === "error" && styles.iconError]}>
                            {state === "error" ? 
                                <AlertCircle size={32} color="#EF4444" /> : 
                                <Zap size={32} color="#64748B" />
                            }
                        </View>
                        <Text style={styles.stateTitle}>
                            {state === "error" ? "Oops, algo salió mal" : "No hay datos disponibles"}
                        </Text>
                        <Text style={styles.stateSub}>
                            {state === "error" ? (error || "Ha ocurrido un error") : "No pudimos encontrar la información del reto"}
                        </Text>
                        <TouchableOpacity style={styles.backButton} onPress={onBack}>
                            <ArrowLeft size={20} color="#FFF" style={{ marginRight: 8 }} />
                            <Text style={styles.backButtonText}>Volver a Retos</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    stateContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#F8FAFC' },
    stateCard: { backgroundColor: '#FFF', width: '100%', borderRadius: 24, padding: 32, alignItems: 'center', elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
    iconContainer: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    iconError: { backgroundColor: '#FEE2E2' },
    stateTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E293B', marginBottom: 8, textAlign: 'center' },
    stateSub: { fontSize: 15, color: '#64748B', textAlign: 'center', marginBottom: 24, lineHeight: 22 },
    backButton: { flexDirection: 'row', backgroundColor: '#1E293B', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 12, width: '100%', justifyContent: 'center', alignItems: 'center' },
    backButtonText: { color: '#FFF', fontWeight: '600', fontSize: 16 }
});