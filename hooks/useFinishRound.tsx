import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context';
import { Game, PlayerStatus } from '@/interfaces/game';
import * as Haptics from "expo-haptics";

export const useFinishRound = () => {
    const { currentGame, finishRound } = useContext(AppContext);
    const [currentGameCopy, setCurrentGameCopy] = useState<Game>({ ...currentGame! });

    useEffect(() => {
        setCurrentGameCopy({ ...currentGame! });
    }, [currentGame])

    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const players = (currentGameCopy?.players || []).filter((player) => player.status === PlayerStatus.PLAYING);

    const playerCopy = currentGame?.players.find((player) => player.id === currentPlayer?.id);

    const currentPlayer = players[currentPlayerIndex];

    const [error, setError] = useState("");


    const handleAddPoints = (newPoints: number) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);

        setCurrentGameCopy((prev) => ({
            ...prev,
            players: prev.players?.map((player) =>
                player.id === currentPlayer?.id
                    ? { ...player, score: player.score + newPoints }
                    : player
            ),
        }));
    };

    const handleSubtractPoints = (newPoints: number) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);

        if (currentPlayer.score - newPoints < 0) {
            setError('No puedes ingresar números negativos');
            return;
        }

        const playerCopy = currentGame?.players.find((player) => player.id === currentPlayer?.id);
        const player = players.find((player) => player.id === currentPlayer?.id);


        if ((player?.score ?? 0) - newPoints < (playerCopy?.score ?? 0)) {
            console.log(playerCopy, player);
            return;
        }

        setCurrentGameCopy((prev) => ({
            ...prev,
            players: prev.players?.map((player) =>
                player.id === currentPlayer?.id
                    ? { ...player, score: player.score - newPoints }
                    : player
            ),
        }));
    };

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

    return {
        currentGameCopy,
        currentPlayer,
        currentPlayerIndex,
        error,
        playerCopy,
        players,
        finishRound,
        handleAddPoints,
        handleNextPlayer,
        handlePreviousPlayer,
        handleSubtractPoints,
        setCurrentPlayerIndex,
    }
}

