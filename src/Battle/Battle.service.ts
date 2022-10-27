import { Character, characterService } from '../Character';
import { Battle } from './Battle';
import { BattleAttackResult } from './BattleAttackResult';
import { battleLogService } from './BattleLog.service';

class BattleService {
  start(battle: Battle, player: Character, opponent: Character): Battle {
    if (!battle.isActive) {
      Object.assign(battle, {
        isActive: true,
        player,
        opponent,
        log: ['Battle started'],
      });
    }

    return battle;
  }

  close(battle: Battle): Battle {
    battle.isActive = false;
    return battle;
  }

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
    if (characterService.isDead(attacker) || characterService.isDead(defender)) {
      return;
    }

    const { isHit, damage } = this.attack(attacker, defender);

    if (isHit) {
      characterService.decreaseHp(defender, damage);
      battleLogService.hit(battle.log, attacker, defender, damage);

      if (characterService.isDead(defender)) {
        battleLogService.death(battle.log, defender);
        battleLogService.win(battle.log, attacker);

        for (const item of defender.items) {
          characterService.claimItem(attacker, item, []);
          battleLogService.claimItem(battle.log, attacker, item);
        }

        const attackerOldLevel: number = characterService.getLevel(attacker);
        const battleExp: number = characterService.calculateExpFrom(defender);
        characterService.addExp(attacker, battleExp);
        const attackerNewLevel: number = characterService.getLevel(attacker);
        battleLogService.getExp(battle.log, attacker, battleExp);

        if (attackerNewLevel > attackerOldLevel) {
          battleLogService.getLevel(battle.log, attacker, attackerNewLevel);
        }
      }
    } else {
      battleLogService.miss(battle.log, attacker);
    }
  }

  attack(attacker: Character, defender: Character): BattleAttackResult {
    const isHit: boolean = this.isAttackHit(attacker, defender);

    return {
      isHit,
      damage: this.calculateDamage(attacker),
    };
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

export const battleService = new BattleService();
