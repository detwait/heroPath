import { Config } from "../Config";
import { Point } from "../Core/Point";
import { TravelState } from "./TravelState.enum";
import DirectPathFinderService from '../algorithms/DirectPathFinder/DirectPathFinder.service';
import AstarPathFinderService from '../algorithms/AstarPathFinder/AstarPathFinder.service';
import { TravelSquare } from "../Core/TravelSquare";
import { Player } from "./Player";
import { isPointSame } from "../Core/Geometry.utils";


export class GameService {
  timer: NodeJS.Timer | undefined;
  pathFinderService: AstarPathFinderService = new AstarPathFinderService();
  PlayerStartPoint: Point = { x: 2, y: 2 };

  generatePlayer(): Player {
    return {
      x: 2,
      y: 2,
      state: TravelState.stay,
      travelPath: [],
      travelStartTime: 0,
      travelFinishTime: 0,
      destination: {x: 2, y: 2}
    };
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

  generateObstacles(player: Player, xSquaresAmount: number, ySquaresAmount: number): Point[] {
    const obstacles: Point[] = [];
    const amount = Math.floor(Math.pow(xSquaresAmount, 2) / 30);

    for (let i = 0; i < amount; i++) {
      const newObstacle: Point = {
        x: Math.floor(Math.random() * xSquaresAmount),
        y: Math.floor(Math.random() * ySquaresAmount),
      };

      if (!isPointSame(player, newObstacle)) {
        obstacles.push(newObstacle);
      }
    }

    return obstacles;
  }

  isObstacle(obstacles: Point[], point: Point): boolean {
    return obstacles.some(i => isPointSame(i, point));
  }

  startTravel(player: Player, squares: Point[], obstacles: Point[], destination: Point): Partial<Player> {
    if (destination.x && destination.y && !isPointSame(player, destination) && player.state === TravelState.stay) {
      const travelPath: TravelSquare[] = this.pathFinderService.findPath({ start: player, end: destination, commonGrid: squares, obstacles });
      
      if (travelPath && travelPath.length > 0) {
        const travelStartTime: number = new Date().getTime();
        const travelFinishTime: number  = travelStartTime + travelPath.length * Config.milisecondsForSquareSpeed;

        return {
          ...player,
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

  finishTravel(player: Player): Partial<Player> {
    const { x, y } = player.travelPath[player.travelPath.length - 1];

    return {
      x,
      y,
      state: TravelState.stay,
      travelPath: [],
      travelStartTime: 0,
      travelFinishTime: 0,
    };
  }

  travel(player: Player): Partial<Player> {
    let newPlayerPoint: Point = { x: player.x, y: player.y };

    if (player.state === TravelState.travel) {
      const currentTime = new Date().getTime();
      if (currentTime > player.travelFinishTime) {
        newPlayerPoint = player.travelPath[player.travelPath.length - 1];
      } else {
        const currectTravelSquareIndex = Math.floor(
          (player.travelPath.length - 1) * (currentTime - player.travelStartTime) / (player.travelFinishTime - player.travelStartTime)
        );

        newPlayerPoint = player.travelPath[currectTravelSquareIndex];
      }
    }

    return newPlayerPoint;
  }
} 