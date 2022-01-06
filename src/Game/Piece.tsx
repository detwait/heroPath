import { TravelSquare } from "../Core/TravelSquare";
import { TravelState } from "./TravelState.enum";

export interface Piece {
  x: number;
  y: number;
  state: TravelState;
  travelPath: TravelSquare[];
  travelStartTime: number;
  travelFinishTime: number;
}