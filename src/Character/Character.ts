import { IdEntity } from "../Core/IdEntity.interface";
import { Point } from "../Core/Point";
import { TravelSquare } from "../Core/TravelSquare";
import { TravelState } from "../Game/TravelState.enum";
import { CharacterCreateInput } from "./CharacterCreateInput.interface";

export default class Character implements IdEntity, Point {
  isPlayer: boolean = false;
  id: string;
  name: string = "default";
  skin: string = "";
	avatar: string = "";
  level: number = 1;
  maxHp: number = 1;
  nativeHp: number = 0;
  hp: number = this.maxHp;
  strength: number = 1;
  agility: number = 1;
  exp: number = 0;
  x: number = 1;
  y: number = 1;
  state: TravelState = TravelState.stay;
  travelPath: TravelSquare[] = [];
  travelStartTime: number = 0;
  travelFinishTime: number = 0;
  destination: Point;

  constructor({
    isPlayer,
    id,
    name,
    skin,
		avatar,
    level,
    nativeHp,
    strength,
    agility,
    x,
    y,
  }: CharacterCreateInput) {
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
  }
}
