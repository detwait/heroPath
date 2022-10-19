import { AstarNodeStatus } from './AstarNodeStatus.enum';

export interface AstarNode {
  parent: null | AstarNode;
  x: number;
  y: number;
  g: number | null;
  h: number | null;
  f: number | null;
  isObstacle: boolean;
  status: AstarNodeStatus;
}
