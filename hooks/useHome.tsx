import { useContext } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { AppContext } from "@/context";

export const useHome = () => {
    const router = useRouter();
    const { currentGame, games, deleteOldGame } = useContext(AppContext);

    const handleNewGame = () => {
        if (currentGame) {
            Alert.alert("Atención", "Ya hay una partida en curso. ¿Estás seguro que querés descartarla?", [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Descartar",
                    onPress: () => router.push("/game/create"),
                },
            ]);

            return;
        }

        router.push("/game/create");
    };


    const handleClearGames = (gameId: string) => {
        deleteOldGame(gameId);
    };

    const handleDeleteOldGame = (gameId: string) => {
        Alert.alert("Atención", "¿Estás seguro que querés eliminar esta partida?", [
            {
                text: "Cancelar",
                style: "cancel",
            },
            {
                text: "Eliminar",
                onPress: () => handleClearGames(gameId),
            },
        ]);
    }

    return {
        currentGame,
        games,
        router,
        handleDeleteOldGame,
        handleNewGame,
    };
};
