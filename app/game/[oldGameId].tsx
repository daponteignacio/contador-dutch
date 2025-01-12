import { StyleSheet, Text, View, ScrollView, useColorScheme } from "react-native";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { router } from "expo-router";
import Animated, { SlideInLeft } from "react-native-reanimated";
import CustomButton from "@/components/CustomButton";
import { colors } from "@/styles/colors";

// TODO: Puede haber empates, arreglar eso en el listado

import { Player } from "@/interfaces/game";
import { useContext, useEffect } from "react";
import { AppContext } from "@/context";

const HistoryPage = () => {
    const { oldGameId } = useLocalSearchParams();
    const { currentOldGame, selectOldGame } = useContext(AppContext);

    useEffect(() => {
        if (oldGameId) {
            selectOldGame(oldGameId as string);
        }
    }, [oldGameId]);

    const playersSorted: Player[] = [...currentOldGame?.players ?? []].sort((a, b) => a.score - b.score);

    const colorScheme = useColorScheme(); // Detecta el esquema de color
    const isDarkMode = colorScheme === "dark"; // Verifica si está en modo oscuro

    const dynamicBackgroundColor = isDarkMode ? colors.grey["950"] : colors.grey["50"];
    const dynamicTextColor = isDarkMode ? colors.grey["200"] : colors.grey["900"];
    const dynamicSubTextColor = isDarkMode ? colors.grey["400"] : colors.grey["600"];
    const dynamicDetailsCardColor = isDarkMode ? colors.grey[900] : colors.white;
    const dynamicGameCardLabelColor = isDarkMode ? colors.grey[300] : colors.grey[600];
    const dynamicGameCardValueColor = isDarkMode ? colors.white : colors.white;
    const dynamicPlayerCardBackgroundColor = isDarkMode ? colors.grey["800"] : colors.grey["100"];
    const dynamicPlayerCardTextColor = isDarkMode ? colors.grey["200"] : colors.grey["900"];

    if (!oldGameId) return;

    return (
        <View style={[styles.container, { backgroundColor: dynamicBackgroundColor }]}>
            <View style={{ flex: 1 }}>
                <View style={[styles.card, { backgroundColor: dynamicDetailsCardColor }]}>
                    <View style={styles.header}>
                        <Text style={[styles.label, { color: dynamicGameCardLabelColor }]}>Partida</Text>
                        <Text style={[styles.value, { color: dynamicGameCardValueColor }]}>{currentOldGame?.name}</Text>
                    </View>
                    <View style={styles.details}>
                        <View style={styles.detailItem}>
                            <Text style={[styles.label, { color: dynamicGameCardLabelColor }]}>Creación</Text>
                            <Text style={[styles.value, { color: dynamicGameCardValueColor }]}>{currentOldGame?.date}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={[styles.label, { color: dynamicGameCardLabelColor }]}>Límite</Text>
                            <Text style={[styles.value, { color: dynamicGameCardValueColor }]}>{currentOldGame?.scoreLimit} pts</Text>
                        </View>
                    </View>
                </View>

                {/* Lista de jugadores animada */}
                <View style={{ height: 400 }}>
                    <Text style={[styles.headerText, { color: dynamicTextColor }]}>Jugadores ({playersSorted.length})</Text>

                    <ScrollView contentContainerStyle={styles.playerList}>
                        {playersSorted.map((player, index) => {
                            const baseColor = dynamicPlayerCardTextColor;
                            const color = index === 0 ? colors.green[500] : index === playersSorted.length - 1 ? colors.red[500] : baseColor;

                            return (
                                <Animated.View
                                    key={player.id}
                                    entering={SlideInLeft.duration(500).delay(index * 200)}
                                    style={[styles.playerCard, { backgroundColor: dynamicPlayerCardBackgroundColor }]}
                                >
                                    <Text style={{ ...styles.playerName, color }}>{player.name}</Text>
                                    <Text style={{ ...styles.playerName, color }}>{player.score}</Text>
                                </Animated.View>
                            )
                        })}
                    </ScrollView>
                </View>
            </View>

            <View style={{ gap: 16 }}>
                <Text style={{ color: colors.grey[300], textAlign: 'center' }} >ID: {currentOldGame?.id}</Text>
                <CustomButton title="Volver" onPress={() => router.back()} bgColor={colors.blue[500]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 20,
    },
    backButton: {
        alignSelf: "flex-start",
        backgroundColor: "#E0E0E0",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333333",
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
    playerList: {
        width: "100%",
        alignItems: "center",
        paddingBottom: 20,
    },
    playerCard: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    playerName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333333",
    },
});

export default HistoryPage;
