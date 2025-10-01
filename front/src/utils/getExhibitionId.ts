export const getExhibitionId = (location: string): string => location.split('/').pop() || '';
