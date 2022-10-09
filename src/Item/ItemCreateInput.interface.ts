export interface ItemCreateInput {
	id: string,
	name: string,
	description: string;
	skin: string,
	avatar: string,
	strength: number,
	agility: number,
	ownerId: string;
	x: number,
	y: number,
}