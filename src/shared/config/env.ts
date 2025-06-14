/**
 * Конфигурация переменных окружения
 * В Vite переменные окружения должны начинаться с VITE_
 */

export const env = {
  // API конфигурация
  apiUrl: import.meta.env.VITE_API_URL || 'https://api.example.com',

  // Конфигурация приложения
  appName: import.meta.env.VITE_APP_NAME || 'TApp',

  // Telegram конфигурация
  telegramBotToken: import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '',

  // Режим отладки
  debug: import.meta.env.VITE_DEBUG === 'true',

  // Проверка, что мы в продакшене
  isProduction: import.meta.env.PROD,

  // Проверка, что мы в разработке
  isDevelopment: import.meta.env.DEV,
} as const;

/**
 * Проверка обязательных переменных окружения
 */
export function validateEnv() {
  const requiredVars = [
    'VITE_API_URL',
    // Добавьте другие обязательные переменные
  ];

  const missing = requiredVars.filter((varName) => !import.meta.env[varName]);

  if (missing.length > 0) {
    console.warn(`Отсутствуют переменные окружения: ${missing.join(', ')}`);
  }
}

// Автоматическая проверка при импорте в режиме разработки
if (env.isDevelopment) {
  validateEnv();
}
