import { Images } from '../types/imageType';

export const generateImageLinks = (id: number): Images => {
  let images: Images = [];

  for (let i = 0; i <= 9; i++) {
    const link = `/exhibits/${id}/${i}.jpg`;
    images.push({ original: link, thumbnail: link });
  }
  return images;
};
