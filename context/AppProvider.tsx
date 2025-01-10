import { FC, useReducer } from 'react';
import { AppContext, appReducer } from './index';
import { Game, Player } from '@/interfaces/game';




export interface AppState {
    currentGame?: Game;
    currentOldGame?: Game;
    games: Game[];
    loading: boolean;
}

const App_INITIAL_STATE: AppState = {
    games: [
        {
            id: 1,
            name: "abc123",
            date: "15/01/2024",
            scoreLimit: 200,
            players: [
                { id: 1, name: "Juan", score: 90 },
                { id: 2, name: "Pedro", score: 198 },
                { id: 3, name: "Ana", score: 205 },
                { id: 4, name: "Luis", score: 100 },
            ],
        },
        {
            id: 2,
            name: "abc123",
            date: "10/01/2024",
            scoreLimit: 150,
            players: [
                { id: 1, name: "Carlos", score: 100 },
                { id: 2, name: "María", score: 149 },
                { id: 3, name: "Sofía", score: 151 },
                { id: 4, name: "Andrés", score: 70 },
            ],
        },
        {
            id: 3,
            name: "abc123",
            date: "05/01/2024",
            scoreLimit: 180,
            players: [
                { id: 1, name: "Laura", score: 50 },
                { id: 2, name: "Roberto", score: 179 },
                { id: 3, name: "Pablo", score: 183 },
                { id: 4, name: "Elena", score: 90 },
            ],
        },
        {
            id: 4,
            name: "game4",
            date: "01/01/2024",
            scoreLimit: 100,
            players: [],
        },
        {
            id: 5,
            name: "game5",
            date: "02/01/2024",
            scoreLimit: 120,
            players: [],
        },
        {
            id: 6,
            name: "game6",
            date: "03/01/2024",
            scoreLimit: 140,
            players: [],
        },
        {
            id: 7,
            name: "game7",
            date: "04/01/2024",
            scoreLimit: 160,
            players: [],
        },
        {
            id: 8,
            name: "game8",
            date: "05/01/2024",
            scoreLimit: 180,
            players: [],
        },
        {
            id: 9,
            name: "game9",
            date: "06/01/2024",
            scoreLimit: 200,
            players: [],
        },
        {
            id: 10,
            name: "game10",
            date: "07/01/2024",
            scoreLimit: 220,
            players: [],
        },
        {
            id: 11,
            name: "game11",
            date: "08/01/2024",
            scoreLimit: 240,
            players: [],
        },
        {
            id: 12,
            name: "game12",
            date: "09/01/2024",
            scoreLimit: 260,
            players: [],
        },
        {
            id: 13,
            name: "game13",
            date: "10/01/2024",
            scoreLimit: 280,
            players: [],
        }
    ],
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

    const newGame = (name: string, limit: number, players: Player[]) => {
        dispatch({ type: "NEW_GAME", payload: { name, limit, players } });
    }

    const selectOldGame = (id: number) => {
        const game = state.games.find(g => g.id === id);
        if (!game) return;
        dispatch({ type: "SELECT_OLD_GAME", payload: game });
    }

    return (
        <AppContext.Provider value={{
            ...state,

            newGame,
            updateCurrentGame,
            selectOldGame
        }}>
            {children}
        </AppContext.Provider>
    )
};                  