import { Character } from "../Character";

export class Battle {
  isActive: boolean = false;
  player!: Character;
  opponent!: Character;
  log!: string[];
}