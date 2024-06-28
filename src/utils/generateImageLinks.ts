import { Dispatch } from '@reduxjs/toolkit';

import { setImages } from '../slices/exhibitsSlice';

import { Images } from '../types/imageObjectType';

export const generateImageLinks = (id: number, dispatch: Dispatch): void => {
  let images: Images = [];

  for (let i = 1; i <= 10; i++) {
    const imageLink = `/exhibits/${id}/${i === 10 ? '10' : '0' + i}.jpg`;
    const imageObject = { original: imageLink, thumbnail: imageLink };
    images.push(imageObject);
  }
  dispatch(setImages(images));
};
