import AstarPathFinderService from "./AstarPathFinder/AstarPathFinder.service";
import JumpPointPathFinderService from "./JumpPointPathFinder/JumpPointPathFinder.service";
import PathFinder from "./PathFinder.interface";

export default class PathFinderGeneratorService {
  pathFindersMap: Record<string, PathFinder> = {
    'astar': new AstarPathFinderService(),
    'jumppoint': new JumpPointPathFinderService(),
  };
  

  getPathFinderService(algorithm: string): PathFinder {
    const pathFinderService: PathFinder = this.pathFindersMap[algorithm];

    if (!pathFinderService) {
        throw new Error(`Unknown path finder algorithm ${algorithm}`);
    }

    return pathFinderService;
  }
}
