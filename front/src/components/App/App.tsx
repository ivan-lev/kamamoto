import { lazy, Suspense, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router';

import Preloader from '@/components/shared/Preloader/Preloader';
import OpeningScreen from '@/components/visitor/OpeningScreen/OpeningScreen';
import VisitorView from '@/components/visitor/VisitorView/VisitorView';
import './App.scss';

const AdminView = lazy(() => import('@/components/admin/AdminView/AdminView'));

export default function App() {
	const [isFirstRender, setIsFirstRender] = useState(true);
	const isHomePage = useLocation().pathname === '/';

	return (
		<>
			{ isFirstRender && isHomePage && <OpeningScreen setIsFirstRender={ setIsFirstRender } /> }

			<Routes>
				<Route
					path="/admin/*"
					element={ (
						<Suspense fallback={ <Preloader /> }>
							<AdminView />
						</Suspense>
					) }
				/>

				<Route path="/*" element={ <VisitorView /> } />
			</Routes>
		</>
	);
}
