import { Character } from "./Character";

export type CharacterViewProps = {
  entity: Character;
  onClick: (args: any) => void;
  children?: React.ReactNode;
}