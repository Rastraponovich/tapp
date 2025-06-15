import { type CellValue, type Player, GameState } from '../types';

export class GameLogic {
  static checkWinner(board: CellValue[]): Player | null {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // горизонтали
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // вертикали
      [0, 4, 8],
      [2, 4, 6], // диагонали
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a] as Player;
      }
    }

    return null;
  }

  static isBoardFull(board: CellValue[]): boolean {
    return board.every((cell) => cell !== null);
  }

  static getGameState(board: CellValue[]): {
    state: GameState;
    winner: Player | null;
  } {
    const winner = this.checkWinner(board);

    if (winner) {
      return { state: GameState.win, winner };
    }

    if (this.isBoardFull(board)) {
      return { state: GameState.draw, winner: null };
    }

    return { state: GameState.playing, winner: null };
  }
}
