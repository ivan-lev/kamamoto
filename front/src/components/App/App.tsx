import { useState } from 'react';
import { Provider } from 'react-redux';
import { Outlet, Route, Routes, useLocation } from 'react-router';

import Admin from '@/components/admin/Admin/Admin';
import AdminCategories from '@/components/admin/Categories/Categories';
import AdminCeramicStyles from '@/components/admin/CeramicStyles/CeramicStyles';
import Complectation from '@/components/admin/Complectation/Complectation';
import AdminExhibitions from '@/components/admin/Exbitions/Exhibitions';
import ExhibitsList from '@/components/admin/ExhibitsList/ExhibitsList';
import Filters from '@/components/admin/Filters/Filters';
import AdminLetters from '@/components/admin/Letters/Letters';
import Login from '@/components/admin/Login/Login';
import AdminPartners from '@/components/admin/Partners/Partners';
import Potters from '@/components/admin/Potters/Potters';
import AdminStatistics from '@/components/admin/Statistics/Statistics';
import About from '@/components/visitor/About/About';
import Article from '@/components/visitor/Article/Article';
import Assistants from '@/components/visitor/Assistants/Assistants';
import Category from '@/components/visitor/Category/Category';
import Collection from '@/components/visitor/Collection/Collection';
import Contacts from '@/components/visitor/Contacts/Contacts';
import Dictionary from '@/components/visitor/Dictionary/Dictionary';
import Exhibition from '@/components/visitor/Exhibition/Exhibition';
import Exhibitions from '@/components/visitor/Exhibitions/Exhibitions';
import ExhibitView from '@/components/visitor/ExhibitView/ExhibitView';
import Files from '@/components/visitor/Files/Files';
import Footer from '@/components/visitor/Footer/Footer';
import Header from '@/components/visitor/Header/Header';
import HomePage from '@/components/visitor/HomePage/HomePage';
import Main from '@/components/visitor/Main/Main';
import NotFound from '@/components/visitor/NotFound/NotFound';
import OpeningScreen from '@/components/visitor/OpeningScreen/OpeningScreen';
import ScrollToHash from '@/components/visitor/ScrollToHash/ScrollToHash';
import ScrollToTopButton from '@/components/visitor/ScrollToTop/ScrollToTop';
import ThanksLetters from '@/components/visitor/ThanksLetters/ThanksLetters';
import Useful from '@/components/visitor/Useful/Useful';
import { adminStore } from '@/slices/admin';
import { visitorStore } from '@/slices/visitor';
import { documents } from '@/variables/documents';
import { files } from '@/variables/files';
import './App.scss';

export default function App() {
	const [isFirstRender, setIsFirstRender] = useState(true);
	const isRootLocation = useLocation().pathname === '/';

	return (
		<>
			{ isFirstRender && isRootLocation && <OpeningScreen setIsFirstRender={ setIsFirstRender } /> }

			<Routes>
				<Route
					path="/"
					element={ (
						<Provider store={ visitorStore }>
							<Header />
							<Main />
							<Footer />
							<ScrollToTopButton />
							<ScrollToHash />
						</Provider>
					) }
				>
					<Route index element={ <HomePage /> } />
					<Route path="about/" element={ <About /> } />
					<Route path="assistants/" element={ <Assistants /> } />
					<Route path="collection/" element={ <Collection /> } />
					<Route path="collection/:category/" element={ <Category /> } />
					<Route path="collection/:category/:exhibit" element={ <ExhibitView /> } />
					<Route path="contacts/" element={ <Contacts /> } />
					<Route path="documents/" element={ <Files title="Шаблоны документов" files={ documents } /> } />
					<Route path="downloads/" element={ <Files title="Файлы для скачивания" files={ files } /> } />
					<Route path="exhibitions/" element={ <Exhibitions /> } />
					<Route path="exhibitions/:exhId" element={ <Exhibition /> } />
					<Route path="thanksletters/" element={ <ThanksLetters /> } />
					<Route path="useful/" element={ <Useful /> } />
					<Route path="useful/dictionary" element={ <Dictionary /> } />
					<Route path="useful/ceramic-styles" element={ <Article /> } />
				</Route>

				<Route
					path="/"
					element={ (
						<Provider store={ adminStore }>
							<Outlet />
						</Provider>
					) }
				>
					<Route path="login/" element={ <Login /> } />
					<Route path="admin/" element={ <Admin /> }>
						<Route index element={ <AdminStatistics /> } />
						<Route
							path="exhibits/"
							element={ (
								<>
									<Filters />
									<ExhibitsList />
								</>
							) }
						/>
						<Route path="exhibitions/" element={ <AdminExhibitions /> } />
						<Route path="partners/" element={ <AdminPartners /> } />
						<Route path="categories/" element={ <AdminCategories /> } />
						<Route path="letters/" element={ <AdminLetters /> } />
						<Route path="ceramic-styles/" element={ <AdminCeramicStyles /> } />
						<Route path="complectation/" element={ <Complectation /> } />
						<Route path="potters/" element={ <Potters /> } />
					</Route>
				</Route>

				<Route path="*" element={ <NotFound /> } />
			</Routes>

		</>
	);
}
