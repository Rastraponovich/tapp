import { useViewer } from './model';
import styles from './style.module.css';

export function ViewerCard() {
  const user = useViewer();

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <img
          alt='user'
          width={40}
          height={40}
          src={user?.photo_url}
          className={styles.cardPhoto}
        />
      </div>
      <div className={styles.cardBody}>
        <p className={styles.cardName}>
          {user?.first_name} {user?.last_name}
        </p>
        <p className={styles.cardUsername}>@{user?.username}</p>
      </div>
    </div>
  );
}
