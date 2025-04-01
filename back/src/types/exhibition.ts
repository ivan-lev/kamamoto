export interface Exhibition {
  id: number;
  year: number;
  dates: string;
  city: string;
  address?: string;
  place: string;
  name: string;
  link?: string;
  description?: string;
  photos: string[];
  poster: boolean;
  curators?: string;
  organisators?: string;
  isActive: boolean;
}
