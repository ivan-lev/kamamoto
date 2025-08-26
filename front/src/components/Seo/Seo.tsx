interface Props {
	title: string;
}

export default function Seo({ title }: Props) {
	return (
		<>
			<title>{ title }</title>
			<meta property="og:title" content={ title } />
			<meta property="og:image" content="https://kamamoto.ru/images/og-image.jpg" />
		</>
	);
}
