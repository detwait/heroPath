import { Config } from '../Config';
import { Point } from '../_Core/Point';
import { Obstacle } from '../Obstacle/Obstacle';
import { GameCreateInput } from './GameCreateInput.interface';
import { Item } from '../Item';
import { Character } from '../Character';
import { gameService } from './Game.service';
import { Battle } from '../Battle';
import { GameStatus } from './GameStatus.enum';

export class Game {
  squares: Point[] = [];
  obstacles: Obstacle[] = [];
  characters: Character[] = [];
  items: Item[] = [];
  battle: Battle;
  audio: HTMLAudioElement;
  status: GameStatus = GameStatus.preview;

  constructor({ characters, items }: GameCreateInput) {
    this.audio = gameService.createAudio();
    this.squares = gameService.generateSquares(Config.boardSideSquaresAmount, Config.boardSideSquaresAmount);
    this.characters = gameService.addCharacters(characters);
    this.items = gameService.addItems(items);
    this.obstacles = gameService.generateObstacles(
      Config.boardSideSquaresAmount,
      Config.boardSideSquaresAmount,
      this.characters,
      this.items,
    );
    this.battle = { isActive: false } as Battle;
  }
}
