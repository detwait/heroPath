import { Obstacle } from './Obstacle';
import { ObstacleCreateInput } from './ObstacleCreate.input';

class ObstacleService {
  create(input: ObstacleCreateInput): Obstacle {
    return new Obstacle(input);
  }
}

export const obstacleService = new ObstacleService();
