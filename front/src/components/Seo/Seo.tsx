export default function Seo({ title }: { title: string }) {
	return (
		<>
			<title>{title}</title>
			<meta property="og:title" content={title} />
			<meta property="og:image" content="https://kamamoto.ru/images/og-image.jpg" />
		</>
	);
}
