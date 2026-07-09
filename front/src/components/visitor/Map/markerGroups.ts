export interface MarkerGroupConfig {
	groupName: string;
	title: string;
	icon: string;
}

export const MARKER_GROUPS: MarkerGroupConfig[] = [
	{ groupName: 'six-old-kilns', title: 'Шесть ранних печей', icon: 'marker-red' },
	{ groupName: 'seven-kilns-of-enshu', title: 'Семь печей Энсю', icon: 'marker-brown' },
	{ groupName: 'traditional-kilns', title: 'Японские традиционные ремёсла', icon: 'marker-orange' },
	{ groupName: 'other-kilns', title: 'Другие стили керамики', icon: 'marker-yellow' },
];
