export type SearchItemType = 'article' | 'term';

export interface SearchItem {
	title: string;
	link: string;
	snippet: string;
	thumbnail: string;
	// article — стили керамики и мастера, term — глоссарий
	type: SearchItemType;
}

export interface SearchResponse {
	items: SearchItem[];
	query: string;
}
