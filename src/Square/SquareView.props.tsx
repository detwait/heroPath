import { Point } from "../Core/Point";


export type SquareViewProps = {
  square: Point;
  isObstacle: boolean;
  onClick: (args: any) => void;
  children?: React.ReactNode;
}