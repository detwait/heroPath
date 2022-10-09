import { Config } from '../Config';
import { Character } from './Character';
import { CharacterCreateInput } from "./CharacterCreateInput.interface";

export class CharacterService {
	calculateMaxHp(character: Character): number {
		return character.nativeHp + character.level * 10;
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
}