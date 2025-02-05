import { FinishMode, Game, Player } from '@/interfaces/game';
import { createContext } from 'react';


interface ContextProps {
    currentGame?: Game;
    currentOldGame?: Game;
    games: Game[];
    loading: boolean;

    newGame: (name: string, limit: number, players: Player[], finishMode: FinishMode) => void;
    updateCurrentGame: (game: Game) => void;
    selectOldGame: (id: string) => void;
    endGame: () => void;
    removePlayer: (playerId: number) => void;
    finishRound: (game: Game) => void;
    deleteOldGame: (id: string) => void;
    endGameInAdvance: () => void;
    addPlayer: (name: string) => void;
}


export const AppContext = createContext({} as ContextProps);