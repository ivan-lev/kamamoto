// React and Redux
import { Helmet } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import adminStore from '../../slices/adminSlice.ts';

// Variables
import { documents } from '../../variables/documents';
import { files } from '../../variables/files';

import './App.scss';

// Components
import About from '../About/About';
import Admin from '../Admin/Admin';
import AdminCategories from '../AdminCategories/AdminCategories.tsx';
import AdminExhibitions from '../AdminExbitions/AdminExhibitions';
import AdminExhibits from '../AdminExhibits/AdminExhibits';
import AdminLetters from '../AdminLetters/AdminLetters.tsx';
import AdminPartners from '../AdminPartners/AdminPartners.tsx';
import AdminStatistics from '../AdminStatistics/AdminStatistics';
import Benefactors from '../Benefactors/Benefactors';
import Category from '../Category/Category';
import Collection from '../Collection/Collection';
import Contacts from '../Contacts/Contacts';
import Exhibit from '../Exhibit/Exhibit';
import Exhibition from '../Exhibition/Exhibition';
import Expos from '../Expos/Expos';
import Files from '../Files/Files';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import Login from '../Login/Login.tsx';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import ThanksLetters from '../ThanksLetters/ThanksLetters';

export default function App() {
	return (
		<>
			<Helmet>
				<title>Камамото - японская керамика</title>
				<meta property="og:title" content="Камамото - японская керамика" />
				<meta property="og:image" content="https://kamamoto.ru/images/og-image.jpg" />
			</Helmet>

			<Routes>
				<Route
					path="/"
					element={(
						<>
							<Header />
							<Main />
							<Footer />
						</>
					)}
				>
					<Route index element={<HomePage />} />
					<Route path="about/" element={<About />} />
					<Route path="collection/" element={<Collection />} />
					<Route path="collection/:category/" element={<Category />} />
					<Route path="collection/:category/:exhibit" element={<Exhibit />} />
					<Route path="expos/" element={<Expos />} />
					<Route path="expos/:exhId" element={<Exhibition />} />
					<Route path="contacts/" element={<Contacts />} />
					<Route path="downloads/" element={<Files title="Файлы для скачивания" files={files} />} />
					<Route
						path="documents/"
						element={<Files title="Шаблоны документов" files={documents} />}
					/>
					<Route path="thanksletters/" element={<ThanksLetters />} />
					<Route path="benefactors/" element={<Benefactors />} />
				</Route>

				<Route
					path="login/"
					element={(
						<Provider store={adminStore}>
							<Login />
						</Provider>
					)}
				/>
				<Route
					path="admin/"
					element={(
						<Provider store={adminStore}>
							<Admin />
						</Provider>
					)}
				>
					<Route index element={<AdminStatistics />} />
					<Route path="exhibits/" element={<AdminExhibits />} />
					<Route path="exhibitions/" element={<AdminExhibitions />} />
					<Route path="partners/" element={<AdminPartners />} />
					<Route path="categories/" element={<AdminCategories />} />
					<Route path="letters/" element={<AdminLetters />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}
