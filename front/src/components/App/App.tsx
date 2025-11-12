import { useState } from 'react';
import { Provider } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import About from '@/components/About/About';
import Admin from '@/components/admin/Admin/Admin';
import AdminCategories from '@/components/admin/Categories/Categories';
import AdminCeramicStyles from '@/components/admin/CeramicStyles/CeramicStyles';
import Complectation from '@/components/admin/Complectation/Complectation';
import AdminExhibitions from '@/components/admin/Exbitions/Exhibitions';
import ExhibitsList from '@/components/admin/ExhibitsList/ExhibitsList';
import Filters from '@/components/admin/Filters/Filters';
import AdminLetters from '@/components/admin/Letters/Letters';
import AdminPartners from '@/components/admin/Partners/Partners';
import Potters from '@/components/admin/Potters/Potters';
import AdminStatistics from '@/components/admin/Statistics/Statistics';
import Assistants from '@/components/Assistants/Assistants';
import Category from '@/components/Category/Category';
import Collection from '@/components/Collection/Collection';
import Contacts from '@/components/Contacts/Contacts';
import Exhibition from '@/components/Exhibition/Exhibition';
import Exhibitions from '@/components/Exhibitions/Exhibitions';
import ExhibitView from '@/components/ExhibitView/ExhibitView';
import Files from '@/components/Files/Files';
import Footer from '@/components/Footer/Footer';
import Glossary from '@/components/Glossary/Glossary';
import Header from '@/components/Header/Header';
import HomePage from '@/components/HomePage/HomePage';
import Login from '@/components/Login/Login';
import Main from '@/components/Main/Main';
import NotFound from '@/components/NotFound/NotFound';
import OpeningScreen from '@/components/OpeningScreen/OpeningScreen';
import ScrollToHash from '@/components/ScrollToHash/ScrollToHash';
import ScrollToTopButton from '@/components/ScrollToTop/ScrollToTop';
import ThanksLetters from '@/components/ThanksLetters/ThanksLetters';
import Useful from '@/components/Useful/Useful';
import adminStore from '@/slices/admin';
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
						<>
							<Header />
							<Main />
							<Footer />
							<ScrollToTopButton />
							<ScrollToHash />
						</>
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
					<Route path="useful/glossary" element={ <Glossary /> } />
					<Route path="useful/" element={ <Useful /> } />
					<Route path="404" element={ <NotFound /> } />
					<Route path="*" element={ <Navigate to="/404" replace /> } />
				</Route>

				<Route
					path="login/"
					element={ (
						<Provider store={ adminStore }>
							<Login />
						</Provider>
					) }
				/>
				<Route
					path="admin/"
					element={ (
						<Provider store={ adminStore }>
							<Admin />
						</Provider>
					) }
				>
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
			</Routes>
		</>
	);
}
