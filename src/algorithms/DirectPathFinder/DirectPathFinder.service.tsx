
import { Point } from "../../Core/Point";
import { TravelSquare } from "../../Core/TravelSquare";

export default class DirectPathFinderService {
  findPath(start: Point, destination: Point): TravelSquare[] {
    let travelPath: TravelSquare[] = [];
    let xOffset: number = destination.x - start.x > 0 ? 1 : -1;
    let yOffset: number = destination.y - start.y > 0 ? 1 : -1;  
    travelPath.push({ x: start.x, y: start.y });

    if (destination.x !== start.x) {
      for (let i = (start.x + xOffset); i !== destination.x; i += xOffset) {
        travelPath.push({ x: i, y: start.y });
      }

      travelPath.push({ x: destination.x, y: start.y });
    }

    if (destination.y !== start.y) {
      for (let j = (start.y + yOffset); j !== destination.y; j += yOffset) {
        travelPath.push({ x: destination.x, y: j });
      }

      travelPath.push({ x: destination.x, y: destination.y });
    }

    return travelPath;
  }
}