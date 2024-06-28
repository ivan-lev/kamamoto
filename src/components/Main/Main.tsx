import './Main.scss';

import { Routes, Route } from 'react-router-dom';

import HomePage from '../HomePage/HomePage';
import About from '../About/About';
import Collection from '../Collection/Collection';
import Category from '../Category/Category';
import Exhibit from '../Exhibit/Exhibit';
import Exhibitions from '../Exhibitions/Exhibitions';
import Contacts from '../Contacts/Contacts';
import Files from '../Files/Files';
import Documents from '../Documents/Documents';

export default function Main() {
  return (
    <main className="content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/collection/:category" element={<Category />} />
        <Route path="/collection/:category/:exhibit" element={<Exhibit />} />
        <Route path="/exhibitions" element={<Exhibitions />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/files" element={<Files />} />
        <Route path="/documents" element={<Documents />} />
      </Routes>
    </main>
  );
}
