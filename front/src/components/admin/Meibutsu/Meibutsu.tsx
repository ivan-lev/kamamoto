import type { RootState } from '@/slices/admin';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MeibutsuFormView from '@/components/admin/Meibutsu/MeibutsuFormView';
import MeibutsuRow from '@/components/admin/Meibutsu/MeibutsuRow';
import Filters from '@/components/admin/shared/Filters/Filters';
import Modal from '@/components/shared/Modal';
import Preloader from '@/components/shared/Preloader/Preloader';
import Seo from '@/components/visitor/Seo/Seo';
import { setIsExistingMeibutsuEdited, setMeibutsu, setMeibutsuToEdit } from '@/slices/admin/meibutsu';
import { defaultMeibutsu } from '@/types/meibutsu';
import { api } from '@/utils/api/api';
import { storage } from '@/utils/storage';
import { STORAGE_KEYS } from '@/variables/variables';

export default function Meibutsu() {
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [query, setQuery] = useState<string>('');
	const [onlyWithArticle, setOnlyWithArticle] = useState<boolean>(false);
	const dispatch = useDispatch();
	const meibutsuList = useSelector((state: RootState) => state.meibutsu.meibutsuList);
	const isExistingMeibutsuEdited = useSelector((state: RootState) => state.meibutsu.isExistingMeibutsuEdited);

	const normalizedQuery = query.trim().toLowerCase();
	// фильтры складываются: запись должна совпадать и с чекбоксом, и с поиском
	const meibutsuFiltered = meibutsuList
		.filter(item => !onlyWithArticle || item.showArticle)
		.filter(item => !normalizedQuery
			// japaneseName в схеме необязательный, а бэк отдаёт записи через lean() — поля может не быть
			|| [item.name, item.id, item.japaneseName].some(field => (field ?? '').toLowerCase().includes(normalizedQuery)));

	function createNewMeibutsu() {
		dispatch(setIsExistingMeibutsuEdited(false));
		dispatch(setMeibutsuToEdit({ ...defaultMeibutsu }));
		setShowModal(true);
	}

	function handleCloseModal() {
		setShowModal(false);
		if (isExistingMeibutsuEdited) {
			dispatch(setMeibutsuToEdit({ ...defaultMeibutsu }));
			dispatch(setIsExistingMeibutsuEdited(false));
		}
	}

	useEffect(() => {
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);
		if (!token)
			return;

		async function fetchMeibutsu() {
			try {
				dispatch(setMeibutsu(await api.meibutsu.getMeibutsu()));
				setShowPreloader(false);
			}
			catch (error) {
				console.error(error);
			}
		}

		fetchMeibutsu();
	}, [dispatch]);

	return (
		<>
			<Seo title="Камамото: вещи с именем" />

			{ showPreloader
				? (
					<Preloader />
				)
				: (
					<>
						<h1 className="title title--1">Вещи с именем</h1>

						<Filters
							query={ query }
							searchPlaceholder="поиск: название, id, имя на японском"
							onQueryChange={ setQuery }
						>
							<label className="filters__checkbox">
								<span className={ `checkbox-label ${onlyWithArticle ? 'checkbox-label--checked' : ''}` }>
									<input
										className="checkbox-input"
										type="checkbox"
										checked={ onlyWithArticle }
										onChange={ e => setOnlyWithArticle(e.target.checked) }
									/>
								</span>
								Выложена статья
							</label>
						</Filters>

						<div className="table">
							<div className="table__row">
								<span className="table__cell table__cell--span-4">Название</span>
								<span className="table__cell table__cell--span-3">id</span>
								<span className="table__cell table__cell--span-3">Имя на японском</span>
								<span className="table__cell table__cell--centered">В статьях</span>
								<span className="table__cell table__cell--centered"></span>
							</div>
							{ meibutsuFiltered.map(item => <MeibutsuRow key={ item.id } meibutsu={ item } setShowModal={ setShowModal } />) }
						</div>

						<Modal showModal={ showModal } closeModal={ () => handleCloseModal() }>
							<MeibutsuFormView />
						</Modal>

						<button className="button admin__create-button" onClick={ () => createNewMeibutsu() }>
							Создать
						</button>

						{ meibutsuList.length === 0 && (
							<p className="text">Пока нет ни одной вещи с именем — создайте первую кнопкой выше.</p>
						) }
					</>
				) }
		</>
	);
}
