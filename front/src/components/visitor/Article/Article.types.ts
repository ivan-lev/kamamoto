export interface ArticleSlide {
	filename: string;
	source?: string;
	caption?: string;
};

export interface UploadedSlide {
	filename: string;
	url: string;
}

// Куда загружаются слайды статьи: /static/<target>/<key>/slides
// target должен быть разрешён на бэкенде (SLIDES_TARGETS в controllers/uploads.ts)
export interface SlidesStorage {
	target: string;
	key: string;
	// подсказка, пока key не заполнен (например, у нового стиля ещё нет имени)
	emptyKeyHint: string;
}

export interface ArticleSection {
	content: string;
	slides?: ArticleSlide[];
}

export interface Article {
	name: string;
	title: string;
	article: ArticleSection[];
}
