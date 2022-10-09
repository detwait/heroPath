import { IdEntity } from "../_Core/IdEntity.interface";
import { Point } from "../_Core/Point";
import { ItemCreateInput } from "./ItemCreateInput.interface";

export class Item implements IdEntity, Point {
  id: string;
  ownerId: string = '';
  name: string = "default";
  description: string;
  skin: string;
	avatar: string;
  strength: number = 0;
  agility: number = 0;
  x: number;
  y: number;

  constructor({
    id,
    name,
    description,
    skin,
		avatar,
    strength,
    agility,
    x,
    y,
    ownerId,
  }: ItemCreateInput) {
    this.id = id;
    this.ownerId = ownerId;
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
