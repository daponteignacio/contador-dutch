// create appReducer

import { Game, Player } from "@/interfaces/game";
import { AppState } from "./AppProvider";

export type AppAction =
    { type: 'NEW_GAME', payload: { name: string, limit: number, players: Player[] } } |
    { type: 'UPDATE_CURRENT_GAME', payload: Game } |
    { type: 'SELECT_OLD_GAME', payload: Game }


export const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case 'NEW_GAME':
            return {
                ...state,
                currentGame: {
                    id: state.games.length + 1,
                    name: action.payload.name,
                    scoreLimit: action.payload.limit,
                    date: new Date().toISOString(),
                    players: action.payload.players
                }
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
        default:
            return state;
    }
}