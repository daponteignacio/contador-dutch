import { FinishModeStrategy } from "@/interfaces/FinishModeStrategy";
import { Game, Player, PlayerStatus } from "@/interfaces/game";

export class LastToWinStrategy implements FinishModeStrategy {
    checkWinner(players: Player[], scoreLimit: number): Player | undefined {
        const remainingPlayers = players.filter(player => player.status === PlayerStatus.PLAYING);
        console.log({ remainingPlayers });
        if (remainingPlayers.length === 1) {
            remainingPlayers[0].status = PlayerStatus.WINNER;
            return remainingPlayers[0];
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