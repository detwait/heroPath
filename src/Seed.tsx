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
    { 
      isPlayer: true,
      id: 'ninja',
      name: 'Ninja',
      skin: skins.ninja,
      avatar: avatars.ninja,
      level: 1,
      strength: 20,
      agility: 2,
      nativeHp: 20,
      x: 2,
      y: 2,
      items: [
        {
          id: 'ringStrength',
          name: 'Ring of Strength',
          description: 'It fills with power. <br> Strength +1',
          skin: skins.ringStrength,
          avatar: avatars.ringStrength,
          strength: 1,
          agility: 0,
          x: 0,
          y: 0, 
        },
      ],
    },
    {
      isPlayer: false,
      id: 'troll',
      name: 'Troll',
      skin: skins.troll,
      avatar: avatars.troll,
      level: 1,
      strength: 1,
      agility: 2,
      nativeHp: 10,
      x: 10,
      y: 10,
      items: [],
    },
    {
      isPlayer: false,
      id: 'golem',
      name: 'Golem',
      skin: skins.golem,
      avatar: avatars.golem,
      level: 3,
      strength: 4,
      agility: 1,
      nativeHp: 20,
      x: 25,
      y: 5,
      items: [],
    },
    {
      isPlayer: false,
      id: 'dragon',
      name: 'Dragon',
      skin: skins.dragon,
      avatar: avatars.dragon,
      level: 5,
      strength: 5,
      agility: 3,
      nativeHp: 40,
      x: 14,
      y: 25,
      items: [],
    },
  ],

  items: [
    {
      id: 'ringAgility',
      name: 'Ring of Agility',
      description: 'I feel quicker with this ring. <br> Agility +1',
      skin: skins.ringAgility,
      avatar: avatars.ringAgility,
      strength: 0,
      agility: 1,
      x: 20,
      y: 20, 
    },
  ],
}