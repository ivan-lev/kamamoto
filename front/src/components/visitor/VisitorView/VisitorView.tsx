import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router';

import Preloader from '@/components/shared/Preloader/Preloader';
import Footer from '@/components/visitor/Footer/Footer';
import Header from '@/components/visitor/Header/Header';
import Main from '@/components/visitor/Main/Main';
import ScrollToHash from '@/components/visitor/ScrollToHash/ScrollToHash';
import ScrollToTopButton from '@/components/visitor/ScrollToTop/ScrollToTop';
import { visitorStore } from '@/slices/visitor';
import { documents } from '@/variables/documents';
import { files } from '@/variables/files';

const About = lazy(() => import('@/components/visitor/About/About'));
const Articles = lazy(() => import('@/components/visitor/Articles/Articles'));
const Assistants = lazy(() => import('@/components/visitor/Assistants/Assistants'));
const Category = lazy(() => import('@/components/visitor/Category/Category'));
const CeramicStyle = lazy(() => import('@/components/visitor/CeramicStyle/CeramicStyle'));
const Collection = lazy(() => import('@/components/visitor/Collection/Collection'));
const Contacts = lazy(() => import('@/components/visitor/Contacts/Contacts'));
const Dictionary = lazy(() => import('@/components/visitor/Dictionary/Dictionary'));
const Exhibition = lazy(() => import('@/components/visitor/Exhibition/Exhibition'));
const Exhibitions = lazy(() => import('@/components/visitor/Exhibitions/Exhibitions'));
const ExhibitView = lazy(() => import('@/components/visitor/ExhibitView/ExhibitView'));
const Files = lazy(() => import('@/components/visitor/Files/Files'));
const HomePage = lazy(() => import('@/components/visitor/HomePage/HomePage'));
const JapaneseExhibitions = lazy(() => import('@/components/visitor/JapaneseExhibitions/JapaneseExhibitions'));
const JapaneseSocieties = lazy(() => import('@/components/visitor/JapaneseSocieties/JapaneseSocieties'));
const LNTPotter = lazy(() => import('@/components/visitor/LNTPotter/LNTPotter'));
const LNTPotters = lazy(() => import('@/components/visitor/LNTPotters/LNTPotters'));
const Map = lazy(() => import('@/components/visitor/Map/Map'));
const NotFound = lazy(() => import('@/components/visitor/NotFound/NotFound'));
const ThanksLetters = lazy(() => import('@/components/visitor/ThanksLetters/ThanksLetters'));
const Useful = lazy(() => import('@/components/visitor/Useful/Useful'));

export default function VisitorView() {
	return (
		<Provider store={ visitorStore }>
			<Suspense fallback={ <Preloader /> }>
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
						<Route path="ceramic-styles/:style" element={ <CeramicStyle /> } />
						<Route path="japanese-exhibitions" element={ <JapaneseExhibitions /> } />
						<Route path="japanese-societies" element={ <JapaneseSocieties /> } />
						<Route path="map" element={ <Map /> } />
						<Route path="lnt-potters" element={ <LNTPotters /> } />
						<Route path="lnt-potters/:potter" element={ <LNTPotter /> } />
					</Route>

					<Route path="*" element={ <NotFound /> } />
				</Routes>
			</Suspense>
		</Provider>
	);
}
