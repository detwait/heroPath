import { Obstacle } from "./Obstacle";
import { ObstacleCreateInput } from "./ObstacleCreate.input";

export class ObstacleService {
	create(input: ObstacleCreateInput): Obstacle {
		const obstacle: Obstacle = new Obstacle(input);
		return obstacle;
	}
}