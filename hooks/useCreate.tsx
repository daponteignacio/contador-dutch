import { useState, useContext } from "react";
import { Alert } from "react-native";
import { FinishMode, Player } from "@/interfaces/game";
import { AppContext } from "@/context";
import { router } from "expo-router";

export const useCreate = () => {
    const { newGame } = useContext(AppContext);

    const [form, setForm] = useState({
        nombre: "",
        limite: "",
    });

    const [error, setError] = useState("");
    const [jugadorName, setJugadorName] = useState("");
    const [jugadores, setJugadores] = useState<Player[]>([]);
    const [finishMode, setFinishMode] = useState<FinishMode>("first-to-lose");

    const handleError = (message: string) => {
        setError(message);
        Alert.alert("Error", message, [
            {
                text: "Aceptar",
                onPress: () => setError(""),
            },
        ]);
    };

    const addJugador = (name: string) => {
        if (name.trim() === "") return;

        const newJugador: Player = {
            id: jugadores.length + 1,
            name,
            score: 0,
        };

        setJugadores([newJugador, ...jugadores]);
    };

    const handleCreateGame = () => {
        const parsedNumber = parseInt(form.limite);

        if (isNaN(parsedNumber)) {
            handleError("El límite de puntos debe ser un número entero");
            return;
        }

        if (parsedNumber < 0) {
            handleError("El límite de puntos debe ser mayor a 0");
            return;
        }

        if (jugadores.length < 2) {
            handleError("Debe haber al menos 2 jugadores para iniciar la partida");
            return;
        }

        setError("");
        newGame(form.nombre, parsedNumber, jugadores, finishMode);
        router.replace("/(tabs)/partida");
    };

    return {
        error,
        form,
        jugadores,
        jugadorName,
        finishMode,
        addJugador,
        handleCreateGame,
        setFinishMode,
        setForm,
        setJugadores,
        setJugadorName,
    };
};
