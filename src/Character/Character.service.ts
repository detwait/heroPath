import { Config } from '../Config';
import { Item } from '../Item';
import { Character } from './Character';
import { CharacterCreateInput } from './CharacterCreateInput.interface';

class CharacterService {
  calculateMaxHp(character: Character): number {
    return character.nativeHp + character.level * 10;
  }

  getStrength(character: Character): number {
    return character.strength + (this.getLevel(character) - 1) + character.items.reduce((acc, item: Item) => acc + item.strength, 0);
  }

  getAgility(character: Character): number {
    return character.agility + (this.getLevel(character) - 1) + character.items.reduce((acc, item: Item) => acc + item.agility, 0);
  }

  getLevel(character: Character): number {
    return character.level;
  }

  create(input: CharacterCreateInput): Character {
    const character: Character = new Character(input);
    character.maxHp = this.calculateMaxHp(character);
    character.hp = character.maxHp;
    return character;
  }

  levelUp(character: Character): void {
    character.level += 1;
    character.maxHp = this.calculateMaxHp(character);
    character.hp = character.maxHp;
  }

  addExp(character: Character, exp: number): void {
    character.exp += exp;

    if (Config.levelExpMap[character.level + 1] && Config.levelExpMap[character.level + 1] <= character.exp) {
      this.levelUp(character);
    }
  }

  calculateExpFrom(character: Character): number {
    return character.level * 500;
  }

  decreaseHp(character: Character, hpDown: number): void {
    character.hp = hpDown > character.hp ? 0 : character.hp - hpDown;
  }

  increaseHp(character: Character, hpUp: number): void {
    character.hp = character.hp + hpUp > character.maxHp ? character.maxHp : character.hp + hpUp;
  }

  restoreHp(character: Character): void {
    character.hp = character.maxHp;
  }

  isDead(character: Character): boolean {
    return character.hp <= 0;
  }

  claimItem(character: Character, item: Item, items: Item[]): Item {
    character.items.push(item);

    const index: number = items.indexOf(item);
    if (index !== -1) {
      items.splice(index, 1);
    }

    return item;
  }
}

export const characterService = new CharacterService();
