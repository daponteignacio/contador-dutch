
export interface Player {
    id: number;
    name: string;
    score: number;
}

export interface Game {
    id: number;
    name: string
    scoreLimit: number;
    date: string;
    players: Player[];
}