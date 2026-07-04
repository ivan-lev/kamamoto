export interface Potter {
	id: string;
	name: string;
	japaneseName: string;
	lifeDates: string;
	photo: string;
	info: string;
	isLNT: boolean;
}

export const defaultPotter: Potter = { id: '', name: '', japaneseName: '', lifeDates: '', photo: '', info: '', isLNT: false };
