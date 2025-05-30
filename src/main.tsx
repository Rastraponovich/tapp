import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Application } from './app/application';

// Mock the environment in case, we are outside Telegram.
import './shared/init/mock-env';
import { init } from '@telegram-apps/sdk';

const root = document.getElementById('root')!;

try {
  // Configure all application dependencies.
  init();

  createRoot(root).render(
    <StrictMode>
      <Application />
    </StrictMode>,
  );
} catch (error) {
  console.error(error);
}
