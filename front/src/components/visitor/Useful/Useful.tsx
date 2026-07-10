import { useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import DisplayGrid from '@/components/visitor/DisplayGrid/DisplayGrid';
import PageTop from '@/components/visitor/PageTop/PageTop';
import Seo from '@/components/visitor/Seo/Seo';
import { resetDisplayList, setDisplayList } from '@/slices/visitor/list';
import { scrollToTop } from '@/utils/scrollToTop';

export default function Useful() {
	const dispatch = useDispatch();

	useLayoutEffect(() => scrollToTop(), []);

	useEffect(() => {
		dispatch(setDisplayList([
			{ link: '/dictionary', title: 'Глоссарий', thumbnail: '/images/useful/dictionary.webp' },
			{ link: '/ceramic-styles/', title: 'Стили керамики', thumbnail: '/images/dummy.webp' },
			{ link: '/map/', title: 'Карта гончарных цетров', thumbnail: '/images/useful/map.webp' },
			{ link: '/japanese-exhibitions', title: 'Японские выставки', thumbnail: '/images/useful/exhibitions/thumbnail.webp' },
			{ link: '/japanese-societies', title: 'Японские керамические сообщества', thumbnail: '/images/useful/societies.webp' },
			{ link: '/lnt-potters', title: 'Живые национальные сокровища', thumbnail: '/images/useful/lnt.webp' },
		]));

		return () => {
			dispatch(resetDisplayList());
		};
	}, []);

	return (
		<>
			<Seo
				title="Камамото: полезные материалы"
				description="Страница с каталогом ресурсов, содержащих информавцию о японской керамике, известных и легендарных мастерах и предметах"
			/>

			<PageTop title="Полезное" subtitle="Здесь будет полезная информация. На данный момент есть начальная версия глоссария. Раздел со стилями керамики - в разработке." />

			<section className="section">
				<DisplayGrid />
			</section>
		</>
	);
}
