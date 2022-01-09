import { Point } from "./Point";
import { Square } from "./Square";
import { TravelSquare } from "./TravelSquare";

export interface FindPathInput {
  commonGrid: Square[];
  obstacles: Point[];
  start: TravelSquare;
  end: TravelSquare;
}