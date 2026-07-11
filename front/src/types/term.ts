export interface Term {
	title: string;
	id: string;
	kanji: string;
	romaji: string;
	image?: string;
	definition: string;
	letter: string;
}

export interface DictionarySection {
	letter: string;
	terms: Term[];
}

export const defaultTerm: Term = {
	title: '',
	id: '',
	kanji: '',
	romaji: '',
	image: '',
	definition: '',
	letter: '',
};
