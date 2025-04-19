export const REGEX = Object.freeze({
	CATEGORY_EN: /^[a-z]+$/,
	CATEGORY_RU: /^[а-я]+$/i,
	CERAMIC_STYLE_NAME: /^[a-z]+$/,
	CERAMIC_STYLE_TITLE: /^[а-яё]+$/i,
	IMAGE: /\w+\.(jpe?g|webp)$/i,
	URL: /(https?:\/\/)(www\.)?[\w-]+\.[a-z]{2}[\w\-.~:/?#[\]@!$&'()*+,;=]*/,
});
