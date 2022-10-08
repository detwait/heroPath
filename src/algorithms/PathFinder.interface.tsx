import { FindPathInput } from "../Core/FindPath.input";
import { TravelSquare } from "../Core/TravelSquare";

export default interface PathFinder {
  findPath({ commonGrid, start, end, obstacles }: FindPathInput): TravelSquare[];
}