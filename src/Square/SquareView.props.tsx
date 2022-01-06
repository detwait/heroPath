import { Square } from "../Core/Square";


export type SquareViewProps = {
  params: Square;
  onClick: (args: any) => void;
  children?: React.ReactNode;
}