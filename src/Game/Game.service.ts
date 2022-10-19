import { Config } from "../Config";
import { Point } from "../_Core/Point";
import { TravelState } from "./TravelState.enum";
import { TravelSquare } from "../_Core/TravelSquare";
import { isPointSame } from "../_Core/Geometry.utils";
import { Obstacle } from "../Obstacle/Obstacle";
import { CharacterCreateInput } from "../Character/CharacterCreateInput.interface";
import { ObstacleService } from "../Obstacle";
import { Item, ItemCreateInput, ItemService } from "../Item";
import { Character, CharacterService } from "../Character";
import { PathFinder, PathFinderGeneratorService } from "../_Shared/algorithms";
import { ObstacleCreateInput } from "../Obstacle/ObstacleCreate.input";
import { AudioService } from "../_Shared/audio";
import { Battle, BattleService } from "../Battle";

const audioService: AudioService = new AudioService();
const characterService: CharacterService = new CharacterService();
const itemService: ItemService = new ItemService();
const obstacleService: ObstacleService = new ObstacleService();
const battleService: BattleService = new BattleService();
const pathFinderService: PathFinder = new PathFinderGeneratorService().getPathFinderService(Config.pathFinderAlgorithm);

export class GameService {
  isGameWon(characters: Character[]): boolean {
    const mainBoss: Character = this.getMainBoss(characters);
    return characterService.isDead(mainBoss);
  }

  isGamLost(characters: Character[]): boolean {
    const player: Character = this.getPlayer(characters);
    return characterService.isDead(player);
  }

  createAudio(): HTMLAudioElement {
    return audioService.create(Config.audios.location);
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

  getMainBoss(characters: Character[]): Character {
    const mainBoss: Character | undefined = characters.find(({ isMainBoss }: Character) => isMainBoss);

    if (!mainBoss) {
      throw new Error('No main boss among characters');
    }

    return mainBoss;
  }

  generateObstacles(xSquaresAmount: number, ySquaresAmount: number, characters: Character[], items: Item[]): Obstacle[] {
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

      if (characters.every((character: Character) => !isPointSame(character, newObstacle)) 
        && items.every((item: Item) => !isPointSame(item, newObstacle))
        && obstacles.every((obstacle: Obstacle) => !isPointSame(obstacle, newObstacle))) {
          obstacles.push(newObstacle);
      }
    }

    return obstacles;
  }

  isObstacle(point: Point, obstacles: Obstacle[]): boolean {
    return obstacles.some(i => isPointSame(i, point));
  }

  startTravel(character: Character, destination: Point, squares: Point[], obstacles: Obstacle[]): void {
    if (destination.x && destination.y && !isPointSame(character, destination) && character.state === TravelState.stay) {
      const travelPath: TravelSquare[] = pathFinderService.findPath({ start: character, end: destination, commonGrid: squares, obstacles });
      
      if (travelPath && travelPath.length > 0) {
        const travelStartTime: number = new Date().getTime();
        const travelFinishTime: number  = travelStartTime + travelPath.length * Config.milisecondsForSquareSpeed;

        Object.assign(character, {
          travelPath,
          state: TravelState.travel,
          travelStartTime,
          travelFinishTime,
          destination,
        });
      }
    }
  }

  finishTravel(character: Character): Partial<void> {
    const { x, y } = character.travelPath[character.travelPath.length - 1];

    Object.assign(character, {
      x,
      y,
      state: TravelState.stay,
      travelPath: [],
      travelStartTime: 0,
      travelFinishTime: 0,
    });
  }

  isPlayerOnEnemy(player: Character, characters: Character[]): Character | undefined {
    return characters
    .find((character: Character) => player.x === character.x 
      && player.y === character.y
      && !characterService.isDead(character)
      && player.id !== character.id );
  }

  isPlayerOnItem(characterLocation: Point, items: Item[]): Item | undefined {
    return items.find(({ x, y }: Item) => characterLocation.x === x && characterLocation.y === y);
  }

  travel(character: Character, characters: Character[], items: Item[], battle: Battle): boolean {
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

      const { x, y } = newCharacterPoint;

      if (!x || !y) {
        return false;
      }
      
      Object.assign(character, { x, y })
      const itemFound: Item | undefined = this.isPlayerOnItem({ x, y }, items);
      const enemyFound: Character | undefined = this.isPlayerOnEnemy(character, characters);
  
      if (itemFound) {
        characterService.claimItem(character, itemFound, items);
      }
  
      if (enemyFound) {
        battleService.start(battle, character, enemyFound);
      }
  
      if (isPointSame(character.destination, { x, y })) {
        if (character.state === TravelState.travel) {
          this.finishTravel(character);
        }
      }

      return true;
    }

    return false;
  }
} 