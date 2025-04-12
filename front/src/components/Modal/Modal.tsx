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

	function handleOpenModal() {
		document.body.style.overflow = 'hidden';
	}

	useEffect(() => {
		if (showModal ) {
			handleOpenModal();
		}

		if (!showModal) {
			handleCloseModal();
		}
	}, [showModal]);

	return (
		showModal &&
		<>
		<div className="modal" ref={dialogRef}>
			<div className='modal__backdrop' onClick={handleCloseModal}></div>
			<div className='modal__content'>
				{ content }
			</div>
			<button onClick={handleCloseModal}>Спрятать диалог</button>
		</div></>
	);
}
