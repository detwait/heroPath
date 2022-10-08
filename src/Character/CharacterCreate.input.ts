export default class CharacterCreateInput {
	isPlayer!: boolean;
	name!: string;
	skin!: string;
	avatar?: string;
	level!: number;
	nativeHp!: number;  
	strength!: number;
	agility!: number;
	x!: number;
	y!: number;
}