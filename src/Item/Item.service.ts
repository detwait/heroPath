import { Config } from '../Config';
import { Item } from './Item';
import { ItemCreateInput } from './ItemCreateInput.interface';

class ItemService {
  create(input: ItemCreateInput): Item {
    return new Item(input, Config.items);
  }
}

export const itemService = new ItemService();
