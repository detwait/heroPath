import { Config } from "../Config";
import { Square } from "../Core/Square";
import { Point } from "../Core/Point";
import { TravelState } from "./TravelState.enum";
import DirectPathFinderService from '../algorithms/DirectPathFinder/DirectPathFinder.service';
import AstarPathFinderService from '../algorithms/AstarPathFinder/AstarPathFinder.service';
import { TravelSquare } from "../Core/TravelSquare";
import { Piece } from "./Piece";


export class GameService {
  timer: NodeJS.Timer | undefined;
  squares: Square[] = [];
  pathFinderService: AstarPathFinderService = new AstarPathFinderService();
  obstacles: Point[] = [];
  pieceStartPoint: Point = { x: 2, y: 2 };

  constructor() {
    for (let y = 1; y <= Config.boardSideSquaresAmount; y++) {
      for (let x = 1; x <= Config.boardSideSquaresAmount; x++) {
        this.squares.push({ 
          id: x + '_' + y,
          x,
          y,
        });
      }
    }

    this.generateObstacles();
  }

  generateObstacles(): void {
    const amount = Math.floor(Math.pow(Config.boardSideSquaresAmount, 2) / 30);

    for (let i = 0; i < amount; i++) {
      let newObstacle: Point = {
        x: Math.floor(Math.random() * Config.boardSideSquaresAmount),
        y: Math.floor(Math.random() * Config.boardSideSquaresAmount),
      };

      if ((newObstacle.x !== this.pieceStartPoint.x && newObstacle.y !== this.pieceStartPoint.y)) {
        this.obstacles.push(newObstacle);
      }
    }
  }

  isObstacle({ x, y }: Partial<Square>): boolean {
    return this.obstacles.some(i => i.x === x && i.y === y);
  }

  setTimer(piece: Piece, setPiece: React.Dispatch<React.SetStateAction<Piece>>): () => void {
    this.timer = setInterval(() => { this.travel(piece, setPiece); }, Config.appIntervalFrequencyMiliseconds);
    return () => { this.timer && clearInterval(this.timer); };
  }

  startTravel(piece: Piece, setPiece: React.Dispatch<React.SetStateAction<Piece>>, { x, y }: Partial<Square>) {
    if (x && y && (x !== piece.x || y !== piece.y) && piece.state === TravelState.stay) {
      const travelPath: TravelSquare[] = this.pathFinderService.findPath({ start: piece, end: { x, y }, commonGrid: this.squares, obstacles: this.obstacles });
      
      if (travelPath && travelPath.length > 0) {
        const travelStartTime: number = new Date().getTime();
        const travelFinishTime: number  = travelStartTime + travelPath.length * Config.milisecondsForSquareSpeed;
  
        setPiece({
          ...piece,
          travelPath,
          state: TravelState.travel,
          travelStartTime,
          travelFinishTime,
        });
      }
    }
  }

  finishTravel(piece: Piece, setPiece: React.Dispatch<React.SetStateAction<Piece>>): void {
    const { x, y } = piece.travelPath[piece.travelPath.length - 1];

    setPiece({
      ...piece,
      x,
      y,
      state: TravelState.stay,
      travelPath: [],
      travelStartTime: 0,
      travelFinishTime: 0,
    });
  }

  travel(piece: Piece, setPiece: React.Dispatch<React.SetStateAction<Piece>>): void {
    if (piece.state === TravelState.travel) {
      const currentTime = new Date().getTime();
      if (currentTime > piece.travelFinishTime) {
        this.finishTravel(piece, setPiece);
      } else {
        const currectTravelSquareIndex = Math.floor(
          (piece.travelPath.length - 1) * (currentTime - piece.travelStartTime) / (piece.travelFinishTime - piece.travelStartTime)
        );

        const { x, y } = piece.travelPath[currectTravelSquareIndex];

        if (x !== piece.x || y !== piece.y) {
          setPiece({
            ...piece,
            x,
            y,
          });
        }
      }
    }
  }
} 