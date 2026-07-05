import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router';

import About from '@/components/visitor/About/About';
import Article from '@/components/visitor/Article/Article';
import Articles from '@/components/visitor/Articles/Articles';
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
import JapaneseExhibitions from '@/components/visitor/JapaneseExhibitions/JapaneseExhibitions';
import JapaneseSocieties from '@/components/visitor/JapaneseSocieties/JapaneseSocieties';
import Main from '@/components/visitor/Main/Main';
import Map from '@/components/visitor/Map/Map';
import NotFound from '@/components/visitor/NotFound/NotFound';
import ScrollToHash from '@/components/visitor/ScrollToHash/ScrollToHash';
import ScrollToTopButton from '@/components/visitor/ScrollToTop/ScrollToTop';
import ThanksLetters from '@/components/visitor/ThanksLetters/ThanksLetters';
import Useful from '@/components/visitor/Useful/Useful';
import { visitorStore } from '@/slices/visitor';
import { documents } from '@/variables/documents';
import { files } from '@/variables/files';

export default function VisitorView() {
	return (
		<Provider store={ visitorStore }>
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
					<Route path="about" element={ <About /> } />
					<Route path="assistants" element={ <Assistants /> } />
					<Route path="collection/" element={ <Collection /> } />
					<Route path="collection/:category/" element={ <Category /> } />
					<Route path="collection/:category/:exhibit" element={ <ExhibitView /> } />
					<Route path="contacts" element={ <Contacts /> } />
					<Route path="documents" element={ <Files title="Шаблоны документов" files={ documents } /> } />
					<Route path="downloads" element={ <Files title="Файлы для скачивания" files={ files } /> } />
					<Route path="exhibitions/" element={ <Exhibitions /> } />
					<Route path="exhibitions/:exhId" element={ <Exhibition /> } />
					<Route path="thanksletters" element={ <ThanksLetters /> } />
					<Route path="useful" element={ <Useful /> } />
					<Route path="dictionary" element={ <Dictionary /> } />
					<Route path="ceramic-styles" element={ <Articles /> } />
					<Route path="ceramic-styles/:style" element={ <Article /> } />
					<Route path="japanese-exhibitions" element={ <JapaneseExhibitions /> } />
					<Route path="japanese-societies" element={ <JapaneseSocieties /> } />
					<Route path="map" element={ <Map /> } />
				</Route>

				<Route path="*" element={ <NotFound /> } />
			</Routes>
		</Provider>
	);
}
