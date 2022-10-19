import { astarPathFinderService } from './AstarPathFinder/AstarPathFinder.service';
import { jumpPointPathFinderService } from './JumpPointPathFinder/JumpPointPathFinder.service';
import { PathFinder } from './PathFinder.interface';

class PathFinderGeneratorService {
  pathFindersMap: Record<string, PathFinder> = {
    astar: astarPathFinderService,
    jumppoint: jumpPointPathFinderService,
  };

  getPathFinderService(algorithm: string): PathFinder {
    const pathFinderService: PathFinder = this.pathFindersMap[algorithm];

    if (!pathFinderService) {
      throw new Error(`Unknown path finder algorithm ${algorithm}`);
    }

    return pathFinderService;
  }
}

export const pathFinderGeneratorService = new PathFinderGeneratorService();
