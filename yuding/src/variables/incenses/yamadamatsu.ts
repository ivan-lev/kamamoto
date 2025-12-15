import type { Incense } from '@/variables/incences.types';
import { Features } from '@/variables/features';
import { Ingredients } from '@/variables/incences.types';
import { manufacturers } from '@/variables/manufacturers';
import { origin } from '@/variables/origin';

const karaku: Incense[] = [
	{
		title: 'Сэйфу',
		originalTitle: '清風',
		slug: 'seifu',
		description: 'Сэйфу (Свежий бриз) — мягкий, сочный аромат сандалового дерева, идеально подходящий для ежедневного использования. Сладкий, цветочный и древесный. Сладковатый аромат палочки раскрывается плотной медовой сладостью при воскуривании.',
		photos: ['PC013432.webp', 'PC013430.webp', 'PC013431.webp', 'PC013433.webp', 'PC013434.webp', 'PC013435.webp'],
		manufacturer: manufacturers.yamadamatsu,
		series: manufacturers.yamadamatsu.series?.karaku,
		ingredients: [Ingredients.sandalwoodSweet],
		features: [Features.daily, Features.natural],
		burnTime: 25,
		lenght: 13.5,
		origin: origin.japan,
		price: 0,
		pricePerStick: 16,
		isActive: true,
	},

	{
		title: 'Сёрэн',
		originalTitle: '',
		slug: 'shoren',
		description: 'Сёрэн — это свежий цветочный сандал, напоминающий аромат голубых лотосов, с мягким, долго сохраняющимся сладким послевкусием. Идеально подходит для ежедневного использования, медитации и случаев, когда нежелательно сильное ароматическое воздействие.',
		photos: ['PC013424.webp', 'PC013423.webp', 'PC013426.webp', 'PC013425.webp', 'PC013427.webp', 'PC013428.webp', 'PC013429.webp'],
		manufacturer: manufacturers.yamadamatsu,
		series: manufacturers.yamadamatsu.series?.karaku,
		ingredients: [Ingredients.sandalwoodSweet, Ingredients.florals],
		features: [Features.daily],
		burnTime: 25,
		lenght: 13.5,
		origin: origin.japan,
		price: 0,
		pricePerStick: 32,
		isActive: true,
	},

	{
		title: 'Дзинко',
		originalTitle: '',
		slug: 'jinko',
		description: 'Дзинко — это успокаивающий аромат агара, предназначенный для ежедневного использования. Идеально подходит для небольших помещений и медитации. Насыщенный, глубокий и спокойный аромат. Идеально подходит для случаев, когда нежелательно использование сильных ароматов и для небольших помещений.',
		photos: ['PC013444.webp', 'PC013442.webp', 'PC013443.webp', 'PC013445.webp', 'PC013446.webp', 'PC013447.webp'],
		manufacturer: manufacturers.yamadamatsu,
		series: manufacturers.yamadamatsu.series?.karaku,
		ingredients: [Ingredients.aloeswood],
		features: [Features.daily],
		burnTime: 25,
		lenght: 13.5,
		origin: origin.japan,
		price: 0,
		pricePerStick: 22,
		isActive: true,
	},

	{
		title: 'Бъякудан',
		originalTitle: '',
		slug: 'byakudan',
		description: 'Бъякудан — это превосходные благовония из чистого сандалового дерева, изготовленные из высококачественного сандала сорта Розан. Аромат густой, древесный и мягкий. Идеально подходит для ежедневного использования.',
		photos: ['PC013438.webp', 'PC013436.webp', 'PC013437.webp', 'PC013439.webp', 'PC013440.webp', 'PC013441.webp'],
		manufacturer: manufacturers.yamadamatsu,
		series: manufacturers.yamadamatsu.series?.karaku,
		ingredients: [Ingredients.sandalwoodRozan],
		features: [Features.daily],
		burnTime: 25,
		lenght: 13.5,
		origin: origin.japan,
		price: 0,
		pricePerStick: 18,
		isActive: true,
	},
];

export const yamadamatsuIncences: Incense[] = [...karaku];
