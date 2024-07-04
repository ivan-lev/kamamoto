import './App.scss';

// React
import { Routes, Route } from 'react-router-dom';

//Redux
import { useDispatch } from 'react-redux';
import { setCategory } from '../../slices/categorySlice';
import { setExhibit } from '../../slices/exhibitSlice';

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
import Documents from '../Documents/Documents';

export default function App() {
  const dispatch = useDispatch();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="collection" element={<Collection />} />
          <Route
            path="collection/:category"
            element={<Category />}
            action={category => dispatch(setCategory(category))}
          />
          <Route
            path="collection/:category/:exhibit"
            element={<Exhibit />}
            action={exhibit => dispatch(setExhibit(exhibit))}
          />

          <Route path="exhibitions" element={<Exhibitions />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="files" element={<Files />} />
          <Route path="documents" element={<Documents />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}
