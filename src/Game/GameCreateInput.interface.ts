import { CharacterCreateInput } from '../Character';
import { ItemCreateInput } from '../Item';

export interface GameCreateInput {
  characters: CharacterCreateInput[];
  items: ItemCreateInput[];
}
