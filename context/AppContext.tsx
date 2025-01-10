import { Game, Player } from '@/interfaces/game';
import { createContext } from 'react';


interface ContextProps {
    currentGame?: Game;
    currentOldGame?: Game;
    games: Game[];
    loading: boolean;

    newGame: (name: string, limit: number, players: Player[]) => void;
    updateCurrentGame: (game: Game) => void;
    selectOldGame: (id: number) => void;
}


export const AppContext = createContext({} as ContextProps);