import { Config } from "../Config";
import { Point } from "../Core/Point";
import { TravelState } from "./TravelState.enum";
import { TravelSquare } from "../Core/TravelSquare";
import { isPointSame } from "../Core/Geometry.utils";
import PathFinder from "../algorithms/PathFinder.interface";
import PathFinderGeneratorService from "../algorithms/PathFinderGenerator.service";
import CharacterService from "../Character/Character.service";
import CharacterCreateInput from "../Character/CharacterCreate.input";
import Character from "../Character/Character";
import ObstacleService from "../Obstacle/Obstacle.service";
import { Obstacle } from "../Obstacle/Obstacle";
import ObstacleCreateInput from "../Obstacle/ObstacleCreate.input";

export class GameService {
  squares: Point[] = [];
  obstacles: Obstacle[] = [];
  characters: Character[] = [];
  characterService: CharacterService = new CharacterService();
  obstacleService: ObstacleService = new ObstacleService();
  pathFinderService: PathFinder = new PathFinderGeneratorService().getPathFinderService(Config.pathFinderAlgorithm);

  constructor() {
    this.squares = this.generateSquares(Config.boardSideSquaresAmount, Config.boardSideSquaresAmount);
    this.characters = this.addCharacters();
    this.obstacles = this.generateObstacles(Config.boardSideSquaresAmount, Config.boardSideSquaresAmount);
  }

  generateSquares(xAmount: number, yAmount: number): Point[] {
    let squares: Point[] = [];

    for (let y = 1; y <= yAmount; y++) {
      for (let x = 1; x <= xAmount; x++) {
        squares.push({ x,  y });
      }
    }

    return squares;
  }

  addCharacters(): Character[] {
    return Config.characters.map((input: CharacterCreateInput) => this.characterService.create(input))
  }

  getPlayer(): Character {
    const player: Character | undefined = this.characters.find(({ isPlayer }: Character) => isPlayer);

    if (!player) {
      throw new Error('No player among characters');
    }

    return player;
  }

  generateObstacles(xSquaresAmount: number, ySquaresAmount: number): Obstacle[] {
    const obstacles: Obstacle[] = [];
    const amount = Math.floor(Math.pow(xSquaresAmount, 2) / 30);

    for (let i = 0; i < amount; i++) {
      const newObstacleInput: ObstacleCreateInput = {
        x: Math.floor(Math.random() * (xSquaresAmount - 1)) + 1,
        y: Math.floor(Math.random() * (ySquaresAmount - 1)) + 1,
        skin: Config.skins.rock,
      };

      const newObstacle: Obstacle = this.obstacleService.create(newObstacleInput);

      if (this.characters.every((character: Character) => !isPointSame(character, newObstacle))) {
        obstacles.push(newObstacle);
      }
    }

    return obstacles;
  }

  isObstacle(point: Point): boolean {
    return this.obstacles.some(i => isPointSame(i, point));
  }

  startTravel(character: Character, destination: Point): Partial<Character> {
    if (destination.x && destination.y && !isPointSame(character, destination) && character.state === TravelState.stay) {
      const travelPath: TravelSquare[] = this.pathFinderService.findPath({ start: character, end: destination, commonGrid: this.squares, obstacles: this.obstacles });
      
      if (travelPath && travelPath.length > 0) {
        const travelStartTime: number = new Date().getTime();
        const travelFinishTime: number  = travelStartTime + travelPath.length * Config.milisecondsForSquareSpeed;

        return {
          ...character,
          travelPath,
          state: TravelState.travel,
          travelStartTime,
          travelFinishTime,
          destination,
        };
      }
    }

    return {};
  }

  finishTravel(character: Character): Partial<Character> {
    const { x, y } = character.travelPath[character.travelPath.length - 1];

    return {
      x,
      y,
      state: TravelState.stay,
      travelPath: [],
      travelStartTime: 0,
      travelFinishTime: 0,
    };
  }

  travel(character: Character): Partial<Character> {
    let newCharacterPoint: Point = { x: character.x, y: character.y };

    if (character.state === TravelState.travel) {
      const currentTime = new Date().getTime();
      if (currentTime > character.travelFinishTime) {
        newCharacterPoint = character.travelPath[character.travelPath.length - 1];
      } else {
        const currectTravelSquareIndex = Math.floor(
          (character.travelPath.length - 1) * (currentTime - character.travelStartTime) / (character.travelFinishTime - character.travelStartTime)
        );

        newCharacterPoint = character.travelPath[currectTravelSquareIndex];
      }
    }

    return newCharacterPoint;
  }
} 