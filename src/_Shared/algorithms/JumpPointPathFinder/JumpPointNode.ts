import { JumpPointNodeStatus } from './JumpPointNodeStatus.enum';

export interface JumpPointNode {
  parent: null | JumpPointNode;
  x: number;
  y: number;
  g: number | null;
  h: number | null;
  f: number | null;
  status: JumpPointNodeStatus;
}
