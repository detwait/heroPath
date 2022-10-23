import { Character, characterService } from '../Character';
import { CharacterCreateInput } from '../Character/CharacterCreateInput.interface';
import { Config } from '../Config';
import { Item, ItemCreateInput, itemService } from '../Item';

const { skins, avatars } = Config;

describe('Testing character service', () => {
  let character: Character;
  let item: Item;
  const items: Item[] = [];
  const characterInitialLevel: number = 1;
  const characterInitialStrength: number = 10;
  const characterInitialAgility: number = 15;
  const characterNativeHp: number = 20;

  const itemCreateInput: ItemCreateInput = {
    itemId: 'ringAgility',
    x: 20,
    y: 20,
  };

  const characterInput: CharacterCreateInput = {
    isPlayer: false,
    id: 'troll',
    name: 'Troll',
    skin: skins.troll,
    avatar: avatars.troll,
    level: characterInitialLevel,
    strength: characterInitialStrength,
    agility: characterInitialAgility,
    nativeHp: characterNativeHp,
    x: 10,
    y: 10,
    items: [],
  };

  beforeAll(async () => {
    character = characterService.create(characterInput);
    item = itemService.create(itemCreateInput);
    items.push(item);
  });

  it('check character is alive', async () => {
    expect(characterService.isDead(character)).toBeFalsy();
  });

  it('check initial strength', async () => {
    expect(characterService.getStrength(character)).toBe(10);
  });

  it('check initial agility', async () => {
    expect(characterService.getAgility(character)).toBe(15);
  });

  it('check level', async () => {
    expect(characterService.getLevel(character)).toBe(characterInput.level);
  });

  it('check max hp', async () => {
    const expectedMaxHp: number = characterInput.nativeHp + characterInput.level * 10;
    expect(character.maxHp).toBe(expectedMaxHp);
  });

  it('check decreasing 5 hp', async () => {
    const hp: number = character.hp;
    characterService.decreaseHp(character, 5);
    expect(character.hp).toBe(hp - 5);
  });

  it('check increasing 2 hp', async () => {
    const hp: number = character.hp;
    characterService.increaseHp(character, 2);
    expect(character.hp).toBe(hp + 2);
  });

  it('check increasing too many hp', async () => {
    characterService.increaseHp(character, 1000000000);
    expect(character.hp).toBe(character.maxHp);
  });

  it('check decreasing too many hp', async () => {
    characterService.decreaseHp(character, 1000000000);
    expect(character.hp).toBe(0);
  });

  it('check character is dead', async () => {
    expect(characterService.isDead(character)).toBeTruthy();
  });

  it('check character hp restoration', async () => {
    characterService.restoreHp(character);
    expect(character.hp).toBeGreaterThan(0);
    expect(character.hp).toBe(character.maxHp);
  });

  it('check character is ressurected', async () => {
    expect(characterService.isDead(character)).toBeFalsy();
  });

  it('check xp for the character', async () => {
    expect(characterService.calculateExpFrom(character)).toBe(characterInput.level * 500);
  });

  it('check adding exp', async () => {
    const characterExp: number = character.exp;
    characterService.addExp(character, 1);
    expect(character.exp).toBe(characterExp + 1);
  });

  it('check adding exp for level up', async () => {
    const characterExp: number = character.exp;
    const expForNextLevel: number = Config.levelExpMap[characterInitialLevel + 1] - characterExp;
    characterService.addExp(character, expForNextLevel);
    expect(character.level).toBe(characterInitialLevel + 1);
  });

  it('check character increased attributes after level up', async () => {
    const characterNewLevel: number = characterService.getLevel(character);
    const characterNewStrength: number = characterService.getStrength(character);
    const characterNewAgility: number = characterService.getAgility(character);
    const characterNewMaxHp: number = character.maxHp;
    expect(characterNewStrength).toBe(characterInitialStrength + 1);
    expect(characterNewAgility).toBe(characterInitialAgility + 1);
    expect(characterNewMaxHp).toBe(characterNativeHp + characterNewLevel * 10);
  });

  it('check claiming item', async () => {
    characterService.claimItem(character, item, items);
    expect(character.items.length).toBe(1);
  });

  it('check character increased attributes after level up and claiming item', async () => {
    const characterNewStrength: number = characterService.getStrength(character);
    const characterNewAgility: number = characterService.getAgility(character);
    expect(characterNewStrength).toBe(characterInitialStrength + item.strength + 1);
    expect(characterNewAgility).toBe(characterInitialAgility + item.agility + 1);
  });
});
