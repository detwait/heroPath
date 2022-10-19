import { Point } from '../../_Core/Point';

export type SquareViewProps = {
  entity: Point;
  isObstacle: boolean;
  onClick: (args: unknown) => void;
  children?: React.ReactNode;
};
