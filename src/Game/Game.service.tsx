import { Config } from "../Config";
import { Point } from "../_Core/Point";
import { TravelState } from "./TravelState.enum";
import { TravelSquare } from "../_Core/TravelSquare";
import { isPointSame } from "../_Core/Geometry.utils";
import { Obstacle } from "../Obstacle/Obstacle";
import { CharacterCreateInput } from "../Character/CharacterCreateInput.interface";
import { GameCreateInput } from "./GameCreateInput.interface";
import { ObstacleService } from "../Obstacle";
import { Item, ItemCreateInput, ItemService } from "../Item";
import { Character, CharacterService } from "../Character";
import { PathFinder, PathFinderGeneratorService } from "../_Shared/algorithms";
import { ObstacleCreateInput } from "../Obstacle/ObstacleCreate.input";

const characterService: CharacterService = new CharacterService();
const itemService: ItemService = new ItemService();
const obstacleService: ObstacleService = new ObstacleService();
const pathFinderService: PathFinder = new PathFinderGeneratorService().getPathFinderService(Config.pathFinderAlgorithm);

export class GameService {
  squares: Point[] = [];
  obstacles: Obstacle[] = [];
  characters: Character[] = [];
  items: Item[] = [];

  constructor({ characters, items }: GameCreateInput) {
    this.squares = this.generateSquares(Config.boardSideSquaresAmount, Config.boardSideSquaresAmount);
    this.characters = this.addCharacters(characters);
    this.items = this.addItems(items);
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

  addCharacters(characters: CharacterCreateInput[]): Character[] {
    return characters.map((input: CharacterCreateInput) => characterService.create(input))
  }

  addItems(items: ItemCreateInput[]): Item[] {
    return items.map((input: ItemCreateInput) => itemService.create(input))
  }

  getPlayer(characters: Character[]): Character {
    const player: Character | undefined = characters.find(({ isPlayer }: Character) => isPlayer);

    if (!player) {
      throw new Error('No player among characters');
    }

    return player;
  }

  generateObstacles(xSquaresAmount: number, ySquaresAmount: number): Obstacle[] {
    const obstacles: Obstacle[] = [];
    const amount = Math.floor(Math.pow(xSquaresAmount, 2) / 30);

    const obstacleSkins: string[] = [Config.skins.rock, Config.skins.bush];

    for (let i = 0; i < amount; i++) {
      const newObstacleInput: ObstacleCreateInput = {
        x: Math.floor(Math.random() * (xSquaresAmount - 1)) + 1,
        y: Math.floor(Math.random() * (ySquaresAmount - 1)) + 1,
        skin: obstacleSkins[Math.floor(Math.random() * obstacleSkins.length)],
      };

      const newObstacle: Obstacle = obstacleService.create(newObstacleInput);

      if (this.characters.every((character: Character) => !isPointSame(character, newObstacle)) 
      && obstacles.every((obstacle: Obstacle) => !isPointSame(obstacle, newObstacle))) {
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
      const travelPath: TravelSquare[] = pathFinderService.findPath({ start: character, end: destination, commonGrid: this.squares, obstacles: this.obstacles });
      
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

  isCharacterOnItem(characterLocation: Point): Item | undefined {
    return this.items.find(({ x, y }: Item) => characterLocation.x === x && characterLocation.y === y);
  }

  characterClaimItem(character: Character, item: Item, items: Item[]): Item {
    character.items.push(item);

    const index: number = items.indexOf(item);
    if(index !== -1) {
      items.splice(index, 1);
    }

    return item;
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