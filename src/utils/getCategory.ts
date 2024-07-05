export const getCategory = (location: string): string => {
  const parsedLocation = location.split('/');
  const indexOfCollection = parsedLocation.indexOf('collection');
  const category = parsedLocation[indexOfCollection + 1];
  return category;
};
