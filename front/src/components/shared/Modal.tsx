import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect } from 'react';
import { motionSettings } from '@/variables/motion';

const { variants, transitions } = motionSettings;

interface Props {
	showModal: boolean;
	closeModal: () => void;
	children: ReactNode;
}

export default function Modal({ showModal, closeModal, children }: Props) {
	const handleCloseModal = useCallback(() => {
		document.body.style.overflow = 'unset';
		closeModal();
	}, [closeModal]);

	useEffect(() => {
		if (!showModal) {
			handleCloseModal();
			return;
		}

		document.body.style.overflow = 'hidden';

		function closeModalOnEsc(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				handleCloseModal();
			}
		}

		document.addEventListener('keydown', closeModalOnEsc, false);
		return () => document.removeEventListener('keydown', closeModalOnEsc, false);
	}, [showModal, handleCloseModal]);

	return (
		<AnimatePresence>
			{ showModal && (
				<motion.div
					initial={ variants.hidden }
					animate={ variants.visible }
					exit={ variants.hidden }
					transition={ transitions.common }
					key="modal"
					className="modal"
				>
					<div className="modal__backdrop" onClick={ handleCloseModal }></div>

					<div className="modal__content">
						{ children }
						<button className="button" onClick={ handleCloseModal }>Закрыть окно</button>
					</div>
				</motion.div>
			) }
		</AnimatePresence>
	);
}
