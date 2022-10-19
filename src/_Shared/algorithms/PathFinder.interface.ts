import { FindPathInput } from "../../_Core/FindPath.input";
import { TravelSquare } from "../../_Core/TravelSquare";

export interface PathFinder {
  findPath({ commonGrid, start, end, obstacles }: FindPathInput): TravelSquare[];
}