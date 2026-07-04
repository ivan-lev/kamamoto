import type { Types } from 'mongoose';

export interface Potter {
	_id: Types.ObjectId;
	id: string;
	name: string;
	japaneseName?: string;
	lifeDates?: string;
	photo?: string;
	info?: string;
	isLNT: boolean;
};
