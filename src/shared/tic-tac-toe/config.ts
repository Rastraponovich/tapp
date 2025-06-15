export const GameStatusMessages = {
  thinking: 'ИИ думает...',
  win: 'Вы победили! 🎉',
  lose: 'ИИ победил! 🤖',
  draw: 'Ничья! 🤝',
  yourTurn: 'Ваш ход',
  aiTurn: 'Ход ИИ',
} as const;

export type GameStatusMessages = keyof typeof GameStatusMessages;
