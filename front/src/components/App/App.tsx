import About from '@/components/About/About';
import Admin from '@/components/Admin/Admin';
import AdminCategories from '@/components/AdminCategories/AdminCategories';
import AdminCeramicStyles from '@/components/AdminCeramicStyles/AdminCeramicStyles';
import AdminExhibitions from '@/components/AdminExbitions/AdminExhibitions';
import AdminExhibits from '@/components/AdminExhibits/AdminExhibits';
import AdminLetters from '@/components/AdminLetters/AdminLetters';
import AdminPartners from '@/components/AdminPartners/AdminPartners';
import AdminStatistics from '@/components/AdminStatistics/AdminStatistics';
import Benefactors from '@/components/Benefactors/Benefactors';
import Category from '@/components/Category/Category';
import Collection from '@/components/Collection/Collection';
import Contacts from '@/components/Contacts/Contacts';
import Exhibit from '@/components/Exhibit/Exhibit';
import Exhibition from '@/components/Exhibition/Exhibition';
import Expos from '@/components/Expos/Expos';
import Files from '@/components/Files/Files';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import HomePage from '@/components/HomePage/HomePage';
import Login from '@/components/Login/Login';
import Main from '@/components/Main/Main';
import NotFound from '@/components/NotFound/NotFound';
import ThanksLetters from '@/components/ThanksLetters/ThanksLetters';
import adminStore from '@/slices/admin';
import { documents } from '@/variables/documents';
import { files } from '@/variables/files';
import { Helmet } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.scss';

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
					<Route path="ceramic-styles/" element={<AdminCeramicStyles />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}
