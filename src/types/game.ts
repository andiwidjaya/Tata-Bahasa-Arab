export type GameType = 'irab_battle' | 'tashrif_race' | 'word_builder';

export interface GameMetadata {
  id: GameType;
  title: string;
  description: string;
  badge: string;
  iconName: string;
  difficulty: 'Pemula' | 'Menengah' | 'Mahir';
}
