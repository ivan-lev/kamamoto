export interface Term {
	title: string;
	kanji: string;
	romaji?: string;
	image?: string;
	definition: string;
}

export interface DictionarySection {
	letter: string;
	terms: Term[];
}
