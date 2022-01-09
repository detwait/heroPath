import { Point } from "../Core/Point";
import { TravelSquare } from "../Core/TravelSquare";
import { TravelState } from "./TravelState.enum";

export interface Player {
  x: number;
  y: number;
  state: TravelState;
  travelPath: TravelSquare[];
  travelStartTime: number;
  travelFinishTime: number;
  destination: Point;
}