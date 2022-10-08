import { TravelSquare } from "../../Core/TravelSquare";
import { FindPathInput } from "../../Core/FindPath.input";
import { Point } from "../../Core/Point";
import { expandPath, heuristic, manhattan, pathFromParents } from "../../Core/Geometry.utils";
import { JumpPointNode } from "./JumpPointNode";
import { JumpPointNodeStatus } from "./JumpPointNodeStatus.enum";
import PathFinder from "../PathFinder.interface";


export default class JumpPointPathFinderService implements PathFinder {
  grid: JumpPointNode[] = [];
  obstacles: Point[] = [];
  startNode: JumpPointNode | undefined;
  endNode: JumpPointNode | undefined;
  
  isNodeWalkable(point: Point | undefined): boolean {
    if (!point) {
      return false;
    }

    return !this.obstacles.some((i: Point) => i.x === point.x && i.y === point.y);
  }

  findPath({ commonGrid, start, end, obstacles }: FindPathInput): TravelSquare[] {
    this.obstacles = obstacles;

    this.grid = commonGrid.map(i => ({
      ...i,
      parent: null,
      g: null,
      h: null,
      f: null,
      status: JumpPointNodeStatus.notVisided,
    }));

    this.startNode = this.getNode(start.x, start.y);
    this.endNode = this.getNode(end.x, end.y);


    if (!this.isNodeWalkable(end) || !this.startNode || !this.endNode) {
      return [];
    }

    this.startNode.g = 0;
    this.startNode.h = heuristic(this.startNode, this.endNode);
    this.startNode.f = this.startNode.g + this.startNode.h;
    this.startNode.status = JumpPointNodeStatus.open;

    while (this.getOpenedList().length > 0) {
      let currentNode: JumpPointNode = this.findBestOpenedNode();
      currentNode.status = JumpPointNodeStatus.closed;

      if (currentNode.x === end.x && currentNode.y === end.y) {
        return expandPath(pathFromParents(currentNode));
      } else {
        this.openNewNodes(currentNode);
      }
    }

    return [];
  }

  openNewNodes(currentNode: JumpPointNode): void {
    if(!this.endNode) {
      return;
    }

    const { x, y } = currentNode;
    const neighbours: JumpPointNode[] = this.findNeighbours(currentNode);

    for (let neighbour of neighbours) {
      const jumpPoint: JumpPointNode | null = this.jump(neighbour, x ,y);

      if (jumpPoint) {
        if (jumpPoint.status === JumpPointNodeStatus.closed) {
          continue;
        }

        const d: number = manhattan(currentNode, jumpPoint);
        const ng: number = currentNode.g || 0 + d; 

        if (!jumpPoint.g || ng < (jumpPoint.g || 0)) {
          jumpPoint.g = ng;
        }

        if (jumpPoint.status === JumpPointNodeStatus.notVisided) {
          jumpPoint.h = jumpPoint.h || heuristic(jumpPoint, this.endNode);
          jumpPoint.f = (jumpPoint.g || 0) + (jumpPoint.h || 0);
          jumpPoint.parent = currentNode;
          jumpPoint.status = JumpPointNodeStatus.open;
        }
      }
    }
  }

  getNode(x: number, y: number): JumpPointNode | undefined {
    return this.grid.find(i => i.x === x && i.y === y);
  }

  getOpenedList() {
    return this.grid.filter(i => i.status === JumpPointNodeStatus.open);
  }

  findBestOpenedNode(): JumpPointNode {
    return this.getOpenedList().reduce((acc, i) => acc.f && (!i.f || acc.f < i.f) ? acc : i);
  }

  addToIfExistAndWalkable(list: JumpPointNode[], x: number, y: number) {
    const node: JumpPointNode | undefined = this.getNode(x, y);
    if (node && this.isNodeWalkable(node)) {
      list.push(node);
    }
  }

  findNeighbours(node: JumpPointNode): JumpPointNode[] {
    const { x, y, parent } = node;

    if (parent) {
      const neighbors: JumpPointNode[] = [];
      const px: number = parent.x;
      const py: number = parent.y;

      const dx: number = (x - px) / Math.max(Math.abs(x - px), 1);
      const dy: number = (y - py) / Math.max(Math.abs(y - py), 1);

      if (dx !== 0) {
        for (let [i, j] of [ [x, y - 1], [x, y + 1], [x + dx, y] ]) {
          this.addToIfExistAndWalkable(neighbors, i, j);
        }
      } else if (dy !== 0) {
        for (let [i, j] of [ [x - 1, y], [x + 1, y], [x, y + dy] ]) {
          this.addToIfExistAndWalkable(neighbors, i, j);
        }
      }

      return neighbors;
    }
    else {
      return this.getGridNeighbors(node);
    }
  }

  getGridNeighbors({ x, y }: JumpPointNode): JumpPointNode[] {
    const westNode: JumpPointNode | undefined = this.getNode(x - 1, y);
    const eastNode: JumpPointNode | undefined = this.getNode(x + 1, y);
    const northNode: JumpPointNode | undefined = this.getNode(x, y - 1);
    const southNode: JumpPointNode | undefined = this.getNode(x, y + 1);
    return [westNode, eastNode, northNode, southNode].filter(i => !!i) as JumpPointNode[] || [];
  }

  getClosedList() {
    return this.grid.filter(i => i.status = JumpPointNodeStatus.closed);
  }

  jump(point: JumpPointNode | undefined, px: number, py: number): JumpPointNode | null {
    if (!point) {
      return null;
    }
    
    const { x, y } = point;
    const dx: number = x - px;
    const dy: number = y - py;

    if (!this.isNodeWalkable(this.getNode(x, y))) {
      return null;
    }

    if (this.getNode(x, y) === this.endNode) {
      return this.getNode(x, y) || null;
    }

    if (dx !== 0) {
      if (
          (this.isNodeWalkable(this.getNode(x, y - 1)) && !this.isNodeWalkable(this.getNode(x - dx, y - 1))) ||
          (this.isNodeWalkable(this.getNode(x, y + 1)) && !this.isNodeWalkable(this.getNode(x - dx, y + 1)))
         ) {
        return this.getNode(x, y) || null;
      }
    } else if (dy !== 0) {
      if (
          (this.isNodeWalkable(this.getNode(x - 1, y)) && !this.isNodeWalkable(this.getNode(x - 1, y - dy))) ||
          (this.isNodeWalkable(this.getNode(x + 1, y)) && !this.isNodeWalkable(this.getNode(x + 1, y - dy)))
         ) {
        return this.getNode(x, y) || null;
      }

      if (this.jump(this.getNode(x + 1, y), x, y) || this.jump(this.getNode(x - 1, y), x, y)) {
        return this.getNode(x, y) || null;
      }
    } else {
      throw new Error("Only horizontal and vertical movements are allowed");
    }

    return this.jump(this.getNode(x + dx, y + dy), x, y);
  }
}