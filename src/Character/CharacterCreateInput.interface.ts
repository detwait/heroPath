import { ItemCreateInput } from "../Item";

export interface CharacterCreateInput {
	isPlayer: boolean;
	id: string;
	name: string;
	skin: string;
	avatar?: string;
	level: number;
	nativeHp: number;  
	strength: number;
	agility: number;
	x: number;
	y: number;
	items: ItemCreateInput[];
}