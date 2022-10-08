import { Point } from "../Core/Point";
import { TravelSquare } from "../Core/TravelSquare";
import { TravelState } from "../Game/TravelState.enum";
import CharacterCreateInput from "./CharacterCreate.input";

export default class Character implements Point {
	isPlayer: boolean = false;
	name: string = 'default';
	skin: string = '';
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

	constructor({ isPlayer, name, skin, level, nativeHp, strength, agility, x, y }: CharacterCreateInput) {
		this.isPlayer = isPlayer || false;
		this.name = name;
		this.skin = skin;
		this.level = level;
		this.nativeHp = nativeHp;
		this.strength = strength;
		this.agility = agility;
		this.x = x;
		this.y = y;
		this.destination = { x, y };
	}
}