import { useLayoutEffect } from 'react';
import PageTop from '@/components/visitor/PageTop/PageTop';
import Seo from '@/components/visitor/Seo/Seo';
import TermsList from '@/components/visitor/TermsList/TermsList';
import { scrollToTop } from '@/utils/scrollToTop';
import { japaneseSocieties } from '@/variables/useful/japaneseSocieties';

export default function JapaneseSocieties() {
	useLayoutEffect(() => scrollToTop(), []);

	return (
		<>
			<Seo
				title="Камамото: японские керамические сообщества"
				description="Страница со списком сообществ, поддерживающих керамическую культуру и традиции Японии"
			/>

			<PageTop
				title="Японские керамические собщества"
				subtitle="На этой странице будет собрана информация о сообществах, поддерживающих развитие гончарного искусства Японии. Информация находится в процессе заполнения."
				backLink="/useful/"
			/>

			<section className="section">
				<TermsList items={ japaneseSocieties } />
			</section>
		</>
	);
}
