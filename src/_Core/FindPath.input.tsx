import { Point } from './Point';
import { TravelSquare } from './TravelSquare';

export interface FindPathInput {
  commonGrid: Point[];
  obstacles: Point[];
  start: TravelSquare;
  end: TravelSquare;
}
