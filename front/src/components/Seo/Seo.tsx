interface Props {
	title: string;
	description?: string;
}

export default function Seo({ title, description }: Props) {
	return (
		<>
			<title>{ title }</title>
			<meta name="description" content={ description || 'Частная коллекция японской керамики и предметов ручной работы, выполненных с применением традиционных техник. Сотрудничество в организации выставок и мероприятий' } />
		</>
	);
}
