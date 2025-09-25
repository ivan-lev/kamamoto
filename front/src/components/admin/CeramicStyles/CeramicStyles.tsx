import type { RootState } from '@/slices/admin';
import type { CeramicStyle } from '@/types/ceramicStyles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CeramicStylesForm from '@/components/admin/CeramicStyles/CeramicStylesForm';
import Modal from '@/components/Modal/Modal';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';
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

	function handleSetCeramicStyleToEdit(data: CeramicStyle) {
		dispatch(setIsExistingStyleEdited(true));
		dispatch(setCeramicStyleToEdit(data));
		setShowModal(true);
	}

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
						<h2 className="title3">Стили керамики</h2>
						<div className="table">
							<div className="table__row">
								<span className="table__cell table__cell--span-2">Имя</span>
								<span className="table__cell table__cell--span-3">Заголовок</span>
								<span className="table__cell table__cell--span-3">Мини карта</span>
								<span className="table__cell table__cell--span-3">Тхумб</span>
								<span className="table__cell table__cell--centered"></span>
							</div>
							{ ceramicStylesList.map((style) => {
								return (
									<div
										key={ style.name }
										className="table__row"
									>
										<span className="table__cell table__cell--span-2">{ style.title }</span>
										<span className="table__cell table__cell--span-3">{ style.name }</span>
										<span className="table__cell table__cell--span-3">{ style.mapImage }</span>
										<span className="table__cell table__cell--span-3">{ style.thumbnail }</span>
										<div className="table__cell table__cell--centered">
											<button
												className="table__button table__button--edit"
												onClick={ () => handleSetCeramicStyleToEdit(style) }
											>
											</button>
										</div>
									</div>
								);
							}) }
						</div>
						<Modal
							showModal={ showModal }
							closeModal={ () => handleCloseModal() }
						>
							<CeramicStylesForm />
						</Modal>
						<button className="button" onClick={ () => createNewCeramicStyle({ ...defaultCeramicStyle }) }>
							Создать
						</button>
					</div>
				) }
		</>
	);
}
