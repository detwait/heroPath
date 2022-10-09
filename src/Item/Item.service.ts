import Item from "./Item";
import { ItemCreateInput } from "./ItemCreateInput.interface";

export default class ItemService {
  create(input: ItemCreateInput): Item {
    return new Item(input);
  }
}