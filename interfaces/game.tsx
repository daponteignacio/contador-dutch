
export enum PlayerStatus {
    PLAYING = 'playing',
    WINNER = 'winner',
    LOSER = 'loser'
}

export interface Player {
    id: number;
    name: string;
    score: number;
    status: PlayerStatus;
}


export enum FinishMode {
    FIRST_TO_LOSE = 'first-to-lose',
    LAST_TO_WIN = 'last-to-win'
}

export interface Game {
    id: string;
    name: string
    scoreLimit: number;
    finishMode: FinishMode;
    date: string;
    players: Player[];
    winner?: Player;
}