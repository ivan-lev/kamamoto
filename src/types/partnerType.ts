export type Partner = {
  _id: string;
  link: string;
  logo: string;
  title: string;
  isActive: boolean;
};

export const defaultPartner: Partner = {
  _id: '',
  link: '',
  logo: '',
  title: '',
  isActive: false
};
