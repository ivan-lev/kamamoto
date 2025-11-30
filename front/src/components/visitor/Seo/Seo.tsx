interface Props {
	title: string;
	description?: string;
	canonicalUrl?: string;
}

export default function Seo({ title, description, canonicalUrl }: Props) {
	return (
		<>
			<title>{ title }</title>
			<meta name="description" content={ description || 'Частная коллекция японской керамики и предметов ручной работы, выполненных с применением традиционных техник. Сотрудничество в организации выставок и мероприятий' } />
			{ canonicalUrl && <link rel="canonical" href={ `https://kamamoto.ru/${canonicalUrl}` } /> }
		</>
	);
}
