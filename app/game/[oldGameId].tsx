import { StyleSheet, Text, View, ScrollView, useColorScheme, Image } from "react-native";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { router } from "expo-router";
import Animated, { BounceIn, SlideInLeft } from "react-native-reanimated";
import CustomButton from "@/components/CustomButton";
import { colors } from "@/styles/colors";
import { FinishMode, Player, PlayerStatus } from "@/interfaces/game";
import { useContext, useEffect } from "react";
import { AppContext } from "@/context";
import { OldGameDetails } from "@/components/OldGameDetails";
import { UIContext } from "@/context/ui";

const HistoryPage = () => {
    const { oldGameId } = useLocalSearchParams();
    const { currentOldGame, selectOldGame } = useContext(AppContext);

    useEffect(() => {
        if (oldGameId) {
            selectOldGame(oldGameId as string);
        }
    }, [oldGameId]);


    const playersSorted =
        (currentOldGame?.players.sort((a, b) => a.score - b.score) || [])
            .filter(player => player.status !== PlayerStatus.GONE);

    const playersGone = currentOldGame?.players.filter(player => player.status === PlayerStatus.GONE);

    const winner = playersSorted.find(player => player.status === PlayerStatus.WINNER);

    if (!oldGameId) return;

    const {
        dynamicBackgroundColor,
        dynamicTextColor,
        dynamicCardBackgroundColor,
        dynamicCardTextColor,
    } = useContext(UIContext);

    return (
        <ScrollView style={[styles.container, { backgroundColor: dynamicBackgroundColor }]}>
            <View style={{ flex: 1 }}>
                <OldGameDetails currentOldGame={currentOldGame!} />

                <Animated.View
                    entering={BounceIn.duration(500).delay(500)}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 20,
                        maxWidth: '100%',
                    }}>
                    <Text style={[{ marginBottom: 10, color: dynamicTextColor, textAlign: 'center' }]}>Ganador</Text>

                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 20,
                        flexDirection: 'row',
                        maxWidth: '100%',
                        overflow: 'hidden',
                    }}>
                        <Image style={styles.littleStar} source={require('@/assets/star.png')} />
                        <Text style={[styles.winnerText, { textAlign: 'center', flexShrink: 1 }]}>{winner?.name}</Text>
                        <Image style={styles.littleStar} source={require('@/assets/star.png')} />
                    </View>

                </Animated.View>

                <View style={{ height: 400 }}>
                    <Text style={[styles.headerText, { color: dynamicTextColor }]}>Jugadores ({playersSorted.length})</Text>

                    <ScrollView contentContainerStyle={styles.playerList}>
                        {playersSorted.map((player, index) => {
                            const baseColor = dynamicCardTextColor;
                            const color = index === 0 ? colors.green[500] : index === playersSorted.length - 1 ? colors.red[500] : baseColor;

                            return (
                                <Animated.View
                                    key={player.id}
                                    entering={SlideInLeft.duration(500).delay(index * 200)}
                                    style={[styles.playerCard, { backgroundColor: dynamicCardBackgroundColor }]}
                                >
                                    <Text style={{ ...styles.playerName, color }}>{player?.name} {player.status === PlayerStatus.GONE && "(Se fue)"}</Text>
                                    <Text style={{ ...styles.playerName, color }}>{player?.score}</Text>
                                </Animated.View>
                            )
                        })}
                    </ScrollView>

                    {playersGone !== undefined && playersGone.length > 0 && <View style={{ height: 1, backgroundColor: dynamicTextColor, marginVertical: 20 }} />}

                    <ScrollView contentContainerStyle={styles.playerList}>
                        {playersGone?.map((player, index) => {
                            return (
                                <Animated.View
                                    key={player.id}
                                    entering={SlideInLeft.duration(500).delay(index * 200)}
                                    style={[styles.playerCard, { backgroundColor: dynamicCardBackgroundColor }]}
                                >
                                    <Text style={{ ...styles.playerName, color: dynamicCardTextColor }}>{player?.name} (Se fue)</Text>
                                    <Text style={{ ...styles.playerName, color: dynamicCardTextColor }}>{player?.score}</Text>
                                </Animated.View>
                            )
                        })}
                    </ScrollView>


                </View>
            </View>

            <View style={{ gap: 16, marginBottom: 20 }}>
                <Text style={{ color: colors.grey[300], textAlign: 'center' }} >ID: {currentOldGame?.id}</Text>
                <CustomButton title="Volver" onPress={() => router.back()} bgColor={colors.blue[500]} />
            </View>
        </ScrollView>
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
    winnerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "gold",
    },
    littleStar: {
        width: 30,
        height: 30,
        resizeMode: 'contain', // Asegura que la imagen se ajuste dentro del cuadro
        marginHorizontal: 5, // Añade espacio entre las estrellas y el texto
    }

});

export default HistoryPage;
