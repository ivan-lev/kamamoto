import type { Images } from '../types/imageType';

export function generateImageLinks(photos: string[]): Images {
	const images: Images = [];

	photos.forEach((photo) => {
		images.push({ original: photo, thumbnail: photo });
	});

	return images;
}
