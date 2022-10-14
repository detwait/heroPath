import { Obstacle } from "./Obstacle";
import { ObstacleCreateInput } from "./ObstacleCreate.input";

export class ObstacleService {
	create(input: ObstacleCreateInput): Obstacle {
		return new Obstacle(input);
	}
}