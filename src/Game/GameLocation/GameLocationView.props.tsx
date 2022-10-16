import { Character } from "../../Character";
import { Item } from "../../Item";
import { Obstacle } from "../../Obstacle/Obstacle";
import { Point } from "../../_Core/Point";

export type GameLocationViewProps = {
  characters: Character[];
  items: Item[];
  obstacles: Obstacle[];
  squares: Point[];
  startTravel: (args: any) => void;
  children?: React.ReactNode;
}