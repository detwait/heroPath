import CharacterCreateInput from "./Character/CharacterCreate.input"

const skins: Record<string, string> = {
  ninja: "ninja.png",
  rock: "rock.png",
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
}

export const Config: ConfigType = {
  pathFinderAlgorithm: 'astar',
  boardSideLength: 800,
  boardSideSquaresAmount: 32,
  milisecondsForSquareSpeed: 40,
  appIntervalFrequencyMiliseconds: 10,

  levelExpMap: {
		0: 500,
		1: 1000,
		2: 2000,
		3: 5000,
		4: 10000,
		5: 15000,
		6: 15000,
	},

  skins,

  characters: [
    { isPlayer: true, name: 'Ninja', skin: skins.ninja, level: 1, strength: 1, agility: 1, nativeHp: 10, x: 2, y: 2 },
  ]
}