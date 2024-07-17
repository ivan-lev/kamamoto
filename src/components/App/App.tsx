import './App.scss';

// React
import { Routes, Route } from 'react-router-dom';

import { HelmetProvider, Helmet } from 'react-helmet-async';

// Variables
import { documents } from '../../variables/documents';
import { files } from '../../variables/files';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import HomePage from '../HomePage/HomePage';
import About from '../About/About';
import Collection from '../Collection/Collection';
import Category from '../Category/Category';
import Exhibit from '../Exhibit/Exhibit';
import Expos from '../Expos/Expos';
import Exhibition from '../Exhibition/Exhibition';
import Contacts from '../Contacts/Contacts';
import Files from '../Files/Files';
import NotFound from '../NotFound/NotFound';

export default function App() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{`Камамото - японская керамика`}</title>
          <meta property="og:title" content={`Камамото - японская керамика`} />
          <meta property="og:image" content={`https://kamamoto.ru/images/og-image.jpg`} />
        </Helmet>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<HomePage />} />
            <Route path="about/" element={<About />} />
            <Route path="collection/" element={<Collection />} />
            <Route path="collection/:category/" element={<Category />} />
            <Route path="collection/:category/:exhibit" element={<Exhibit />} />
            <Route path="expos/" element={<Expos />} />
            <Route path="expos/:exhibition" element={<Exhibition />} />
            <Route path="contacts/" element={<Contacts />} />
            <Route
              path="downloads/"
              element={<Files title="Файлы для скачивания" files={files} />}
            />
            <Route
              path="documents/"
              element={<Files title="Шаблоны документов" files={documents} />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </HelmetProvider>
    </>
  );
}
