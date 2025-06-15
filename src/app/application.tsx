import './index.css';
import { Button } from '@/shared/ui';
import { TicTacToe } from '@/shared/tic-tac-toe';
import styles from './app.module.css';
import { useCallback, useState } from 'react';

export function Application() {
  const [showGame, setShowGame] = useState(false);

  const toggleGame = useCallback(() => {
    setShowGame((prev) => !prev);
  }, []);

  return (
    <div className={styles.app}>
      <Button onClick={toggleGame} type='button'>
        {showGame ? 'Скрыть игру' : 'Играть в крестики-нолики'}
      </Button>

      {showGame && <TicTacToe />}
    </div>
  );
}
