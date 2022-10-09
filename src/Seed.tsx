import { CharacterCreateInput } from "./Character/CharacterCreateInput.interface";

import { Config } from "./Config";
import { ItemCreateInput } from "./Item";

const { skins, avatars } = Config;

type SeedType = {
  characters: CharacterCreateInput[],
  items: ItemCreateInput[],
}

export const Seed: SeedType = {
  characters: [
    { isPlayer: true, id: 'ninja', name: 'Ninja', skin: skins.ninja, avatar: avatars.ninja, level: 1, strength: 2, agility: 2, nativeHp: 20, x: 2, y: 2 },
    { isPlayer: false, id: 'troll', name: 'Troll', skin: skins.troll, level: 1, strength: 1, agility: 2, nativeHp: 10, x: 10, y: 10 },
    { isPlayer: false, id: 'golem', name: 'Golem', skin: skins.golem, level: 3, strength: 4, agility: 1, nativeHp: 20, x: 25, y: 5 },
    { isPlayer: false, id: 'dragon', name: 'Dragon', skin: skins.dragon, level: 5, strength: 5, agility: 3, nativeHp: 40, x: 14, y: 25 },
  ],

  items: [
    {
      id: 'ringAgility',
      name: 'Ring of Agility',
      description: 'I feel quicker with this ring. <br> Agility +1',
      skin: skins.ringAgility,
      avatar: avatars.ringAgility,
      strength: 1,
      agility: 0,
      x: 20,
      y: 20, 
      ownerId: '',
    },
    {
      id: 'ringStrength',
      name: 'Ring of Strength',
      description: 'It fills me with power. <br> Strength +1',
      skin: skins.ringStrength,
      avatar: avatars.ringStrength,
      strength: 1,
      agility: 0,
      ownerId: 'ninja'
    },
  ],
}