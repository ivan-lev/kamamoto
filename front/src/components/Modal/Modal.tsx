import { useEffect, useRef } from 'react';

interface ModalInterface {
	showModal: boolean;
	closeModal: any;
	content: any;
}

export default function Modal({ showModal, closeModal, content }: ModalInterface) {
	const dialogRef = useRef<HTMLDivElement>(null);

	function handleCloseModal() {
		document.body.style.overflow = 'unset';
		closeModal();
	}

	function handleCloseModalOnEsc(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			handleCloseModal();
		}
	}

	function handleOpenModal() {
		document.body.style.overflow = 'hidden';
	}

	useEffect(() => {
		showModal ? handleOpenModal() : handleCloseModal();
		showModal
			? document.addEventListener('keydown', handleCloseModalOnEsc, false)
			: document.removeEventListener('keydown', handleCloseModalOnEsc, false);
	}, [showModal]);

	return (
		showModal
		&& (
			<>
				<div className="modal" ref={dialogRef}>
					<div className="modal__backdrop" onClick={handleCloseModal}></div>
					<div className="modal__content">
						{ content }

						<button className="button" onClick={handleCloseModal}>Закрыть окно</button>
					</div>
				</div>
			</>
		)
	);
}
