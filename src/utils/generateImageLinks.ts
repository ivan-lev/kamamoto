import { Images } from '../types/imageType';

export const generateImageLinks = (path: string, id: number, photosCount: number = 10): Images => {
  let images: Images = [];

  for (let i = 0; i < photosCount; i++) {
    const link = `${path}${id}/${i}.jpg`;
    images.push({ original: link, thumbnail: link });
  }
  return images;
};
