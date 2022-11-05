import { GameStatus } from './Game/GameStatus.enum';
import { ItemInfoInput } from './Item/ItemInfo.interface';

type ConfigType = {
  pathFinderAlgorithm: 'astar' | 'pointjump';
  boardSideLength: number;
  boardSideSquaresAmount: number;
  milisecondsForSquareSpeed: number;
  appIntervalFrequencyMiliseconds: number;
  levelExpMap: Record<number, number>;
  skins: Record<string, string>;
  avatars: Record<string, string>;
  items: Record<string, ItemInfoInput>;
  audios: Record<string, string>;
  gameMessage: Record<GameStatus, string>;
};

const skins: Record<string, string> = {
  ninja: 'ninja.png',
  rock: 'rock.png',
  bush: 'bush.png',
  troll: 'troll.png',
  golem: 'golem.png',
  skelet: 'skelet.png',
  dragon: 'dragon.png',
  chest: 'chest.png',
  ringStrength: 'ring_strength.png',
  ringAgility: 'ring_agility.png',
};

const avatars: Record<string, string> = {
  ninja: 'ninja.png',
  troll: 'troll.png',
  golem: 'golem.png',
  skelet: 'skelet.png',
  dragon: 'dragon.png',
  gloves: 'gloves.png',
  helm: 'helm.png',
  boots: 'boots.png',
  ringStrength: 'ring_strength.png',
  ringAgility: 'ring_agility.png',
};

const audios: Record<string, string> = {
  location: 'location.mp3',
  finalBattle: 'finalbattle.mp3',
};

export const Config: ConfigType = {
  pathFinderAlgorithm: 'astar',
  boardSideLength: 800,
  boardSideSquaresAmount: 32,
  milisecondsForSquareSpeed: 40,
  appIntervalFrequencyMiliseconds: 10,
  skins,
  avatars,
  audios,

  items: {
    ringStrength: {
      name: 'Ring of Strength',
      description: 'It fills with power.',
      skin: skins.chest,
      avatar: avatars.ringStrength,
      strength: 1,
      agility: 0,
    },
    ringAgility: {
      name: 'Ring of Agility',
      description: 'I feel quicker with this ring.',
      skin: skins.chest,
      avatar: avatars.ringAgility,
      strength: 0,
      agility: 1,
    },
    gloves: {
      name: 'Gloves',
      description: 'These gloves help hit harder.',
      skin: skins.chest,
      avatar: avatars.gloves,
      strength: 2,
      agility: 0,
    },
    boots: {
      name: 'Boots',
      description: 'These boots help move faster.',
      skin: skins.chest,
      avatar: avatars.boots,
      strength: 0,
      agility: 2,
    },
    helm: {
      name: 'Helm',
      description: 'Old magic helm.',
      skin: skins.chest,
      avatar: avatars.helm,
      strength: 2,
      agility: 2,
    },
  },

  levelExpMap: {
    2: 500,
    3: 1000,
    4: 2000,
    5: 5000,
    6: 10000,
    7: 15000,
    8: 20000,
    9: 25000,
  },

  gameMessage: {
    [GameStatus.preview]: `The angry dragon is roaming the realm. <br />
                           Only you can stop the evil. <br />
                           Althouh you are no much for the dragon now. <br />
                           But a direct way may not appear as a smart way...`,
    [GameStatus.running]: ``,
    [GameStatus.lost]: `The hero fought valiantly. <br />
                          The hero fought nobly. <br />
                          The hero fought honorably. <br />
                          And the hero died.`,
    [GameStatus.won]: `That's my epic tale. <br />
                          Our champion prevailed. <br />
                          Defeated the villain. <br />
                          Now pour him some ale.`,
  },
};
