import { Config } from '../Config';
import { Item } from './Item';
import { ItemCreateInput } from './ItemCreateInput.interface';

class ItemService {
  create(input: ItemCreateInput): Item {
    return new Item(input, Config.items);
  }

  getDescription(item: Item): string {
    return [
      item.description,
      item.strength > 0 ? `<br>Strength +${item.strength}` : '',
      item.agility > 0 ? `<br>Agility +${item.agility}` : '',
    ].join('');
  }
}

export const itemService = new ItemService();
