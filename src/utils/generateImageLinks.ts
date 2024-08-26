import { Images } from '../types/imageType';

export const generateImageLinks = (
  path: string,
  photos: string[],
  additional: boolean = false
): Images => {
  let images: Images = [];

  photos.forEach(photo => {
    const link = `${path}/${additional ? 'additional/' : ''}${photo}`;
    images.push({ original: link, thumbnail: link });
  });

  return images;
};
