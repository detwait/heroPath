
export default class AstarPathFinderService {
  grid = [];

  findPath({ commonGrid, start, end }) {
    this.grid = commonGrid.map(i => ({
      ...i,
      parent: null,
      g: null,
      h: null,
      f: null,
      status: 'NOT_VISITED',
    }));

    if (this.getNode(end.x, end.y).isObstacle) {
      return [];
    }

    const startNode = this.getNode(start.x, start.y);
    startNode.g = 0;
    startNode.h = this.heuristic(startNode, end);
    startNode.f = startNode.g + startNode.h;
    startNode.status = 'OPEN';

    while (this.getOpenedList().length > 0) {
      let currentNode = this.findBestOpenedNode();
      currentNode.status = 'CLOSED';

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
        const neighbours = this.getNodeNeighbours(currentNode);

        for (let neighbour of neighbours) {
          if (neighbour.status === 'CLOSED' || neighbour.isObstacle) {
            continue;
          }

          const g = currentNode.g + 1;

          if (!neighbour.g || neighbour.g > g) {
            Object.assign(neighbour, { g });
          } 
          
          if (neighbour.status === 'NOT_VISITED') {
            const h = this.heuristic(neighbour, end);

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
  }

  getNode(x, y) {
    return this.grid.find(i => i.x === x && i.y === y);
  }

  heuristic(node1, node2) {
    return Math.abs(node2.x - node1.x) + Math.abs(node2.y - node1.y);
  }

  getOpenedList() {
    return this.grid.filter(i => i.status === 'OPEN');
  }

  findBestOpenedNode() {
    return this.getOpenedList().reduce((acc, i) => acc.f && acc.f < i.f ? acc : i);
  }

  getNodeNeighbours({ x, y }) {
    const westNode = this.getNode(x - 1, y);
    const eastNode = this.getNode(x + 1, y);
    const northNode = this.getNode(x, y - 1);
    const southNode = this.getNode(x, y + 1);
    return [westNode, eastNode, northNode, southNode].filter(i => !!i);
  }

  getClosedList() {
    return this.grid.filter(i => i.status = 'CLOSED');
  }
}