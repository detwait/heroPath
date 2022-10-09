import { Item } from "./Item";
import { ItemCreateInput } from "./ItemCreateInput.interface";

export class ItemService {
  create(input: ItemCreateInput): Item {
    return new Item(input);
  }
}