import { ItemInfoInput } from "./Item/ItemInfo.interface";

type ConfigType = {
  pathFinderAlgorithm: 'astar' | 'pointjump',
  boardSideLength: number,
  boardSideSquaresAmount: number,
  milisecondsForSquareSpeed: number,
  appIntervalFrequencyMiliseconds: number,
  levelExpMap: Record<number, number>,
  skins: Record<string, string>,
  avatars: Record<string, string>,
  items: Record<string, ItemInfoInput>,
};

const skins: Record<string, string> = {
  ninja: "ninja.png",
  rock: "rock.png",
  bush: "bush.png",
  troll: "troll.png",
  golem: "golem.png",
  dragon: "dragon.png",
  ringStrength: "ring_strength.png",
  ringAgility: "ring_agility.png",
};

const avatars: Record<string, string> = {
  ninja: "ninja.png",
  troll: "troll.png",
  golem: "golem.png",
  dragon: "dragon.png",
  ringStrength: "ring_strength.png",
  ringAgility: "ring_agility.png",
};

export const Config: ConfigType = {
  pathFinderAlgorithm: 'astar',
  boardSideLength: 800,
  boardSideSquaresAmount: 32,
  milisecondsForSquareSpeed: 40,
  appIntervalFrequencyMiliseconds: 10,
  skins,
  avatars,

  items: {
    ringStrength: {
      name: 'Ring of Strength',
      description: 'It fills with power. <br> Strength +1',
      skin: skins.ringStrength,
      avatar: avatars.ringStrength,
      strength: 1,
      agility: 0,
    },
    ringAgility: {
      name: 'Ring of Agility',
      description: 'I feel quicker with this ring. <br> Agility +1',
      skin: skins.ringAgility,
      avatar: avatars.ringAgility,
      strength: 0,
      agility: 1,
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
}