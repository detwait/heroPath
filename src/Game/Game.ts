import { Config } from "../Config";
import { Point } from "../_Core/Point";
import { Obstacle } from "../Obstacle/Obstacle";
import { GameCreateInput } from "./GameCreateInput.interface";
import { Item } from "../Item";
import { Character } from "../Character";
import { GameService } from "./Game.service";

const gameService: GameService = new GameService();

export class Game {
  squares: Point[] = [];
  obstacles: Obstacle[] = [];
  characters: Character[] = [];
  items: Item[] = [];
  audio: HTMLAudioElement;

  constructor({ characters, items }: GameCreateInput) {
    this.audio = gameService.createAudio();
    this.squares = gameService.generateSquares(Config.boardSideSquaresAmount, Config.boardSideSquaresAmount);
    this.characters = gameService.addCharacters(characters);
    this.items = gameService.addItems(items);
    this.obstacles = gameService.generateObstacles(Config.boardSideSquaresAmount, Config.boardSideSquaresAmount, this.characters, this.items);
  }
} 