import './App.scss';

// React
import { Routes, Route } from 'react-router-dom';

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
import Exhibitions from '../Exhibitions/Exhibitions';
import Contacts from '../Contacts/Contacts';
import Files from '../Files/Files';
// import Documents from '../Documents/Documents';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="collection" element={<Collection />} />
          <Route path="collection/:category" element={<Category />} />
          <Route path="collection/:category/:exhibit" element={<Exhibit />} />
          <Route path="exhibitions" element={<Exhibitions />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="downloads" element={<Files title="Файлы для скачивания" files={files} />} />
          <Route
            path="documents"
            element={<Files title="Шаблоны документов" files={documents} />}
          />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}
