import { Square } from "./Square";
import { TravelSquare } from "./TravelSquare";

export interface FindPathInput {
  commonGrid: Square[];
  start: TravelSquare;
  end: TravelSquare;
}