import { Point } from "../../_Core/Point";

export type SquareViewProps = {
  entity: Point;
  isObstacle: boolean;
  onClick: (args: any) => void;
  children?: React.ReactNode;
}