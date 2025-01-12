// create appReducer

import { FinishMode, Game, Player } from "@/interfaces/game";
import { AppState } from "./AppProvider";
import { formatDate } from "@/utils/formatDate";

export type AppAction =
    { type: 'NEW_GAME', payload: { name: string, limit: number, players: Player[], id: string, finishMode: FinishMode } } |
    { type: 'UPDATE_CURRENT_GAME', payload: Game } |
    { type: 'SELECT_OLD_GAME', payload: Game } |
    { type: 'END_GAME' } |
    { type: 'SET_GAMES', payload: Game[] } |
    { type: 'REMOVE_PLAYER', payload: number };


export const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
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
            }
        case 'END_GAME':
            return {
                ...state,
                games: [...state.games, state.currentGame!],
                currentGame: undefined
            }
        case 'SELECT_OLD_GAME':
            return {
                ...state,
                currentOldGame: action.payload
            }
        case 'UPDATE_CURRENT_GAME':
            return {
                ...state,
                currentGame: action.payload
            }
        case 'SET_GAMES':
            return {
                ...state,
                games: action.payload
            }
        case 'REMOVE_PLAYER':
            return {
                ...state,
                currentGame: {
                    ...state.currentGame!,
                    players: state.currentGame!.players.filter(p => p.id !== action.payload)
                }
            }
        default:
            return state;
    }
}