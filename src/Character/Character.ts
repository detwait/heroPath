import { IdEntity } from '../_Core/IdEntity.interface';
import { Point } from '../_Core/Point';
import { TravelSquare } from '../_Core/TravelSquare';
import { TravelState } from '../Game/TravelState.enum';
import { CharacterCreateInput } from './CharacterCreateInput.interface';
import { Item, ItemCreateInput, itemService } from '../Item';

export class Character implements IdEntity, Point {
  isPlayer = false;
  id: string;
  name = 'default';
  skin = '';
  avatar = '';
  level = 1;
  maxHp = 1;
  nativeHp = 0;
  hp: number = this.maxHp;
  strength = 1;
  agility = 1;
  exp = 0;
  x = 1;
  y = 1;
  state: TravelState = TravelState.stay;
  travelPath: TravelSquare[] = [];
  travelStartTime = 0;
  travelFinishTime = 0;
  destination: Point;
  items: Item[];
  isMainBoss = false;

  constructor({ isPlayer, id, name, skin, avatar, level, nativeHp, strength, agility, x, y, items, isMainBoss }: CharacterCreateInput) {
    this.isPlayer = isPlayer || false;
    this.id = id;
    this.name = name;
    this.skin = skin;
    this.level = level;
    this.avatar = avatar || '';
    this.nativeHp = nativeHp;
    this.strength = strength;
    this.agility = agility;
    this.x = x;
    this.y = y;
    this.destination = { x, y };
    this.items = [...items].map((item: ItemCreateInput) => itemService.create(item));
    this.isMainBoss = !!isMainBoss;
  }
}
