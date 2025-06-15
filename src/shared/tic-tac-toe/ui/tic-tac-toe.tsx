import { useState, useCallback, useEffect, useMemo, memo } from 'react';
import { type CellValue, Player, GameState, Difficulty } from '../types';
import { TicTacToeAI } from '../lib/ai';
import { GameLogic } from '../lib/game-logic';
import styles from './tic-tac-toe.module.css';
import { GameStatusMessages } from '../config';
import { Button } from '@/shared/ui';
import clsx from 'clsx';

// Получение класса результата
function getResultClass(
  gameState: GameState,
  winner: Player | null,
  humanPlayer: Player,
): string {
  if (gameState === GameState.win) {
    return winner === humanPlayer ? styles.win : styles.lose;
  }

  if (gameState === GameState.draw) {
    return styles.draw;
  }
  return '';
}

export function TicTacToe() {
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.X);
  const [gameState, setGameState] = useState<GameState>(GameState.playing);
  const [winner, setWinner] = useState<Player | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.hard);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [humanPlayer, setHumanPlayer] = useState<Player>(Player.X);
  const [gameStarted, setGameStarted] = useState(false);

  const aiPlayer = humanPlayer === Player.X ? Player.O : Player.X;
  const ai = useMemo(() => new TicTacToeAI(aiPlayer), [aiPlayer]);

  // Проверка состояния игры
  const checkGameState = useCallback((newBoard: CellValue[]) => {
    const result = GameLogic.getGameState(newBoard);
    setGameState(result.state);
    setWinner(result.winner);
    return result;
  }, []);

  // Ход игрока
  const makeMove = useCallback(
    (index: number) => {
      if (
        board[index] ||
        gameState !== GameState.playing ||
        isAiThinking ||
        currentPlayer !== humanPlayer
      )
        return;

      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      const result = checkGameState(newBoard);

      if (result.state === GameState.playing) {
        setCurrentPlayer(currentPlayer === Player.X ? Player.O : Player.X);
      }
    },
    [
      board,
      currentPlayer,
      gameState,
      isAiThinking,
      humanPlayer,
      checkGameState,
    ],
  );

  // Ход ИИ
  const makeAiMove = useCallback(async () => {
    if (currentPlayer !== aiPlayer || gameState !== GameState.playing) {
      return;
    }

    setIsAiThinking(true);

    // Добавляем небольшую задержку для реалистичности
    await new Promise((resolve) => setTimeout(resolve, 500));

    let aiMoveIndex: number;

    switch (difficulty) {
      // Легкий уровень - случайный ход
      case Difficulty.easy: {
        const availableMoves = board
          .map((cell, index) => (cell === null ? index : -1))
          .filter((index) => index !== -1);
        aiMoveIndex =
          availableMoves[Math.floor(Math.random() * availableMoves.length)];
        break;
      }

      case Difficulty.medium:
        // Средний уровень - 70% оптимальных ходов, 30% случайных
        if (Math.random() < 0.7) {
          aiMoveIndex = ai.getBestMove(board);
        } else {
          const availableMoves = board
            .map((cell, index) => (cell === null ? index : -1))
            .filter((index) => index !== -1);
          aiMoveIndex =
            availableMoves[Math.floor(Math.random() * availableMoves.length)];
        }
        break;

      case Difficulty.hard:
      default:
        // Сложный уровень - всегда оптимальный ход
        aiMoveIndex = ai.getBestMove(board);
        break;
    }

    const newBoard = [...board];
    newBoard[aiMoveIndex] = aiPlayer;
    setBoard(newBoard);

    const result = checkGameState(newBoard);

    if (result.state === GameState.playing) {
      setCurrentPlayer(aiPlayer === Player.X ? Player.O : Player.X);
    }

    setIsAiThinking(false);
  }, [
    board,
    currentPlayer,
    gameState,
    difficulty,
    ai,
    checkGameState,
    aiPlayer,
  ]);

  // Эффект для хода ИИ
  useEffect(() => {
    if (
      currentPlayer === aiPlayer &&
      gameState === GameState.playing &&
      gameStarted
    ) {
      makeAiMove();
    }
  }, [currentPlayer, gameState, makeAiMove, aiPlayer, gameStarted]);

  // Начать игру
  const startGame = (selectedPlayer: Player) => {
    setHumanPlayer(selectedPlayer);
    setCurrentPlayer(Player.X); // X всегда ходит первым
    setGameStarted(true);
    resetGameState();
  };

  // Сброс состояния игры
  const resetGameState = () => {
    setBoard(Array(9).fill(null));
    setGameState(GameState.playing);
    setWinner(null);
    setIsAiThinking(false);
  };

  // Сброс игры (возврат к выбору стороны)
  const resetGame = () => {
    setGameStarted(false);
    setCurrentPlayer(Player.X);
    resetGameState();
  };

  // Новая игра с той же стороной
  const newGameSameSide = () => {
    setCurrentPlayer(Player.X);
    resetGameState();
  };

  // Получение статуса игры
  const getGameStatus = useMemo(() => {
    if (isAiThinking) {
      return GameStatusMessages.thinking;
    }

    if (gameState === GameState.win) {
      return winner === humanPlayer
        ? GameStatusMessages.win
        : GameStatusMessages.lose;
    }
    if (gameState === GameState.draw) {
      return GameStatusMessages.draw;
    }

    return currentPlayer === humanPlayer
      ? GameStatusMessages.yourTurn
      : GameStatusMessages.aiTurn;
  }, [isAiThinking, gameState, winner, currentPlayer, humanPlayer]);

  // Получение класса результата
  const resultClass = useMemo(() => {
    return getResultClass(gameState, winner, humanPlayer);
  }, [gameState, winner, humanPlayer]);

  // Если игра не начата, показываем экран выбора стороны
  if (!gameStarted) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Крестики-нолики с ИИ</h2>

        <div className={styles.sideSelection}>
          <h3 className={styles.selectionTitle}>Выберите свою сторону:</h3>

          <div className={styles.sideButtons}>
            <button
              className={clsx(styles.sideButton, styles.xButton)}
              onClick={() => startGame(Player.X)}
            >
              <span className={styles.sideSymbol}>X</span>
              <span className={styles.sideLabel}>Крестики</span>
              <span className={styles.sideNote}>(ходите первым)</span>
            </button>

            <button
              onClick={() => startGame(Player.O)}
              className={clsx(styles.sideButton, styles.oButton)}
            >
              <span className={styles.sideSymbol}>O</span>
              <span className={styles.sideLabel}>Нолики</span>
              <span className={styles.sideNote}>(ИИ ходит первым)</span>
            </button>
          </div>
        </div>

        <div className={styles.difficultySection}>
          <label className={styles.difficultyLabel}>
            Сложность:
            <DifficultySelect
              value={difficulty}
              onChange={(event) =>
                setDifficulty(event.target.value as Difficulty)
              }
              disabled={false}
            />
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <Button onClick={newGameSameSide} type='button'>
          Новая игра
        </Button>

        <Button
          type='button'
          onClick={resetGame}
          className={styles.secondaryButton}
        >
          Сменить сторону
        </Button>
      </div>

      <h2 className={styles.title}>Крестики-нолики с ИИ</h2>

      <div className={styles.gameHeader}>
        <div className={styles.playerInfo}>
          <span className={styles.playerLabel}>
            Вы играете:{' '}
            <span
              className={clsx(
                styles.playerSymbol,
                humanPlayer === Player.X ? styles.x : styles.o,
              )}
            >
              {humanPlayer}
            </span>
          </span>
        </div>
      </div>

      <div className={styles.gameInfo}>
        <div className={clsx(styles.gameResult, resultClass)}>
          {getGameStatus}
        </div>
      </div>

      <div className={styles.board}>
        {board.map((cell, index) => (
          <button
            key={index}
            className={clsx(
              styles.cell,
              cell === Player.X && styles.x,
              cell === Player.O && styles.o,
            )}
            onClick={() => makeMove(index)}
            disabled={
              !!cell ||
              gameState !== GameState.playing ||
              isAiThinking ||
              currentPlayer !== humanPlayer
            }
          >
            {cell}
          </button>
        ))}
      </div>
    </div>
  );
}

interface DifficultySelectProps {
  value: Difficulty;
  disabled: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DifficultySelect = memo<DifficultySelectProps>((props) => {
  return (
    <select {...props} className={styles.difficultySelect}>
      <option value={Difficulty.easy}>Легко</option>
      <option value={Difficulty.medium}>Средне</option>
      <option value={Difficulty.hard}>Сложно</option>
    </select>
  );
});

DifficultySelect.displayName = 'DifficultySelect';
