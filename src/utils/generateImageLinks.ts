import { Dispatch } from '@reduxjs/toolkit';

import { setImages } from '../slices/exhibitsSlice';

import { Images } from '../types/imageObjectType';

export const generateImageLinks = (id: number, dispatch: Dispatch): void => {
  let images: Images = [];

  for (let i = 0; i <= 9; i++) {
    const link = `/exhibits/${id}/${i}.jpg`;
    images.push({ original: link, thumbnail: link });
  }
  dispatch(setImages(images));
};
