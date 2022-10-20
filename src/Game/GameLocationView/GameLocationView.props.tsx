import { Point } from '../../_Core/Point';
import { Character } from '../../Character';
import { Item } from '../../Item';
import { Obstacle } from '../../Obstacle/Obstacle';

export type GameLocationViewProps = {
  characters: Character[];
  items: Item[];
  obstacles: Obstacle[];
  squares: Point[];
  startTravel: (args: Point) => void;
  children?: React.ReactNode;
};
