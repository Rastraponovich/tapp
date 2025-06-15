export type CellValue = 'X' | 'O' | null;

export enum Player {
  X = 'X',
  O = 'O',
}

export enum GameState {
  playing = 'playing',
  win = 'win',
  draw = 'draw',
}

export enum Difficulty {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
}

export interface GameBoard {
  board: CellValue[];
  currentPlayer: Player;
  gameState: GameState;
  winner: Player | null;
}
