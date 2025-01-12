import { useContext } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { AppContext } from "@/context";

export const useHome = () => {
    const router = useRouter();
    const { currentGame, games } = useContext(AppContext);

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

    return {
        currentGame,
        games,
        handleNewGame,
        router,
    };
};
