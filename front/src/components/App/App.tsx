import About from '@/components/About/About';
import Admin from '@/components/admin/Admin/Admin';
import AdminCategories from '@/components/admin/Categories/Categories';
import AdminCeramicStyles from '@/components/admin/CeramicStyles/CeramicStyles';
import AdminExhibitions from '@/components/admin/Exbitions/Exhibitions';
import AdminExhibits from '@/components/admin/Exhibits/Exhibits';
import AdminLetters from '@/components/admin/Letters/Letters';
import AdminPartners from '@/components/admin/Partners/Partners';
import AdminStatistics from '@/components/admin/Statistics/Statistics';
import Benefactors from '@/components/Benefactors/Benefactors';
import Category from '@/components/Category/Category';
import Collection from '@/components/Collection/Collection';
import Contacts from '@/components/Contacts/Contacts';
import Exhibition from '@/components/Exhibition/Exhibition';
import Exhibitions from '@/components/Exhibitions/Exhibitions';
import ExhibitView from '@/components/ExhibitView/ExhibitView';
import Files from '@/components/Files/Files';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import HomePage from '@/components/HomePage/HomePage';
import Login from '@/components/Login/Login';
import Main from '@/components/Main/Main';
import NotFound from '@/components/NotFound/NotFound';
import Seo from '@/components/Seo/Seo';
import ThanksLetters from '@/components/ThanksLetters/ThanksLetters';
import adminStore from '@/slices/admin';
import { documents } from '@/variables/documents';
import { files } from '@/variables/files';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.scss';

export default function App() {
	return (
		<>
			<Seo title="Камамото - японская керамика"></Seo>

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
					<Route path="collection/:category/:exhibit" element={<ExhibitView />} />
					<Route path="exhibitions/" element={<Exhibitions />} />
					<Route path="exhibitions/:exhId" element={<Exhibition />} />
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
