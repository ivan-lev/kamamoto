import { motion } from 'motion/react';
import { Outlet, useLocation } from 'react-router-dom';
import './Main.scss';

export default function Main() {
	const pathname = useLocation().pathname;

	const pageVariants = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
	};

	const pageTransition = {
		duration: 0.8,
	};

	return (
		<motion.main
			className="content"
			key={ pathname }
			initial="initial"
			animate="animate"
			variants={ pageVariants }
			transition={ pageTransition }
		>
			<Outlet />
		</motion.main>
	);
};
