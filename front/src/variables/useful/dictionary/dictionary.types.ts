interface Term {
	title: string;
	kanji: string;
	definition: string;
}

export interface DictionarySection {
	letter: string;
	terms: Term[];
}
