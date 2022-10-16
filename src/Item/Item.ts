import { IdEntity } from "../_Core/IdEntity.interface";
import { Point } from "../_Core/Point";
import { ItemCreateInput } from "./ItemCreateInput.interface";
import { ItemInfoInput } from "./ItemInfo.interface";

export class Item implements IdEntity, Point {
  id: string;
  name: string = "default";
  description: string;
  skin: string;
	avatar: string;
  strength: number = 0;
  agility: number = 0;
  x: number;
  y: number;

  constructor({
    itemId,
    x,
    y,
  }: ItemCreateInput, itemsInfo: Record<string, ItemInfoInput>) {
    const { name, description, skin, avatar, strength, agility } = itemsInfo[itemId];
    this.id = itemId + Math.random() * 1000;
    this.name = name;
    this.description = description;
    this.skin = skin;
    this.avatar = avatar;
    this.strength = strength;
    this.agility = agility;
    this.x = x;
    this.y = y;
  }
}
