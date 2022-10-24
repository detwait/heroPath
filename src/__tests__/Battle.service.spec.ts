import { Battle } from '../Battle';
import battleService from '../Battle/Battle.service';
import { Character, characterService } from '../Character';
import { CharacterCreateInput } from '../Character/CharacterCreateInput.interface';
import { Config } from '../Config';
import { Item, ItemCreateInput, itemService } from '../Item';

const { skins, avatars } = Config;

describe('Testing battle service', () => {
  let character1: Character;
  let character2: Character;
  const battle: Battle = { isActive: false } as Battle;
  let item: Item;
  const items: Item[] = [];
  let logLength: number = 0;

  //make roll hit 5 every time
  jest.spyOn(battleService, 'hitRoll').mockImplementation(() => 5);

  const itemCreateInput: ItemCreateInput = {
    itemId: 'ringAgility',
    x: 20,
    y: 20,
  };

  const characterInput1: CharacterCreateInput = {
    isPlayer: false,
    id: 'troll',
    name: 'Troll',
    skin: skins.troll,
    avatar: avatars.troll,
    level: 1,
    strength: 10,
    agility: 10,
    nativeHp: 200,
    x: 10,
    y: 10,
    items: [itemCreateInput],
  };

  const characterInput2: CharacterCreateInput = {
    isPlayer: false,
    id: 'troll2',
    name: 'Troll',
    skin: skins.troll,
    avatar: avatars.troll,
    level: 1,
    strength: 10,
    agility: 9,
    nativeHp: 10,
    x: 12,
    y: 12,
    items: [],
  };

  beforeAll(async () => {
    character1 = characterService.create(characterInput1);
    character2 = characterService.create(characterInput2);
    item = itemService.create(itemCreateInput);
    items.push(item);
    battleService.start(battle, character1, character2);
    logLength = battle.log.length;
  });

  it('check battle is running', async () => {
    expect(battleService.isBattleOver(battle)).toBeFalsy();
  });

  it('check character 1 dont miss character 2', async () => {
    expect(battleService.isAttackHit(character1, character2)).toBeTruthy();
  });

  it('check character 2 misses character 1', async () => {
    expect(battleService.isAttackHit(character2, character1)).toBeFalsy();
  });

  it('check character 1 damage', async () => {
    expect(battleService.calculateDamage(character1)).toBe(characterInput1.strength);
  });

  it('check character first round', async () => {
    const logLengthOld: number = logLength;
    battleService.proccess(battle);
    logLength = battle.log.length;
    expect(character1.hp).toBe(character1.maxHp);
    expect(character2.hp).toBe(character2.maxHp - battleService.calculateDamage(character2));
    expect(battleService.isBattleOver(battle)).toBeFalsy();
    expect(logLength).toBeGreaterThan(logLengthOld);
  });

  it('check character second round', async () => {
    const logLengthOld: number = logLength;
    battleService.proccess(battle);
    logLength = battle.log.length;
    expect(character1.hp).toBe(character1.maxHp);
    expect(character2.hp).toBe(0);
    expect(battleService.isBattleOver(battle)).toBeTruthy();
    expect(battleService.isBattleWon(battle)).toBeTruthy();
    expect(battleService.isBattleLost(battle)).toBeFalsy();
    expect(logLength).toBeGreaterThan(logLengthOld);
  });
});
