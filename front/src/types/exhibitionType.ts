export interface Exhibition {
	id: number;
	year: number;
	dates: string;
	city: string;
	place: string;
	address: string;
	name: string;
	link?: string;
	description: string;
	photos: string[];
	poster: string;
	curators?: string;
	organisators?: string;
	isActive: boolean;
}

export type Exhibitions = Exhibition[];

// неактивная выставка в публичном списке (GET /exhibitions/ без токена): только поля карточки, без описания и фото
export type ExhibitionCard = Pick<Exhibition, 'id' | 'year' | 'dates' | 'city' | 'place' | 'name'> & { isActive: false };

// элемент публичного списка выставок: активная приходит целиком, неактивная — карточкой
export type PublicExhibition = (Exhibition & { isActive: true }) | ExhibitionCard;

export const defaultExhibition: Exhibition = {
	id: 0,
	year: new Date().getFullYear(),
	dates: '',
	city: '',
	place: '',
	address: '',
	name: '',
	link: '',
	description: '',
	photos: [],
	poster: '',
	curators: '',
	organisators: '',
	isActive: false,
};
