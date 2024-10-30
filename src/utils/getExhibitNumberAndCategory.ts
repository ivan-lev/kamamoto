export function getExhibitNumberAndCategory(location: string): { exhibitCategory: string; exhibitNumber: number } {
	const parsedLocation = location.split('/');
	const indexOfCollection = parsedLocation.indexOf('collection');
	const category = parsedLocation[indexOfCollection + 1];
	const exhibitNumber = parsedLocation[indexOfCollection + 2];
	return { exhibitCategory: category, exhibitNumber: Number(exhibitNumber) };
}
