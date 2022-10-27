import { CharacterCreateInput } from './Character/CharacterCreateInput.interface';
import { Config } from './Config';
import { ItemCreateInput } from './Item';

const { skins, avatars } = Config;

type SeedType = {
  characters: CharacterCreateInput[];
  items: ItemCreateInput[];
};

const characters: CharacterCreateInput[] = [
  {
    isPlayer: true,
    id: 'ninja',
    name: 'Ninja',
    skin: skins.ninja,
    avatar: avatars.ninja,
    level: 1,
    strength: 2,
    agility: 2,
    nativeHp: 20,
    x: 2,
    y: 2,
    items: [
      {
        itemId: 'ringStrength',
        x: 0,
        y: 0,
      },
    ],
  },
  {
    isPlayer: false,
    id: 'skelet',
    name: 'Skelet',
    skin: skins.skelet,
    avatar: avatars.skelet,
    level: 1,
    strength: 1,
    agility: 2,
    nativeHp: 10,
    x: 10,
    y: 10,
    items: [
      {
        itemId: 'boots',
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
    level: 2,
    strength: 1,
    agility: 2,
    nativeHp: 10,
    x: 15,
    y: 18,
    items: [
      {
        itemId: 'gloves',
        x: 0,
        y: 0,
      },
    ],
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
    items: [
      {
        itemId: 'helm',
        x: 0,
        y: 0,
      },
    ],
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
    isMainBoss: true,
  },
];

export const Seed: SeedType = {
  characters,
  items: [
    {
      itemId: 'ringAgility',
      x: 20,
      y: 20,
    },
  ],
};
