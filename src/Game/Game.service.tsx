import { Config } from "../Config";
import { Square } from "../Core/Square";
import { Obstacle } from "./Obstacle";
import { TravelState } from "./TravelState.enum";
import DirectPathFinderService from '../algorithms/DirectPathFinder/DirectPathFinder.service';
import AstarPathFinderService from '../algorithms/AstarPathFinder/AstarPathFinder.service';
import { TravelSquare } from "../Core/TravelSquare";
import { Piece } from "./Piece";


export class GameService {
  piece: Piece;
  setPiece: React.Dispatch<React.SetStateAction<Piece>>;
  timer: NodeJS.Timer | undefined;
  squares: Square[] = [];
  pathFinderService: AstarPathFinderService = new AstarPathFinderService();

  obstacles: Obstacle[] = [
    { x: 10, y: 10 },
    { x: 11, y: 10 },
    { x: 12, y: 10 },
    { x: 13, y: 10 },
    { x: 14, y: 10 },
    { x: 15, y: 10 },
  ];

  constructor (piece: Piece, setPiece: React.Dispatch<React.SetStateAction<Piece>>) {
    this.piece = piece;
    this.setPiece = setPiece;

    for (let y = 1; y <= Config.boardSideSquaresAmount; y++) {
      for (let x = 1; x <= Config.boardSideSquaresAmount; x++) {
        this.squares.push({ 
          id: x + '_' + y,
          x,
          y,
          isObstacle: this.isObstacle({ x, y}),
        });
      }
    }
  }

  isObstacle({ x, y }: Partial<Square>): boolean {
    return this.obstacles.some(i => i.x === x && i.y === y);
  }

  setTimer(): () => void {
    this.timer = setInterval(() => { this.travel(); }, Config.appIntervalFrequencyMiliseconds);
    return () => { this.timer && clearInterval(this.timer); };
  }

  startTravel({ x, y }: Partial<Square>) {
    if (x && y && (x !== this.piece.x || y !== this.piece.y) && this.piece.state === TravelState.stay) {
      const travelPath: TravelSquare[] = this.pathFinderService.findPath({ start: this.piece, end: { x, y }, commonGrid: this.squares });
      
      if (travelPath && travelPath.length > 0) {
        const travelStartTime: number = new Date().getTime();
        const travelFinishTime: number  = travelStartTime + travelPath.length * Config.milisecondsForSquareSpeed;
  
        this.setPiece({
          ...this.piece,
          travelPath,
          state: TravelState.travel,
          travelStartTime,
          travelFinishTime,
        });
      }
    }
  }

  finishTravel(): void {
    const { x, y } = this.piece.travelPath[this.piece.travelPath.length - 1];

    this.setPiece({
      ...this.piece,
      x,
      y,
      state: TravelState.stay as TravelState,
      travelPath: [],
      travelStartTime: 0,
      travelFinishTime: 0,
    });
  }

  travel(): void {
    if (this.piece.state === TravelState.travel) {
      const currentTime = new Date().getTime();
      if (currentTime > this.piece.travelFinishTime) {
        this.finishTravel();
      } else {
        const currectTravelSquareIndex = Math.floor(
          (this.piece.travelPath.length - 1) * (currentTime - this.piece.travelStartTime) / (this.piece.travelFinishTime - this.piece.travelStartTime)
        );

        const { x, y } = this.piece.travelPath[currectTravelSquareIndex];

        this.setPiece({
          ...this.piece,
          x,
          y,
        });
      }
    }
  }
} 