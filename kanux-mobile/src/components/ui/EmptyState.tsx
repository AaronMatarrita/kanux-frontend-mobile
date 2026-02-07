import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import * as LucideIcons from 'lucide-react-native';
import { colors, spacing, typography } from '@/theme';

// typed and interface
type IconName = keyof typeof LucideIcons;

interface EmptyStateProps {
  title: string;
  description: string;
  iconName?: IconName;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  iconName = 'Inbox', // icon
  style,
}) => {
  // icon from lucidIcon
  const Icon = LucideIcons[iconName] as LucideIcons.LucideIcon;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <Icon 
          size={48} 
          color={colors.gray400} 
          strokeWidth={1.5} 
        />
      </View>
      
      <Text style={[typography.h3, styles.title]}>
        {title}
      </Text>
      
      <Text style={[typography.body, styles.description]}>
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    marginTop: spacing.xxl,
  },
  iconContainer: {
    marginBottom: spacing.md,
    opacity: 0.6,
  },
  title: {
    textAlign: 'center',
    color: colors.gray800,
    marginBottom: spacing.xs,
  },
  description: {
    textAlign: 'center',
    color: colors.gray500,
    lineHeight: 22,
  },
});