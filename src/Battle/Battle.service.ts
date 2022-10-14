import { Character, CharacterService } from "../Character";
import { Battle } from "./Battle";
import { BattleAttackResult } from "./BattleAttackResult";
import { BattleLogService } from "./BattleLog.service";

const characterService: CharacterService = new CharacterService();
const battleLogService: BattleLogService = new BattleLogService();

export class BattleService {
  proccess(battle: Battle): Battle {
    this.proccessCharacter(battle, battle.player, battle.opponent);
    this.proccessCharacter(battle, battle.opponent, battle.player);
    return battle;
  }

  isBattleOver(battle: Battle): boolean {
    return characterService.isDead(battle.player) || characterService.isDead(battle.opponent);
  }

  isBattleWon(battle: Battle): boolean {
    return !characterService.isDead(battle.player) && characterService.isDead(battle.opponent);
  }

  isBattleLost(battle: Battle): boolean {
    return characterService.isDead(battle.player);
  }

  proccessCharacter(battle: Battle, attacker: Character, defender: Character): void {
    if (characterService.isDead(attacker)) {
      return;
    }

    const { isHit, damage } = this.attack(attacker, defender);

    if (isHit) {
      characterService.decreaseHp(defender, damage);
      battleLogService.hitLog(battle.log, attacker, defender, damage);

      if (characterService.isDead(defender)) {
        battleLogService.deathLog(battle.log, defender);
        battleLogService.winLog(battle.log, attacker);
      }
    } else {
      battleLogService.missLog(battle.log, attacker);
    }
  }
  
  attack(attacker: Character, defender: Character): BattleAttackResult {
    const isHit: boolean = this.isAttackHit(attacker, defender);

    return {
      isHit,
      damage: this.calculateDamage(attacker),
    }
  }

  isAttackHit(attacker: Character, defender: Character): boolean {
    return characterService.getAgility(attacker) + this.hitRoll() >= characterService.getAgility(defender) + this.hitRoll();
  }

  hitRoll(): number {
    return Math.floor(Math.random() * 5);
  }

  calculateDamage(attacker: Character): number {
    return characterService.getStrength(attacker);
  }
}