import { FinishModeStrategy } from "@/interfaces/FinishModeStrategy";
import { FinishMode, Game, Player, PlayerStatus } from "@/interfaces/game";

export class FirstToLoseStrategy implements FinishModeStrategy {
    checkWinner(players: Player[], scoreLimit: number): Player | undefined {
        const loser = players.some(player => player.score >= scoreLimit);
        if (loser) {
            const winner = players.reduce((prev, curr) => (prev.score < curr.score ? prev : curr));
            winner.status = PlayerStatus.WINNER;
            return winner;
        }
        return undefined;
    }

    processRound(game: Game): Game {
        const updatedPlayersList: Player[] = game.players.map(player => {
            if (player.score >= game.scoreLimit) {
                player.status = PlayerStatus.LOSER;
            }

            return player;
        });

        game.players = updatedPlayersList;

        return game;
    }
}

