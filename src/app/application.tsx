import './index.css';
import { Button } from '@/shared/ui';
import { ViewerCard } from '@/shared/viewer';
import { env } from '@/shared/config/env';
import styles from './app.module.css';

export function Application() {
  const handleClick = () => {
    alert('ты пидор');
    // alert(`Привет из ${env.appName}! API: ${env.apiUrl}`);
  };

  return (
    <div className={styles.app}>
      <div className={styles.card}>
        <ViewerCard />

        <div>
          <Button onClick={handleClick}>узнать судьбу</Button>
          {env.debug && (
            <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
              Debug режим включен. API: {env.apiUrl}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
