import { Point } from "../_Core/Point";

export type SquareViewProps = {
  square: Point;
  isObstacle: boolean;
  onClick: (args: any) => void;
  children?: React.ReactNode;
}