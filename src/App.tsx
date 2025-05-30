import { useEffect, useState } from 'react';
import './App.css';
import { init, isTMA, retrieveLaunchParams } from '@telegram-apps/sdk';
import { Button } from './shared/ui';

// Определение интерфейса для данных пользователя
interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}

function App() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Инициализация Telegram Web App
    const initTelegram = async () => {
      try {
        // Инициализируем SDK
        init();

        // Получаем данные пользователя
        const launchParams = retrieveLaunchParams();

        // Парсим данные пользователя если они есть
        if (launchParams.initDataRaw && typeof launchParams.initDataRaw === 'string') {
          const params = new URLSearchParams(launchParams.initDataRaw);
          const userParam = params.get('user');

          if (userParam) {
            try {
              const userData = JSON.parse(userParam) as TelegramUser;
              setUser(userData);
            } catch (e) {
              console.error('Ошибка парсинга данных пользователя:', e);
            }
          }
        }

        setIsReady(true);
      } catch (error) {
        console.error('Ошибка инициализации Telegram Web App:', error);
        setIsReady(true); // Отмечаем как готовое даже при ошибке
      }
    };

    isTMA('complete').then((res) => {
      if (res) {
        initTelegram();
      }
    });
  }, []);

  return (
    <>
      <h1>Telegram Mini App</h1>
      {user && (
        <div className='user-info'>
          <p>
            Привет, {user.first_name} {user.last_name}!
          </p>
        </div>
      )}
      <div className='card'>
        <Button
          onClick={() => {
            alert('жопка');
          }}
        >
          кнопка
        </Button>
        <p>Telegram Mini App готов: {isReady ? 'Да' : 'Нет'}</p>
      </div>
    </>
  );
}

export default App;
