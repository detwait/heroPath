type ConfigType = {
  pathFinderAlgorithm: 'astar' | 'pointjump',
  boardSideLength: number,
  boardSideSquaresAmount: number,
  milisecondsForSquareSpeed: number,
  appIntervalFrequencyMiliseconds: number,
  levelExpMap: Record<number, number>,
  skins: Record<string, string>,
  avatars: Record<string, string>,
}

export const Config: ConfigType = {
  pathFinderAlgorithm: 'astar',
  boardSideLength: 800,
  boardSideSquaresAmount: 32,
  milisecondsForSquareSpeed: 40,
  appIntervalFrequencyMiliseconds: 10,
  skins: {
    ninja: "ninja.png",
    rock: "rock.png",
    bush: "bush.png",
    troll: "troll.png",
    golem: "golem.png",
    dragon: "dragon.png",
    ringStrength: "ring_strength.png",
    ringAgility: "ring_agility.png",
  },
  avatars: {
    ninja: "ninja.png",
    troll: "troll.png",
    ringStrength: "ring_strength.png",
    ringAgility: "ring_agility.png",
  },

  levelExpMap: {
		0: 500,
		1: 1000,
		2: 2000,
		3: 5000,
		4: 10000,
		5: 15000,
		6: 15000,
	},
}