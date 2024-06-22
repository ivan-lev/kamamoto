export type Exhibition = {
  id: number;
  year: number;
  dates: string;
  city: string;
  place: string;
  name: string;
  link?: string;
};

export type Exhibitions = Exhibition[];
