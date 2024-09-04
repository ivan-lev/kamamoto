import './App.scss';

// React
import { Routes, Route } from 'react-router-dom';

// Other packages
import { Helmet } from 'react-helmet-async';

// Variables
import { documents } from '../../variables/documents';
import { files } from '../../variables/files';

import { Provider } from 'react-redux';
import adminStore from '../../slices/adminSlice.ts';

// Components
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
import ThanksLetters from '../ThanksLetters/ThanksLetters';
import NotFound from '../NotFound/NotFound';
import Benefactors from '../Benefactors/Benefactors';

import Login from '../Login/Login.tsx';
import Admin from '../Admin/Admin';
import AdminStatistics from '../AdminStatistics/AdminStatistics';
import AdminExhibits from '../AdminExhibits/AdminExhibits';
import AdminExhibitions from '../AdminExbitions/AdminExhibitions';
import AdminPartners from '../AdminPartners/AdminPartners.tsx';
import AdminCategories from '../AdminCategories/AdminCategories.tsx';

export default function App() {
  return (
    <>
      <Helmet>
        <title>{`Камамото - японская керамика`}</title>
        <meta property="og:title" content={`Камамото - японская керамика`} />
        <meta property="og:image" content={`https://kamamoto.ru/images/og-image.jpg`} />
      </Helmet>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Main />
              <Footer />
            </>
          }
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
          element={
            <Provider store={adminStore}>
              <Login />
            </Provider>
          }
        />
        <Route
          path="admin/"
          element={
            <Provider store={adminStore}>
              <Admin />
            </Provider>
          }
        >
          <Route index element={<AdminStatistics />} />
          <Route path="exhibits/" element={<AdminExhibits />} />
          <Route path="exhibitions/" element={<AdminExhibitions />} />
          <Route path="partners/" element={<AdminPartners />} />
          <Route path="categories/" element={<AdminCategories />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
