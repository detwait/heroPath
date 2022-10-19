import { Character } from '../Character';

export class Battle {
  isActive = false;
  player!: Character;
  opponent!: Character;
  log!: string[];
}
