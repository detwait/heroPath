import { Character } from "../Character";

export class BattleLogService {
  hitLog(log: string[], character1: Character, character2: Character, damage: number) {
    log.push(`${character1.name} hits ${character2.name} with ${damage} damage`);
  }

  missLog(log: string[], character: Character) {
    log.push(`${character.name} misses`);
  }

  deathLog(log: string[], character: Character) {
    log.push(`${character.name} is dead`);
  }

  winLog(log: string[], character: Character) {
    log.push(`${character.name} has won`);
  }

  getExp(log: string[], character: Character, exp: number) {
    log.push(`${character.name} get ${exp} exp`);
  }

  getLevel(log: string[], character: Character, level: number) {
    log.push(`${character.name} achives ${level} level!`);
  }
}