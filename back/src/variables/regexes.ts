export const REGEX = Object.freeze({
	CATEGORY_EN: /^[a-z]+$/,
	CATEGORY_RU: /^[а-я]+$/i,
	ARTICLE_NAME: /^[a-z-]+$/,
	ARTICLE_TITLE: /^[а-яё-]+$/i,
	IMAGE: /\w+\.(jpe?g|webp)$/i,
	SVG: /\w+\.(svg)$/i,
	URL: /(https?:\/\/)(www\.)?[\w-]+\.[a-z]{2}[\w\-.~:/?#[\]@!$&'()*+,;=]*/,
});
