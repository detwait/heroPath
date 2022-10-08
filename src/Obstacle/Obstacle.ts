import { Point } from "../Core/Point";
import ObstacleCreateInput from "./ObstacleCreate.input";

export class Obstacle implements Point {
  x!: number;
  y!: number;
  skin!: string;

  constructor({ x, y, skin }: ObstacleCreateInput) {
    this.x = x;
    this.y = y;
    this.skin = skin;
  }
}
