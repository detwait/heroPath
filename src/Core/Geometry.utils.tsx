
import { Point } from "./Point";

export function isPointSame(point1: Point, point2: Point): boolean {
  return point1.x === point2.x && point1.y === point2.y;
}

export function pathFromParents(node: Point): Point[] {
  const path: Point[] = [node];

  while (node.parent) {
    node = node.parent;
    path.push(node);
  }

  return path.reverse();
}

function interpolatePath(point1: Point, point2: Point) {
  let point1x: number = point1.x;
  let point1y: number = point1.y;
  let point2x: number = point2.x;
  let point2y: number = point2.y;
  const line: Point[] = [];
  const dx: number = Math.abs(point2x - point1x);
  const dy = Math.abs(point2y - point1y);
  const sx: number = (point1x < point2x) ? 1 : -1;
  const sy: number = (point1y < point2y) ? 1 : -1;
  let err: number = dx - dy;

  while (true) {
    line.push({ x: point1x, y: point1y, parent: null });

    if (point1x === point2x && point1y === point2y) {
        break;
    }
    
    const e2: number = 2 * err;

    if (e2 > -dy) {
        err = err - dy;
        point1x += sx;
    }
    if (e2 < dx) {
        err = err + dx;
        point1y += sy;
    }
  }

  return line;
}

export function expandPath(path: Point[]): Point[] {
  const expanded: Point[] = [];
  const len: number = path.length;
  let interpolated : Point[];
  let interpolatedLen: number;

  if (len < 2) {
      return expanded;
  }

  for (let i = 0; i < len - 1; ++i) {
      interpolated = interpolatePath(path[i], path[i + 1]);
      interpolatedLen = interpolated.length;

      for (let j = 0; j < interpolatedLen - 1; ++j) {
        expanded.push(interpolated[j]);
      }
  }

  expanded.push(path[len - 1]);
  return expanded;
}

export function heuristic(node1: Point, node2: Point): number {
  return Math.abs(node2.x - node1.x) + Math.abs(node2.y - node1.y);
}

export function octile(node1: Point, node2: Point) {
  const dx: number = node2.x - node1.x;
  const dy: number = node2.y - node1.y;
  const F = Math.SQRT2 - 1;
  return (dx < dy) ? F * dx + dy : F * dy + dx;
}

export function manhattan(node1: Point, node2: Point) {
  const dx: number = Math.abs(node2.x - node1.x);
  const dy: number = Math.abs(node2.y - node1.y);
  return dx + dy;
}