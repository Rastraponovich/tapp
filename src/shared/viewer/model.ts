import { retrieveLaunchParams, type User } from '@telegram-apps/sdk';

export type TelegramUser = User;

export function useViewer(): TelegramUser | undefined {
  const launchParams = retrieveLaunchParams();

  return launchParams.tgWebAppData?.user;
}
