import type { Style } from '../../types/style';

export default function ceramicStylesSorter(a: Style, b: Style) {
	if (a.title < b.title) {
		return -1;
	}
	if (a.title > b.title) {
		return 1;
	}
	return 0;
}
