import Exhibit from '../components/Exhibit/Exhibit';

export type Exhibition = {
  id: number;
  year: number;
  dates: string;
  city: string;
  place: string;
  address: string;
  name: string;
  link?: string;
  description: string;
  photosCount?: number;
  poster: boolean;
  curators?: string;
  organisators?: string;
  isActive: boolean;
};

export type Exhibitions = Exhibition[];

export const defaultExhibition: Exhibition = {
  id: 0,
  year: 2024,
  dates: '',
  city: '',
  place: '',
  address: '',
  name: '',
  link: '',
  description: '',
  photosCount: 0,
  poster: false,
  curators: '',
  organisators: '',
  isActive: false
};
