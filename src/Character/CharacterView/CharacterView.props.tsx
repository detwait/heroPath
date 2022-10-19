import { Character } from '../Character';

export type CharacterViewProps = {
  entity: Character;
  onClick: (args: unknown) => void;
  children?: React.ReactNode;
};
