import type { RootState } from '@/slices/admin';
import type { CeramicStyle } from '@/types/ceramicStyles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CeramicStyleFormView from '@/components/admin/CeramicStyles/CeramicStyleFormView';
import CeramicStylesRow from '@/components/admin/CeramicStyles/CeramicStylesRow';
import Modal from '@/components/shared/Modal';
import Preloader from '@/components/visitor/Preloader/Preloader';
import Seo from '@/components/visitor/Seo/Seo';
import { setCeramicStyles, setCeramicStyleToEdit, setIsExistingStyleEdited } from '@/slices/admin/ceramicStyles';
import { defaultCeramicStyle } from '@/types/ceramicStyles';
import { api } from '@/utils/api/api';

export default function CeramicStyles() {
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const [showModal, setShowModal] = useState<boolean>(false);
	const dispatch = useDispatch();
	const ceramicStylesList = useSelector((state: RootState) => state.ceramicStyles.ceramicStylesList);
	const isExistingStyleEdited = useSelector(
		(state: RootState) => state.ceramicStyles.isExistingStyleEdited,
	);

	function createNewCeramicStyle(data: CeramicStyle) {
		dispatch(setIsExistingStyleEdited(false));
		dispatch(setCeramicStyleToEdit(data));
		setShowModal(true);
	}

	function handleCloseModal() {
		setShowModal(false);
		if (isExistingStyleEdited) {
			dispatch(setCeramicStyleToEdit({ ...defaultCeramicStyle }));
			dispatch(setIsExistingStyleEdited(false));
		}
	}

	useEffect(() => {
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.ceramicStyles.getCeramicStyles(true)
				.then((styles) => {
					dispatch(setCeramicStyles(styles));
					setShowPreloader(false);
				})
				.catch(error => console.error(error));
		}
	}, []);

	return (
		<>
			<Seo title="Камамото: стили керамики" />

			{ showPreloader
				? (
					<Preloader />
				)
				: (
					<div className="container container--background-transparent">
						<h1 className="title title--1">Стили керамики</h1>

						<div className="table">
							<div className="table__row">
								<span className="table__cell table__cell--span-2">Имя</span>
								<span className="table__cell table__cell--span-3">Заголовок</span>
								<span className="table__cell table__cell--span-3">Мини карта</span>
								<span className="table__cell table__cell--span-2">Тхумб</span>
								<span className="table__cell table__cell--centered">Ред</span>
								<span className="table__cell table__cell--centered">Акт</span>
							</div>

							{ ceramicStylesList.map(style => <CeramicStylesRow key={ style.name } style={ style } setShowModal={ setShowModal } />) }
						</div>

						<Modal showModal={ showModal } closeModal={ () => handleCloseModal() }>
							<CeramicStyleFormView />
						</Modal>

						<button className="button" onClick={ () => createNewCeramicStyle({ ...defaultCeramicStyle }) }>
							Создать
						</button>
					</div>
				) }
		</>
	);
}
