import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { typography, colors, commonStyles, spacing } from '@/theme';

interface Tab {
    id: string;
    label: string;
}
interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (id: string) => void;
}

export function Tabs({
    tabs,
    activeTab,
    onTabChange
}: TabsProps) {

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.wrapper}>
                <View style={styles.wrapper}>
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <TouchableOpacity
                                key={tab.id}
                                onPress={() => onTabChange(tab.id)}
                                style={[
                                    styles.tab,
                                    isActive && styles.tabActive
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        isActive && styles.tabTextActive
                                    ]}
                                >
                                    {tab.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    scroll: {
        flexGrow: 0,
    },
    container: {
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
        padding: 4,
        alignSelf: 'center',
    },
    wrapper: {
        flexDirection: 'row'
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8
    },
    tabActive: {
        backgroundColor: colors.emerald600,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    tabText: {
        fontSize: 14,
        color: '#475569',
        fontWeight: '500'
    },
    tabTextActive: {
        color: '#fff'
    },
});