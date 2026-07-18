import type { RootState } from '@/slices/admin/index';
import type { Term } from '@/types/term';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DictionaryForm from '@/components/admin/Dictionary/DictionaryForm';
import Modal from '@/components/shared/Modal';
import Preloader from '@/components/shared/Preloader/Preloader';
import Seo from '@/components/visitor/Seo/Seo';
import { clearTermForm, setIsExistingTermEdited, setTerms, setTermToEdit } from '@/slices/admin/dictionary';
import { api } from '@/utils/api/api';

export default function Dictionary() {
	const dispatch = useDispatch();
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const [showModal, setShowModal] = useState<boolean>(false);
	const terms = useSelector((state: RootState) => state.dictionary.terms);

	function openEmptyTermForm() {
		dispatch(setIsExistingTermEdited(false));
		dispatch(clearTermForm());
		setShowModal(true);
	}

	function handleEditTerm(term: Term) {
		dispatch(setIsExistingTermEdited(true));
		dispatch(setTermToEdit(term));
		setShowModal(true);
	};

	useEffect(() => {
		api.terms.getTerms(true)
			.then((sections) => {
				const flatTerms = sections.flatMap(section => section.terms);
				dispatch(setTerms(flatTerms));
				setShowPreloader(false);
			})
			.catch(error => console.error(error));
	}, [dispatch]);

	return (
		<>
			<Seo title="Камамото: словарь" />

			{ showPreloader
				? (
					<Preloader />
				)
				: (
					<div className="container container--background-transparent">

						<h1 className="title title--1">Словарь</h1>
						<div className="table">
							<div className="table__row">
								<span className="table__cell table__cell--span-3">Заголовок</span>
								<span className="table__cell table__cell--span-2">Id</span>
								<span className="table__cell table__cell--span-2">Буква</span>
								<span className="table__cell table__cell--span-4">Файл изображения</span>
								<span className="table__cell table__cell--centered"></span>
							</div>

							{ terms.map((term) => {
								const { id, title, letter, image } = term;
								return (
									<div key={ id } className="table__row">
										<span className="table__cell table__cell--span-3">{ title }</span>
										<span className="table__cell table__cell--span-2">{ id }</span>
										<span className="table__cell table__cell--span-2">{ letter }</span>
										<span className="table__cell table__cell--span-4">{ image }</span>
										<span className="table__cell table__cell--centered">
											<button
												className="table__button table__button--edit"
												onClick={ () => handleEditTerm(term) }
											>
											</button>
										</span>
									</div>
								);
							}) }
						</div>

						<Modal
							showModal={ showModal }
							closeModal={ () => setShowModal(false) }
						>
							<DictionaryForm closeModal={ () => setShowModal(false) } />
						</Modal>

						<button className="button" onClick={ openEmptyTermForm }>
							Создать
						</button>
					</div>
				) }
		</>
	);
}
