import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import './ArticleNavigation.scss';

interface Props {
	containerRef: RefObject<HTMLDivElement | null>;
	// данные статьи: при смене статьи пункты навигации собираются заново
	refreshKey?: unknown;
}

interface NavigationItem {
	id: string;
	title: string;
}

const HEADING_SELECTOR = 'h2.section__header';

export default function ArticleNavigation({ containerRef, refreshKey }: Props) {
	const navRef = useRef<HTMLElement>(null);
	const [items, setItems] = useState<NavigationItem[]>([]);
	const [active, setActive] = useState(0);
	// панель показывается, когда страница прокручена минимум на полэкрана
	const [visible, setVisible] = useState(false);
	// отступ сверху для sticky-плашки: центр вьюпорта минус половина её высоты
	const [top, setTop] = useState(0);

	// пересчёт положения плашки при изменении высоты вьюпорта или списка разделов
	useEffect(() => {
		const measure = () => {
			if (navRef.current) {
				setTop(Math.max((window.innerHeight - navRef.current.offsetHeight) / 2, 0));
			}
		};

		measure();
		window.addEventListener('resize', measure);
		return () => window.removeEventListener('resize', measure);
	}, [items.length]);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) {
			return;
		}

		const headings = Array.from(container.querySelectorAll<HTMLHeadingElement>(HEADING_SELECTOR));
		setItems(headings.map((heading, index) => {
			const id = `article-heading-${index}`;
			heading.id = id;
			return { id, title: heading.textContent?.trim() || `Раздел ${index + 1}` };
		}));

		let frame = 0;

		const update = () => {
			frame = 0;

			setVisible(window.scrollY >= window.innerHeight * 0.5);

			const mark = window.innerHeight * 0.4;
			let current = 0;
			headings.forEach((heading, index) => {
				if (heading.getBoundingClientRect().top <= mark) {
					current = index;
				}
			});
			setActive(current);
		};

		const handleScroll = () => {
			frame ||= requestAnimationFrame(update);
		};

		update();
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
			if (frame) {
				cancelAnimationFrame(frame);
			}
		};
	}, [containerRef, refreshKey]);

	if (items.length === 0) {
		return null;
	}

	return (
		<nav
			className={ visible ? 'article-navigation article-navigation--visible' : 'article-navigation' }
			ref={ navRef }
			style={{ top }}
			aria-label="Навигация по разделам статьи"
		>
			<ol className="article-navigation__list">
				{ items.map((item, index) => (
					<li key={ item.id }>
						<button
							type="button"
							className={ index === active
								? 'article-navigation__item article-navigation__item--active'
								: 'article-navigation__item' }
							aria-current={ index === active }
							onClick={ () => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }) }
						>
							<span className="article-navigation__title">{ item.title }</span>
							<span className="article-navigation__dot" aria-hidden="true" />
						</button>
					</li>
				)) }
			</ol>
		</nav>
	);
}
