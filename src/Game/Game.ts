import { Point } from '../_Core/Point';
import { Battle } from '../Battle';
import { Character } from '../Character';
import { Config } from '../Config';
import { Item } from '../Item';
import { Obstacle } from '../Obstacle/Obstacle';
import { gameService } from './Game.service';
import { GameCreateInput } from './GameCreateInput.interface';
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
