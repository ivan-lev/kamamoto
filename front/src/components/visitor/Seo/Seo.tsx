interface Props {
	title: string;
}

// Только заголовок вкладки: при переходах внутри SPA сервер не участвует.
// description и og:* для поисковиков и соцсетей подставляет бэк (back/src/controllers/pages.ts),
// а React 19 не заменил бы тег из index.html, а добавил второй
export default function Seo({ title }: Props) {
	return <title>{ title }</title>;
}
