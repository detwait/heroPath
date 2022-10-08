import CharacterCreateInput from "./Character/CharacterCreate.input"

const skins: Record<string, string> = {
  ninja: "ninja.png",
  rock: "rock.png",
  troll: "troll.png",
  golem: "golem.png",
  dragon: "dragon.png",
};

const avatars: Record<string, string> = {
  ninja: "ninja.png",
};

type ConfigType = {
  pathFinderAlgorithm: 'astar' | 'pointjump',
  boardSideLength: number,
  boardSideSquaresAmount: number,
  milisecondsForSquareSpeed: number,
  appIntervalFrequencyMiliseconds: number,
  levelExpMap: Record<number, number>,
  characters: CharacterCreateInput[],
  skins: Record<string, string>,
  avatars: Record<string, string>,
}

export const Config: ConfigType = {
  pathFinderAlgorithm: 'astar',
  boardSideLength: 800,
  boardSideSquaresAmount: 32,
  milisecondsForSquareSpeed: 40,
  appIntervalFrequencyMiliseconds: 10,
  skins,
  avatars,

  levelExpMap: {
		0: 500,
		1: 1000,
		2: 2000,
		3: 5000,
		4: 10000,
		5: 15000,
		6: 15000,
	},

  characters: [
    { isPlayer: true, name: 'Ninja', skin: skins.ninja, avatar: avatars.ninja, level: 1, strength: 2, agility: 2, nativeHp: 20, x: 2, y: 2 },
    { isPlayer: false, name: 'Troll', skin: skins.troll, level: 1, strength: 1, agility: 2, nativeHp: 10, x: 10, y: 10 },
    { isPlayer: false, name: 'Golem', skin: skins.golem, level: 3, strength: 4, agility: 1, nativeHp: 20, x: 25, y: 5 },
    { isPlayer: false, name: 'Dragon', skin: skins.dragon, level: 5, strength: 5, agility: 3, nativeHp: 40, x: 14, y: 25 },
  ]
}