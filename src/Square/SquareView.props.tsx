import { Square } from "../Core/Square";


export type SquareViewProps = {
  square: Square;
  isObstacle: boolean;
  onClick: (args: any) => void;
  children?: React.ReactNode;
}