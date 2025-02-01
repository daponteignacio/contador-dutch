import { useState, useContext } from "react";
import { Alert } from "react-native";
import { FinishMode, Player, PlayerStatus } from "@/interfaces/game";
import { AppContext } from "@/context";
import { router } from "expo-router";

export const useCreate = () => {
    const { newGame } = useContext(AppContext);

    const [state, setState] = useState({
        gameName: "",
        scoreLimit: "",
        errorMsg: "",
        currentPlayerName: "",
        players: [
        ] as Player[],
        finishMode: FinishMode.FIRST_TO_LOSE,
    });

    const handleError = (message: string) => {
        setState({ ...state, errorMsg: message });
        Alert.alert("Error", message, [
            {
                text: "Aceptar",
                onPress: () => setState({ ...state, errorMsg: "" }),
            },
        ]);
    };

    const addJugador = (name: string) => {
        if (name.trim() === "") return;

        const newJugador: Player = {
            id: state.players.length + 1,
            name,
            score: 0,
            status: PlayerStatus.PLAYING,
        };

        // setJugadores([newJugador, ...jugadores]);
        setState({ ...state, players: [newJugador, ...state.players] });
    };

    const handleCreateGame = () => {
        const scoreLimit = parseInt(state.scoreLimit);

        if (isNaN(scoreLimit)) {
            handleError("El límite de puntos debe ser un número entero");
            return;
        }

        if (scoreLimit < 0) {
            handleError("El límite de puntos debe ser mayor a 0");
            return;
        }

        if (state.players.length < 2) {
            handleError("Debe haber al menos 2 jugadores para iniciar la partida");
            return;
        }

        setState({ ...state, errorMsg: "" });
        newGame(state.gameName, scoreLimit, state.players, state.finishMode);

        // TODO: BUG -> Cuando se hace push a una ruta se buguea la tabbart y aparece el boton de back del stack navigator en el header del tab navigator
        router.back();
    };

    return {
        state,
        addJugador,
        handleCreateGame,
        setState,
    };
};
