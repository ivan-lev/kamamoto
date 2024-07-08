export type Exhibition = {
  id: number;
  year: number;
  dates: string;
  city: string;
  place: string;
  address?: string;
  name: string;
  link?: string;
  description?: string;
  photosCount?: number;
  poster?: boolean;
  curators?: string;
  organisators?: string;
  isPageActive: boolean;
};

export type Exhibitions = Exhibition[];
