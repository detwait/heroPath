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
    golem: "golem.png",
    dragon: "dragon.png",
    ringStrength: "ring_strength.png",
    ringAgility: "ring_agility.png",
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