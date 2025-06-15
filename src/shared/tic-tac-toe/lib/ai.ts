import type { CellValue } from '../types';
import { Player } from '../types';

export class TicTacToeAI {
  private aiPlayer: Player;
  private humanPlayer: Player;

  constructor(aiPlayer: Player = Player.O) {
    this.aiPlayer = aiPlayer;
    this.humanPlayer = aiPlayer === Player.O ? Player.X : Player.O;
  }

  // Основной метод для получения хода ИИ
  getBestMove(board: CellValue[]): number {
    const bestMove = this.minimax(board, this.aiPlayer, true);
    return bestMove.index;
  }

  // Алгоритм минимакс
  private minimax(
    board: CellValue[],
    player: Player,
    isMaximizing: boolean,
  ): { score: number; index: number } {
    const winner = this.checkWinner(board);

    // Базовые случаи
    if (winner === this.aiPlayer) {
      return { score: 10, index: -1 };
    }
    if (winner === this.humanPlayer) {
      return { score: -10, index: -1 };
    }

    if (this.isBoardFull(board)) {
      return { score: 0, index: -1 };
    }

    const availableMoves = this.getAvailableMoves(board);
    let bestMove = { score: isMaximizing ? -Infinity : Infinity, index: -1 };

    for (const move of availableMoves) {
      // Делаем ход
      const newBoard = [...board];
      newBoard[move] = player;

      // Рекурсивно вызываем минимакс для следующего игрока
      const nextPlayer =
        player === this.aiPlayer ? this.humanPlayer : this.aiPlayer;
      const result = this.minimax(newBoard, nextPlayer, !isMaximizing);

      if (isMaximizing) {
        if (result.score > bestMove.score) {
          bestMove = { score: result.score, index: move };
        }
      } else {
        if (result.score < bestMove.score) {
          bestMove = { score: result.score, index: move };
        }
      }
    }

    return bestMove;
  }

  // Проверка победителя
  private checkWinner(board: CellValue[]): Player | null {
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

  // Проверка заполненности доски
  private isBoardFull(board: CellValue[]): boolean {
    return board.every((cell) => cell !== null);
  }

  // Получение доступных ходов
  private getAvailableMoves(board: CellValue[]): number[] {
    return board
      .map((cell, index) => (cell === null ? index : -1))
      .filter((index) => index !== -1);
  }
}
