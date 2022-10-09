import { Character } from "../Character";
import { Item } from "../Item";

export type GamePlayerInfoViewProps = {
  player: Character;
  playerItems: Item[];
  children?: React.ReactNode;
}