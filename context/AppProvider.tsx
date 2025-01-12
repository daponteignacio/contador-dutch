import { FC, useEffect, useReducer } from 'react';
import { AppContext, appReducer } from './';
import { FinishMode, Game, Player } from '@/interfaces/game';
import { Storage } from '@/utils/AsyncStorage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

// TODO: terminar la partida automaticamente cuando se llegue al limite de puntos definido y mostrar un mensaje de felicitaciones al ganador (agregar animacion de confeti).


export interface AppState {
    currentGame?: Game;
    currentOldGame?: Game;
    games: Game[];
    loading: boolean;
}

const App_INITIAL_STATE: AppState = {
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

    useEffect(() => {
        if (!state.games.length) return;
        Storage.setItem("games", state.games);
    }, [state.games]);

    useEffect(() => {
        Storage.getItem("games").then((games) => {
            const parsedGames = games as Game[];
            console.log({ parsedGames })

            if (parsedGames.length) {
                dispatch({ type: "SET_GAMES", payload: parsedGames });
            }
        });
    }, []);

    return (
        <AppContext.Provider value={{
            ...state,

            newGame,
            updateCurrentGame,
            selectOldGame,
            endGame,
            removePlayer,
        }}>
            {children}
        </AppContext.Provider>
    )
};                  