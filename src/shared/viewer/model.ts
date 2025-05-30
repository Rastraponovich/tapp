import { retrieveLaunchParams } from '@telegram-apps/sdk';

export type TelegramUser = {
  id: number;
  username?: string;
  first_name: string;
  photo_url?: string;
  last_name?: string;
  is_premium?: boolean;
  language_code?: string;
  allows_write_to_pm?: boolean;
  added_to_attachment_menu?: boolean;
};

export function useViewer(): TelegramUser | undefined {
  const launchParams = retrieveLaunchParams();

  return launchParams.tgWebAppData?.user;
}
