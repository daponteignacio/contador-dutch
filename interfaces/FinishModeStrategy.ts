import { Game, Player } from "./game";

export interface FinishModeStrategy {
    checkWinner(players: Player[], scoreLimit: number): Player | undefined;
    processRound(game: Game): Game;
}