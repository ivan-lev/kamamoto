import type { Link } from '@/types/link';

const personal: Link[] = [
	{
		id: 0,
		title: 'VK',
		url: 'https://vk.com/tea_lion',
		icon: '/icons/logo-vk.svg',
	},
	{
		id: 1,
		title: 'Instagram',
		url: 'https://instagram.com/tea_lion',
		icon: '/icons/logo-instagram.svg',
	},
	{
		id: 2,
		title: 'Telegram',
		url: 'https://t.me/ivanlev',
		icon: '/icons/logo-telegram.svg',
	},
	{
		id: 3,
		title: 'Email',
		url: 'mailto:fanatos@mail.ru',
		icon: '/icons/logo-mail.svg',
	},
];

export const social: Link[] = [
	{
		id: 1,
		title: 'Telegram',
		url: 'https://t.me/ChawanShop',
		icon: '/icons/logo-telegram.svg',
	},
	{
		id: 2,
		title: 'Email',
		url: 'mailto:fanatos@mail.ru',
		icon: '/icons/logo-mail.svg',
	},
	{
		id: 3,
		title: 'Созидатели',
		url: 'https://www.sozidateli.ru/portal/user/303854',
		icon: '/icons/logo-sozidateli.svg',
	},
];

const footer: Link[] = [
	{
		id: 0,
		title: 'Файлы для скачивания',
		url: 'downloads/',
	},
	{
		id: 1,
		title: 'Шаблоны документов',
		url: 'documents/',
	},
	{
		id: 2,
		title: 'Благодарственные письма',
		url: 'thanksletters/',
	},
	{
		id: 3,
		title: 'Помощники проекта',
		url: 'benefactors/',
	},
];

export const links = Object.freeze({ social, personal, footer });
