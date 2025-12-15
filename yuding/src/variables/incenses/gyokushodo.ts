import type { Incense } from '@/variables/incences.types';
import { Features } from '@/variables/features';
import { Ingredients } from '@/variables/incences.types';
import { manufacturers } from '@/variables/manufacturers';
import { origin } from '@/variables/origin';

const daily: Incense[] = [
	{
		title: 'Дзинко Хоэн',
		originalTitle: '',
		slug: 'jinko-hoen',
		description: 'Дзинко Хоэн — это аромат классических японских благовоний. Удивительно игривый, загадочный и с пикантной нотой, аромат Дзинко Хоэн сочетает в себе терпкий вьетнамский агар с мягким сладким индийским сандалом, создавая древесную базу под сложной смесью специй и легких цветочных ароматов. В результате получился аромат со значительной глубиной, сочетающий в себе традиции и современность, с тонким присутствием, одновременно сложным, манящим и успокаивающим. Глубокий и сложный пряный аромат, демонстрирующий умелый баланс.',
		photos: ['IMG_3145.webp'],
		manufacturer: manufacturers.gyokushodo,
		series: manufacturers.gyokushodo.series?.daily,
		ingredients: [Ingredients.japaneseBayBark, Ingredients.aloeswoodVietnamese, Ingredients.sandalwoodIndian, Ingredients.florals, Ingredients.spices],
		features: [Features.daily, Features.natural],
		burnTime: 30,
		lenght: 14,
		origin: origin.japan,
		price: 0,
		pricePerStick: 8,
		isActive: true,
	},

	{
		title: 'Дзинко Ёмэй',
		originalTitle: '',
		slug: 'jinkoh-yomei',
		description: 'В аромате Дзинко Ёмэй компания Гёкусёдо представляет новую концепцию в производстве благовоний – алхимию аромата кьяры без самой кьяры. Умело сочетая вьетнамский агар, индийское сандаловое дерево, традиционные специи и полуцветочный парфюм, Дзинко Ёмэй создает пряный, резкий и неповторимый аромат, сложный, утонченный и превосходящий свою древесную базу. Элегантный, спокойный аромат Дзинко Ёмэй одновременно пленительный, успокаивающий и стойкий.',
		photos: [],
		manufacturer: manufacturers.gyokushodo,
		series: manufacturers.gyokushodo.series?.daily,
		ingredients: [Ingredients.aloeswoodVietnamese, Ingredients.sandalwoodIndian, Ingredients.spices],
		features: [Features.daily, Features.natural],
		burnTime: 30,
		lenght: 14,
		origin: origin.japan,
		price: 0,
		pricePerStick: 0,
		isActive: false,
	},

	{
		title: 'Дзинко Кодзюрин',
		originalTitle: '',
		slug: 'jinkoh-kojurin',
		description: 'Для ценителей агара в Дзинко Кодзюрин сочетается пряный вьетнамский агар с мягким индийским сандалом. В результате получается изысканный, элегантный и очень понятный аромат — даже для тех, кто впервые знакомится с агаром. Благодаря прочной древесной базе, Дзинко Кодзюрин обладает глубоким, сдержанным, солоноватым и сладким звучанием, представляя собой приятное сочетание древесины, специй и традиций.',
		photos: [],
		manufacturer: manufacturers.gyokushodo,
		series: manufacturers.gyokushodo.series?.daily,
		ingredients: [Ingredients.aloeswoodVietnamese, Ingredients.sandalwoodIndian],
		features: [Features.daily, Features.natural],
		burnTime: 30,
		lenght: 14,
		origin: origin.japan,
		price: 0,
		pricePerStick: 0,
		isActive: false,
	},

	{
		title: 'Кодзюрин',
		originalTitle: '香樹林',
		slug: 'kojurin',
		description: 'Освежающая смесь индийского сандалового дерева с легкими цветочными нотками в аромате Кодзюрин создает приятный и располагающий запах, что делает его одним из самых популярных благовоний в Японии. Обладая пленительной сладостью, мягкостью и гладкостью, Кодзюрин идеально подходит для наполнения помещения, в качестве фонового аромата или просто для расслабления, когда хочется чего-то большего, чем простое сандаловое дерево.',
		photos: [],
		manufacturer: manufacturers.gyokushodo,
		series: manufacturers.gyokushodo.series?.daily,
		ingredients: [Ingredients.sandalwoodIndian, Ingredients.spices],
		features: [Features.daily, Features.natural],
		burnTime: 30,
		lenght: 14,
		origin: origin.japan,
		price: 0,
		pricePerStick: 0,
		isActive: false,
	},
];

const lowSmoke: Incense[] = [
	{
		title: 'Омия (Кипарис)',
		originalTitle: '大宮',
		slug: 'omiya',
		description: 'Омия — это очень тонкий, полусладкий, лёгкий аромат с небольшим количеством дыма, сочетающий в себе ноты японского кипариса и современные мягкие парфюмерные оттенки. В результате получается современная интерпретация, гармонично сочетащая благородный аромат кипариса и современные ноты.',
		photos: [],
		manufacturer: manufacturers.gyokushodo,
		series: manufacturers.gyokushodo.series?.lowSmoke,
		ingredients: [Ingredients.cypressJapanese, Ingredients.florals],
		features: [Features.daily, Features.natural, Features.lowSmoke],
		burnTime: 30,
		lenght: 14,
		origin: origin.japan,
		price: 0,
		pricePerStick: 0,
		isActive: false,
	},

	{
		title: 'Софу (Освежающий ветер)',
		originalTitle: '爽風',
		slug: 'sofu',
		description: 'Сoфу — это очень лёгкий, сладкий и освежающий аромат, напоминающий чайные листья. Благовония с низким содержанием дыма, идеально подходящие для небольших помещений и для тех, кто предпочитает более деликатный запах.',
		photos: [],
		manufacturer: manufacturers.gyokushodo,
		series: manufacturers.gyokushodo.series?.lowSmoke,
		ingredients: [Ingredients.florals, Ingredients.spices],
		features: [Features.daily, Features.natural, Features.lowSmoke],
		burnTime: 30,
		lenght: 14,
		origin: origin.japan,
		price: 0,
		pricePerStick: 0,
		isActive: false,
	},
];

export const gyokushodoIncences: Incense[] = [...daily, ...lowSmoke];
