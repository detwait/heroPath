import { TravelSquare } from "../../Core/TravelSquare";
import { FindPathInput } from "../../Core/FindPath.input";
import { AstarNode } from "./AstarNode";
import { AstarNodeStatus } from "./AstarNodeStatus.enum";
import { Point } from "../../Core/Point";


export default class AstarPathFinderService {
  grid: AstarNode[] = [];

  findPath({ commonGrid, start, end, obstacles }: FindPathInput): TravelSquare[] {
    this.grid = commonGrid.map(i => ({
      ...i,
      parent: null,
      g: null,
      h: null,
      f: null,
      status: AstarNodeStatus.notVisided,
      isObstacle: !!obstacles.find((j: Point) => j.x === i.x && j.y === i.y),
    }));

    const startNode: AstarNode | undefined = this.getNode(start.x, start.y);
    const endNode: AstarNode | undefined = this.getNode(end.x, end.y);

    if (this.getNode(end.x, end.y)?.isObstacle || !startNode || !endNode) {
      return [];
    }

    startNode.g = 0;
    startNode.h = this.heuristic(startNode, endNode);
    startNode.f = startNode.g + startNode.h;
    startNode.status = AstarNodeStatus.open;

    while (this.getOpenedList().length > 0) {
      let currentNode: AstarNode = this.findBestOpenedNode();
      currentNode.status = AstarNodeStatus.closed;

      if (currentNode.x === end.x && currentNode.y === end.y) {
        const foundPath = [];
        let node = currentNode;

        while(node.parent) {
          foundPath.push(node);
          node = node.parent;
        }

        foundPath.push(startNode);

        return foundPath.reverse();
      } else {
        const neighbours: AstarNode[] = this.getNodeNeighbours(currentNode);

        for (let neighbour of neighbours) {
          if (neighbour.status === AstarNodeStatus.closed || neighbour.isObstacle) {
            continue;
          }

          const g = (currentNode.g || 0) + 1;

          if (!neighbour.g || neighbour.g > g) {
            Object.assign(neighbour, { g });
          } 
          
          if (neighbour.status === AstarNodeStatus.notVisided) {
            const h = this.heuristic(neighbour, endNode);

            Object.assign(neighbour, {
              parent: currentNode,
              status: 'OPEN',
              h: h,
              f: g + h,
            });
          }
        }
      }
    }

    return [];
  }

  getNode(x: number, y: number): AstarNode | undefined {
    return this.grid.find(i => i.x === x && i.y === y);
  }

  heuristic(node1: AstarNode, node2: AstarNode) {
    return Math.abs(node2.x - node1.x) + Math.abs(node2.y - node1.y);
  }

  getOpenedList() {
    return this.grid.filter(i => i.status === 'OPEN');
  }

  findBestOpenedNode(): AstarNode {
    return this.getOpenedList().reduce((acc, i) => acc.f && (!i.f || acc.f < i.f) ? acc : i);
  }

  getNodeNeighbours({ x, y }: AstarNode): AstarNode[] {
    const westNode: AstarNode | undefined = this.getNode(x - 1, y);
    const eastNode: AstarNode | undefined = this.getNode(x + 1, y);
    const northNode: AstarNode | undefined = this.getNode(x, y - 1);
    const southNode: AstarNode | undefined = this.getNode(x, y + 1);
    return [westNode, eastNode, northNode, southNode].filter(i => !!i) as AstarNode[] || [];
  }

  getClosedList() {
    return this.grid.filter(i => i.status = AstarNodeStatus.closed);
  }
}