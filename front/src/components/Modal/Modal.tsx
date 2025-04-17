import type { ReactNode } from 'react';
import { motionSettings } from '@/variables/motion';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';

const { states, transition } = motionSettings;

interface ModalInterface {
	showModal: boolean;
	closeModal: any;
	children: ReactNode;
}

export default function Modal({ showModal, closeModal, children }: ModalInterface) {
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
		<AnimatePresence>
			{ showModal && (
				<motion.div
					initial={states.hidden}
					animate={states.visible}
					exit={states.hidden}
					transition={transition}
					key="modal"
					className="modal"
				>
					<div className="modal__backdrop" onClick={handleCloseModal}></div>
					<div className="modal__content">
						{ children }

						<button className="button" onClick={handleCloseModal}>Закрыть окно</button>
					</div>

				</motion.div>
			)}

		</AnimatePresence>
	);
}
