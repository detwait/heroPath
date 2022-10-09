import { IdEntity } from "../Core/IdEntity.interface";
import { ItemCreateInput } from "./ItemCreateInput.interface";

export default class Item implements IdEntity {
  id: string;
  ownerId: string = '';
  name: string = "default";
  skin: string = "";
	avatar: string = "";
  strength: number = 0;
  agility: number = 0;
  x?: number;
  y?: number;

  constructor({
    id,
    name,
    skin,
		avatar,
    strength,
    agility,
    x,
    y,
  }: ItemCreateInput) {
    this.id = id;
    this.name = name;
    this.skin = skin;
    this.avatar = avatar || '';
    this.strength = strength;
    this.agility = agility;
    this.x = x;
    this.y = y;
  }
}
