import type { Link } from '@/types/link';

const personal: Link[] = [
	{
		id: 0,
		title: 'VK',
		url: 'https://vk.com/tea_lion',
		icon: '/__spritemap#sprite-logo-vk-view',
	},
	// {
	//  id: 1,
	//  title: 'Instagram',
	//  url: 'https://instagram.com/tea_lion',
	//  icon: '/__spritemap#sprite-logo-instagram-view',
	// },
	{
		id: 2,
		title: 'Telegram',
		url: 'https://t.me/ivanlev',
		icon: '/__spritemap#sprite-logo-telegram-view',
	},
	{
		id: 3,
		title: 'Email',
		url: 'mailto:fanatos@mail.ru',
		icon: '/__spritemap#sprite-envelope-view',
	},
];

export const social: Link[] = [
	{
		id: 1,
		title: 'Telegram',
		url: 'https://t.me/ChawanShop',
		icon: '/__spritemap#sprite-logo-telegram-view',
	},
	{
		id: 2,
		title: 'Email',
		url: 'mailto:fanatos@mail.ru',
		icon: '/__spritemap#sprite-envelope-view',
	},
	{
		id: 3,
		title: 'Созидатели',
		url: 'https://www.sozidateli.ru/portal/user/303854',
		icon: '/__spritemap#sprite-logo-sozidateli-view',
	},
];

const footer: Link[] = [
	{
		id: 0,
		title: 'Файлы для скачивания',
		url: 'downloads',
	},
	{
		id: 1,
		title: 'Шаблоны документов',
		url: 'documents',
	},
	{
		id: 2,
		title: 'Благодарственные письма',
		url: 'thanksletters',
	},
	{
		id: 3,
		title: 'Помощники проекта',
		url: 'benefactors',
	},
];

export const links = Object.freeze({ social, personal, footer });
