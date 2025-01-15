import { FinishMode, Game, Player, PlayerStatus } from "@/interfaces/game";
import { AppState } from "./AppProvider";
import { formatDate } from "@/utils/formatDate";

export type AppAction =
    { type: 'ADD_LOSERS', payload: Player[] } |
    { type: 'END_GAME' } |
    { type: 'NEW_GAME', payload: { name: string, limit: number, players: Player[], id: string, finishMode: FinishMode } } |
    { type: 'REMOVE_PLAYER', payload: number } |
    { type: 'SELECT_OLD_GAME', payload: Game } |
    { type: 'SET_GAMES', payload: Game[] } |
    { type: 'SET_WINNER', payload: Player } |
    { type: 'UPDATE_CURRENT_GAME', payload: Game } |
    { type: 'DELETE_OLD_GAME', payload: string };

export const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case 'ADD_LOSERS':
            return {
                ...state,
                currentGame: {
                    ...state.currentGame!,
                    players: state.currentGame!.players.filter(p => !action.payload.some(l => l.id === p.id))
                }
            };
        case 'END_GAME':
            return {
                ...state,
                games: [...state.games, state.currentGame!],
                currentGame: undefined
            };
        case 'NEW_GAME':
            return {
                ...state,
                currentGame: {
                    date: formatDate(new Date()),
                    finishMode: action.payload.finishMode,
                    id: action.payload.id,
                    name: action.payload.name,
                    players: action.payload.players,
                    scoreLimit: action.payload.limit,
                }
            };
        case 'REMOVE_PLAYER':
            return {
                ...state,
                currentGame: {
                    ...state.currentGame!,
                    players: state.currentGame!.players.map(p => p.id === action.payload ? { ...p, status: PlayerStatus.GONE } : p)
                }
            };
        case 'SELECT_OLD_GAME':
            return {
                ...state,
                currentOldGame: action.payload
            };
        case 'SET_GAMES':
            return {
                ...state,
                games: action.payload
            };
        case 'SET_WINNER':
            return {
                ...state,
                currentGame: {
                    ...state.currentGame!,
                    winner: action.payload
                }
            };
        case 'UPDATE_CURRENT_GAME':
            return {
                ...state,
                currentGame: action.payload
            };
        case 'DELETE_OLD_GAME':
            return {
                ...state,
                games: state.games.filter(g => g.id !== action.payload)
            };
        default:
            return state;
    }
};
