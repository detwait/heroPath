import { IdEntity } from '../_Core/IdEntity.interface';
import { Point } from '../_Core/Point';
import { ObstacleCreateInput } from './ObstacleCreate.input';

export class Obstacle implements IdEntity, Point {
  id: string;
  x: number;
  y: number;
  skin!: string;

  constructor({ x, y, skin }: ObstacleCreateInput) {
    this.x = x;
    this.y = y;
    this.id = `obstacle_${x}_${y}`;
    this.skin = skin;
  }
}
