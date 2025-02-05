import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context';
import { Game, PlayerStatus } from '@/interfaces/game';
import * as Haptics from "expo-haptics";

export const useFinishRoundV2 = () => {
    const { currentGame, finishRound } = useContext(AppContext);
    const [currentGameCopy, setCurrentGameCopy] = useState<Game>({ ...currentGame! });
    const [error, setError] = useState("");

    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const players = (currentGameCopy?.players || [])
        .filter((player) => player.status === PlayerStatus.PLAYING)
        .sort((a, b) => a.score - b.score);

    const currentPlayer = players[currentPlayerIndex];

    const [playersNewPoints, setPlayersNewPoints] = useState({
        [currentPlayer?.id]: 0,
    });

    const handleAddPoints = (newPoints: number) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);

        setPlayersNewPoints((prev) => ({
            ...prev,
            [currentPlayer?.id]: prev[currentPlayer?.id] + newPoints,
        }));
    };

    const handleSubtractPoints = (newPoints: number) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);

        if (playersNewPoints[currentPlayer?.id] - newPoints < 0) {
            setError("El puntaje no puede ser negativo");
            return;
        }

        setPlayersNewPoints((prev) => ({
            ...prev,
            [currentPlayer?.id]: prev[currentPlayer?.id] - newPoints,
        }));
    };

    const handleNextPlayer = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        if (currentPlayerIndex === players.length - 1) return;
        setCurrentPlayerIndex((prev) => prev + 1);
    };

    const handlePreviousPlayer = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        if (currentPlayerIndex === 0) return;
        setCurrentPlayerIndex((prev) => prev - 1);
    };

    const terminateRound = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        currentGameCopy!.players = currentGameCopy!.players.map((player) => {
            if (player.status === PlayerStatus.PLAYING) {
                player.score += playersNewPoints[player.id];
            }

            return player;
        });

        finishRound(currentGameCopy);
        setCurrentPlayerIndex(0);
        setPlayersNewPoints({ [currentPlayer?.id]: 0 });
    }


    useEffect(() => {
        if (playersNewPoints[currentPlayer?.id] !== undefined) return; // If the player is not in the object, return

        setPlayersNewPoints((prev) => ({
            ...prev,
            [currentPlayer?.id]: 0,
        }));
    }, [currentPlayerIndex]);

    useEffect(() => {
        setCurrentGameCopy({ ...currentGame! });
    }, [currentGame]);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (error) {
            timeout = setTimeout(() => {
                setError("");
            }, 3000);
        }

        return () => {
            clearTimeout(timeout);
        }

    }, [error]);

    return {
        currentGameCopy,
        currentPlayer,
        currentPlayerIndex,
        error,
        newPlayerPoints: playersNewPoints[currentPlayer?.id],
        players,
        terminateRound,
        handleAddPoints,
        handleNextPlayer,
        handlePreviousPlayer,
        handleSubtractPoints,
        setCurrentPlayerIndex,
    }
}

