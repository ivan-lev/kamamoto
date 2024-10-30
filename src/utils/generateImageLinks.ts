import type { Images } from '../types/imageType';

export function generateImageLinks(path: string, photos: string[], additional: boolean = false): Images {
	const images: Images = [];

	photos.forEach((photo) => {
		const link = `${path}/${additional ? 'additional/' : ''}${photo}`;
		images.push({ original: link, thumbnail: link });
	});

	return images;
}
