import { FinishModeStrategy } from "@/interfaces/FinishModeStrategy";
import { Game, Player, PlayerStatus } from "@/interfaces/game";

export class LastToWinStrategy implements FinishModeStrategy {
    checkWinner(players: Player[], scoreLimit: number): Player | undefined {
        const remainingPlayers = players.filter(player => player.score < scoreLimit);
        if (remainingPlayers.length === 1) {
            return remainingPlayers[0]; // Último jugador que no superó el límite
        }
        return undefined;
    }

    processRound(game: Game): Game {
        const { players, scoreLimit } = game;

        const updatedPlayersList: Player[] = players.map(player => {
            if (player.score >= scoreLimit) {
                player.status = PlayerStatus.LOSER;
            }

            return player;
        });

        game.players = updatedPlayersList;

        return game;
    }
}