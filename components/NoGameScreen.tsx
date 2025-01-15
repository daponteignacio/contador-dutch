import { colors } from '@/styles/colors';
import React from 'react'
import { Text, View, StyleSheet, useColorScheme } from 'react-native';
import CustomButton from './CustomButton';
import { router } from 'expo-router';

export const NoGameScreen = () => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";

    const dynamicBackgroundColor = isDarkMode ? colors.grey["950"] : colors.grey["50"];
    const dynamicTextColor = isDarkMode ? colors.grey["200"] : colors.grey["900"];

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: dynamicBackgroundColor,
                    justifyContent: "center",
                    alignItems: "center",
                },
            ]}
        >
            <Text style={[styles.label, { color: dynamicTextColor }]}>
                No hay una partida en curso
            </Text>
            <Text
                style={[
                    styles.label,
                    {
                        color: dynamicTextColor,
                        fontWeight: "normal",
                        marginBottom: 20,
                    },
                ]}
            >
                Cree una nueva partida para comenzar
            </Text>
            <CustomButton
                title="Nueva partida"
                onPress={() => router.push("/game/create")}
                bgColor={colors.green["500"]}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    headerInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 5,
    },
    date: {
        fontSize: 14,
    },
    averageText: {
        fontSize: 14,
    },
    listContainer: {
        paddingBottom: 20,
    },
    playerCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        borderRadius: 10,
    },
    playerNameContainer: {
        flex: 4,
        padding: 16,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    playerName: {
        fontSize: 16,
    },
    playerScoreContainer: {
        flex: 1,
        padding: 16,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: "center",
    },
    playerScore: {
        fontSize: 16,
        fontWeight: "bold",
    },

    card: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 20,
        elevation: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        marginBottom: 35,
    },
    header: {
        marginBottom: 20,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333333",
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#666666",
    },
    details: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    detailItem: {
        width: "48%",
    },
    label: {
        fontSize: 14,
        color: "#888888",
        marginBottom: 5,
    },
    value: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333333",
    },

});