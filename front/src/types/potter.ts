export interface Potter {
	_id?: string;
	id: string;
	name: string;
	japaneseName: string;
	lifeDates: string;
	photo: string;
	info: string;
}

export const defaultPotter: Potter = { id: '', name: '', japaneseName: '', lifeDates: '', photo: '', info: '' };
