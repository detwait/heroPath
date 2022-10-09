import { CharacterCreateInput } from "../Character/CharacterCreateInput.interface";
import { ItemCreateInput } from "../Item/ItemCreateInput.interface";

export interface GameCreateInput {
	characters: CharacterCreateInput[],
  items: ItemCreateInput[],
}