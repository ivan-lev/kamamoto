import type { Link } from '@/types/link';

const menu: Link[] = [
	{ title: 'Коллекция', url: '/collection/' },
	{ title: 'Выставки', url: '/exhibitions/' },
	{ title: 'Полезное', url: '/useful/' },
];

const personal: Link[] = [
	{ title: 'VK', url: 'https://vk.com/tea_lion', icon: '/__spritemap#sprite-logo-vk-view' },
	// { title: 'Instagram', url: 'https://instagram.com/tea_lion', icon: '/__spritemap#sprite-logo-instagram-view' },
	{ title: 'Telegram', url: 'https://t.me/ivanlev', icon: '/__spritemap#sprite-logo-telegram-view' },
	{ title: 'Email', url: 'mailto:fanatos@mail.ru', icon: '/__spritemap#sprite-envelope-view' },
];

const social: Link[] = [
	{ title: 'Telegram', url: 'https://t.me/ChawanShop', icon: '/__spritemap#sprite-logo-telegram-view' },
	{ title: 'Email', url: 'mailto:fanatos@mail.ru', icon: '/__spritemap#sprite-envelope-view' },
	{ title: 'Созидатели', url: 'https://www.sozidateli.ru/portal/user/303854', icon: '/__spritemap#sprite-logo-sozidateli-view' },
];

const useful: Link[] = [
	{ title: 'Файлы для скачивания', url: '/downloads' },
	{ title: 'Шаблоны документов', url: '/documents' },
	{ title: 'Благодарственные письма', url: '/thanksletters' },
];

const info: Link[] = [
	{ title: 'О коллекционере', url: '/about' },
	{ title: 'Контакты', url: '/contacts' },
	{ title: 'Помощники проекта', url: '/assistants' },
];

export const links = Object.freeze({ menu, social, personal, useful, info });
