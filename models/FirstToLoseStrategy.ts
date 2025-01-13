import { FinishModeStrategy } from "@/interfaces/FinishModeStrategy";
import { FinishMode, Game, Player, PlayerStatus } from "@/interfaces/game";

export class FirstToLoseStrategy implements FinishModeStrategy {
    checkWinner(players: Player[], scoreLimit: number): Player | undefined {
        const loser = players.find(player => player.score >= scoreLimit);
        if (loser) {
            // El ganador es el jugador con el menor puntaje
            return players.reduce((prev, curr) => (prev.score < curr.score ? prev : curr));
        }
        return undefined;
    }

    processRound(game: Game): Game {
        const { players, scoreLimit } = game;

        const updatedPlayersList: Player[] = players.map(player => {
            const winner = players.reduce((prev, curr) => (prev.score < curr.score ? prev : curr));
            winner.status = PlayerStatus.WINNER;
            return player;
        });

        game.players = updatedPlayersList;

        return game;
    }
}

