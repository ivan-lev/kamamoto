import type { Incense } from '@/variables/incences.types';
import { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router';
import DisplayGrid from '@/components/DisplayGrid/DisplayGrid';
import Filters from '@/components/Filters/Filters';
import Footer from '@/components/Footer/Footer';
import Article from '@/components/Incense/Article';
import Logo from '@/components/Logo/Logo';

import './App.scss';

export default function YuDing() {
	const [incencesListToDisplay, setIncencesListToDisplay] = useState<Incense[]>([]);

	return (
		<>
			<Logo />

			<Routes>
				<Route path="/" element={ <Outlet /> }>

					<Route
						index
						element={ (
							<>
								<Filters setIncencesListToDisplay={ setIncencesListToDisplay } />
								<section className="section">
									<DisplayGrid cards={ incencesListToDisplay } />
								</section>
							</>
						) }
					/>
					<Route path=":manufacturerParam/:incenseParam/" element={ <Article /> } />
				</Route>
			</Routes>

			<Footer />
		</>
	);
}
