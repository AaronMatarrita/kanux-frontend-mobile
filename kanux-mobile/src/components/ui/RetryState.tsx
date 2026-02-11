import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RefreshCcw, AlertCircle } from 'lucide-react-native';
import { colors, spacing, typography } from '@/theme';

interface RetryStateProps {
  title?: string;
  message?: string;
  onRetry: () => void;
  icon?: React.ReactNode;
}

export const RetryState: React.FC<RetryStateProps> = ({
  title = "Algo salió mal",
  message = "No pudimos cargar la información. Por favor, intenta de nuevo.",
  onRetry,
  icon
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {icon || <AlertCircle size={48} color={colors.error} />}
      </View>
      
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={onRetry}
        activeOpacity={0.8}
      >
        <RefreshCcw size={20} color={colors.white} style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Reintentar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    backgroundColor: colors.gray50,
  },
  iconContainer: {
    marginBottom: spacing.lg,
    padding: spacing.md,
    backgroundColor: '#fee2e2',
    borderRadius: 50,
  },
  title: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  message: {
    ...typography.bodySmall,
    color: colors.gray500,
    textAlign: 'center',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  buttonIcon: {
    marginRight: spacing.sm,
  },
  buttonText: {
    ...typography.body,
    color: colors.white,
    fontWeight: 'bold',
  },
});