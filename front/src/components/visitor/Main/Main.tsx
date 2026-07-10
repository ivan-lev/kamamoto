import { Suspense } from 'react';
import { Outlet } from 'react-router';
import Preloader from '@/components/shared/Preloader/Preloader';
import './Main.scss';

export default function Main() {
	return (
		<main
			className="content"
		>
			<Suspense fallback={ <Preloader /> }>
				<Outlet />
			</Suspense>
		</main>
	);
};
