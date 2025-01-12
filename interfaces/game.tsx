
export interface Player {
    id: number;
    name: string;
    score: number;
}

export type FinishMode = 'first-to-lose' | 'last-to-win';

export interface Game {
    id: string;
    name: string
    scoreLimit: number;
    finishMode: FinishMode;
    date: string;
    players: Player[];
}