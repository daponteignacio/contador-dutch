import { useState, useContext } from "react";
import { Alert } from "react-native";
import { AppContext } from "@/context";
import { router } from "expo-router";
import { PlayerStatus } from "@/interfaces/game";


export const usePartida = () => {
    const { currentGame, endGame, removePlayer } = useContext(AppContext);
    const [modalVisible, setModalVisible] = useState(false);

    const players = currentGame?.players.filter((player) => player.status === PlayerStatus.PLAYING) || [];
    const losers = currentGame?.players.filter((player) => [PlayerStatus.LOSER, PlayerStatus.GONE].includes(player.status)) || [];

    const playersSorted = players.sort((a, b) => a.score - b.score);
    const losersSorted = losers.sort((a, b) => a.score - b.score);

    const avg = players.reduce((acc, player) => acc + player.score, 0) / players.length;

    const getColor = (index: number) => {
        if (players.every((player) => player.score === players[0].score)) {
            return ["#05a2e6", "#37b1e6"];
        }

        const maxScore = Math.max(...players.map((player) => player.score));
        const minScore = Math.min(...players.map((player) => player.score));

        if (players[index].score === maxScore) {
            return ["#f53636", "#f26b6b"];
        } else if (players[index].score === minScore) {
            return ["#05e62e", "#3ddb5a"];
        } else {
            return ["#05a2e6", "#37b1e6"];
        }
    };


    const nextRound = () => {
        setModalVisible(true);
    };

    const handlePlayerPress = (playerId: number) => {
        Alert.alert(
            "Eliminar jugador",
            `¿Estás seguro de que quieres eliminar a ${playerId}?`,
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: () => removePlayer(playerId)
                },
            ]
        );
    };


    const handleFinalizarPartida = () => {
        Alert.alert(
            "Finalizar partida",
            "¿Estás seguro de que quieres finalizar la partida?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Finalizar",
                    style: "destructive",
                    onPress: () => {
                        endGame();
                        router.push("/(tabs)");
                    },
                },
            ]
        );
    };

    return {
        avg,
        currentGame,
        losersSorted,
        modalVisible,
        playersSorted,
        getColor,
        handleFinalizarPartida,
        handlePlayerPress,
        nextRound,
        setModalVisible,
    };
};
