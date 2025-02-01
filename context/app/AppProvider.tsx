import { FC, useEffect, useReducer, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import { router } from 'expo-router';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import LottieView from 'lottie-react-native';
import { AppContext } from './AppContext';
import { appReducer } from './appReducer';
import { FinishModeStrategy, FinishMode, Game, Player, PlayerStatus } from '@/interfaces';
import { Storage, formatDate } from '@/utils';
import { LastToWinStrategy, FirstToLoseStrategy } from '@/models';
import { WinnerModal } from '@/components/WinnerModal';

const { width, height } = Dimensions.get('window');

// TODO: Al terminar una partida anticipadamente tambien debe mostrarse quien es el ganador y guardarse esa informacio en el estado de la app.

export interface AppState {
    currentGame?: Game;
    currentOldGame?: Game;
    games: Game[];
    loading: boolean;
}

const App_INITIAL_STATE: AppState = {
    // currentGame: {
    //     id: uuidv4(),
    //     name: "Partida",
    //     scoreLimit: 100,
    //     players: [
    //         { id: 1, name: "Jugador 1", score: 99, status: PlayerStatus.PLAYING },
    //         { id: 2, name: "Jugador 2", score: 10, status: PlayerStatus.PLAYING },
    //         { id: 3, name: "Jugador 3", score: 20, status: PlayerStatus.PLAYING },
    //         { id: 4, name: "Jugador 4", score: 30, status: PlayerStatus.PLAYING },
    //         { id: 5, name: "Jugador 5", score: 40, status: PlayerStatus.PLAYING },
    //     ],
    //     date: formatDate(new Date()),
    //     finishMode: FinishMode.FIRST_TO_LOSE,
    // },
    games: [],
    loading: true
}


interface AppProviderProps {
    children: React.ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(appReducer, App_INITIAL_STATE);

    const updateCurrentGame = (game: Game) => {
        dispatch({ type: "UPDATE_CURRENT_GAME", payload: game });
    }

    const newGame = (name: string, limit: number, players: Player[], finishMode: FinishMode) => {
        const id = uuidv4();
        dispatch({ type: "NEW_GAME", payload: { name, limit, players, id, finishMode } });
    }

    const endGame = () => {
        dispatch({ type: "END_GAME" });
    }

    const removePlayer = (playerId: number) => {
        dispatch({ type: "REMOVE_PLAYER", payload: playerId });
    }

    const selectOldGame = (id: string) => {
        const game = state.games.find(g => g.id === id);
        if (!game) return;
        dispatch({ type: "SELECT_OLD_GAME", payload: game });
    }

    const deleteOldGame = (id: string) => {
        dispatch({ type: "DELETE_OLD_GAME", payload: id });
    }

    useEffect(() => {
        if (!state.games.length) return;
        Storage.setItem("games", state.games);
    }, [state.games]);

    useEffect(() => {
        Storage.getItem("games").then((games) => {
            const parsedGames = games as Game[];

            if (parsedGames.length) dispatch({ type: "SET_GAMES", payload: parsedGames });
        });
    }, []);

    const getFinishModeStrategy = (finishMode: FinishMode): FinishModeStrategy => {
        switch (finishMode) {
            case FinishMode.FIRST_TO_LOSE:
                return new FirstToLoseStrategy();
            case FinishMode.LAST_TO_WIN:
                return new LastToWinStrategy();
            default:
                throw new Error('Unsupported finish mode');
        }
    };

    const finishRound = (game: Game) => {
        if (!game) return;

        const strategy = getFinishModeStrategy(game.finishMode);

        console.log('Previous game:');
        game.players.forEach(player => console.log(player));
        const processedGame = strategy.processRound(game);

        console.log('Processed game:');
        processedGame.players.forEach(player => console.log(player));

        dispatch({ type: "UPDATE_CURRENT_GAME", payload: processedGame });

        const winner = strategy.checkWinner(processedGame.players, processedGame.scoreLimit);

        if (winner) {
            dispatch({ type: "UPDATE_CURRENT_GAME", payload: processedGame });
            showWinner(winner);
        }
    };

    const endGameInAdvance = () => {
        const { currentGame } = state;
        if (!currentGame) return;

        const winner = currentGame.players.reduce((prev, current) => (prev.score < current.score) ? prev : current);
        winner.status = PlayerStatus.WINNER;

        showWinner(winner);
        dispatch({ type: "UPDATE_CURRENT_GAME", payload: { ...currentGame } });
    }


    const animationRef = useRef<LottieView>(null);

    const showWinner = (winner: Player) => {
        setWinner(winner);

        if (animationRef.current) {
            animationRef.current.play();
        }
    };

    const [winner, setWinner] = useState<Player | null>(null);

    return (
        <AppContext.Provider value={{
            ...state,
            endGameInAdvance,
            newGame,
            updateCurrentGame,
            selectOldGame,
            endGame,
            removePlayer,
            finishRound,
            deleteOldGame,
        }}>

            <WinnerModal
                winner={winner!}
                visible={winner !== null}
                onClose={() => {
                    setWinner(null);
                    endGame();
                    router.push('/(tabs)');
                }}
            />

            <LottieView
                ref={animationRef}
                source={require('@/assets/confeti.json')}
                autoPlay={false}
                loop={false}
                style={{
                    width: width * 2, // Escala horizontalmente
                    height: height * 2, // Escala verticalmente
                    position: 'absolute',
                    zIndex: 0, // Asegura que la animación esté detrás del botón
                    transform: [{ scale: 1.2 }], // Escala la animación
                }}
            />
            {children}
        </AppContext.Provider>
    )
};                  