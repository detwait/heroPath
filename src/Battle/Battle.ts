import { Character } from "../Character";

export class Battle {
  player: Character;
  opponent: Character;
  log: string[] = ['Battle started'];

  constructor(player: Character, opponent: Character) {
    this.player = player;
    this.opponent = opponent;
  }
}