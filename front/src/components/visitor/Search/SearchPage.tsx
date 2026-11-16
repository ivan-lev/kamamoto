import type { SearchItem } from '@/types/search';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import Preloader from '@/components/shared/Preloader/Preloader';
import SearchInput from '@/components/shared/SearchInput/SearchInput';
import PageTop from '@/components/visitor/PageTop/PageTop';
import SearchResults from '@/components/visitor/Search/SearchResults';
import Seo from '@/components/visitor/Seo/Seo';
import { api } from '@/utils/api/api';
import { getErrorMessage } from '@/utils/api/api.common';
import { scrollToTop } from '@/utils/scrollToTop';
import './SearchPage.scss';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function SearchPage() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	// подтверждённый запрос — всегда из URL, черновик в поле — внутри SearchInput
	const confirmedQuery = (searchParams.get('q') ?? '').trim();
	const [status, setStatus] = useState<Status>('idle');
	const [loadedQuery, setLoadedQuery] = useState<string>('');
	const [items, setItems] = useState<SearchItem[]>([]);
	const [error, setError] = useState<string>('');

	// Back/Forward и прямое открытие ссылки обновляют результаты (поле пересоздаётся через key)
	useEffect(() => {
		// без запроса поиск не запускаем (пустое состояние выводится ниже через viewStatus)
		if (confirmedQuery === '')
			return;

		// устаревший ответ не должен перезаписать актуальные результаты
		const controller = new AbortController();

		api.search.search(confirmedQuery, 20, controller.signal)
			.then((response) => {
				setItems(response.items);
				setLoadedQuery(confirmedQuery);
				setStatus('success');
			})
			.catch((err: unknown) => {
				if (err instanceof DOMException && err.name === 'AbortError')
					return;

				setError(getErrorMessage(err));
				setLoadedQuery(confirmedQuery);
				setStatus('error');
			});

		return () => controller.abort();
	}, [confirmedQuery]);

	// запрос из URL ещё не подтверждён результатом — значит, идёт загрузка
	// (пустое состояние без запроса и загрузка вычисляются, а не пишутся в эффекте)
	const isStale = loadedQuery !== confirmedQuery;
	const viewStatus: Status = confirmedQuery === '' ? 'idle' : (isStale ? 'loading' : status);

	useEffect(() => scrollToTop(), []);

	function handleSubmit(query: string) {
		navigate(`/search?q=${encodeURIComponent(query)}`);
	}

	return (
		<>
			<Seo title="Камамото: поиск" />
			<PageTop title="Поиск" subtitle="Поиск по статьям о стилях керамики, мастерам и глоссарию: русский, английский и японский (в том числе иероглифы)." />

			<section className="section search-page">
				{ /* key пересоздаёт поле при смене подтверждённого запроса, чтобы подтянуть значение из URL */ }
				<SearchInput
					key={ confirmedQuery }
					initialValue={ confirmedQuery }
					onSubmit={ handleSubmit }
				/>

				{ viewStatus === 'loading' && <Preloader /> }

				{ viewStatus === 'error' && (
					<p className="search-page__error">{ error }</p>
				) }

				{ viewStatus === 'success' && (
					<SearchResults items={ items } query={ confirmedQuery } />
				) }
			</section>
		</>
	);
}
