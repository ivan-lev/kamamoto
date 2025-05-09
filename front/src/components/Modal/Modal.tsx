import type { ReactNode } from 'react';
import { motionSettings } from '@/variables/motion';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';

const { variants, transition } = motionSettings;

interface Props {
	showModal: boolean;
	closeModal: () => void;
	children: ReactNode;
}

export default function Modal({ showModal, closeModal, children }: Props) {
	function handleOpenModal() {
		document.body.style.overflow = 'hidden';
		document.addEventListener('keydown', closeModalOnEsc, false);
	}

	function handleCloseModal() {
		document.body.style.overflow = 'unset';
		closeModal();
		document.removeEventListener('keydown', closeModalOnEsc, false);
	}

	function closeModalOnEsc(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			handleCloseModal();
		}
	}

	useEffect(() => {
		showModal ? handleOpenModal() : handleCloseModal();
	}, [showModal]);

	return (
		<AnimatePresence>
			{ showModal && (
				<motion.div
					initial={variants.hidden}
					animate={variants.visible}
					exit={variants.hidden}
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
