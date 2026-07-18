export interface MarkerGroupConfig {
	groupName: string;
	title: string;
	icon: string;
}

export const MARKER_GROUPS: MarkerGroupConfig[] = [
	{ groupName: 'six-old-kilns', title: 'Шесть ранних печей', icon: 'marker-bronze-spice' },
	{ groupName: 'seven-kilns-of-enshu', title: 'Семь печей Кобори Энсю', icon: 'marker-autumn-leaf' },
	{ groupName: 'traditional-kilns', title: 'Японские традиционные ремёсла', icon: 'marker-deep-saffron' },
	{ groupName: 'regional-kilns', title: 'Традиционные ремёсла префектур', icon: 'marker-amber-flame' },
	{ groupName: 'other-kilns', title: 'Другие стили керамики', icon: 'marker-sunflower-gold' },
];
