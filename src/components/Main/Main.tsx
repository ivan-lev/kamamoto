import './Main.scss';

import { Routes, Route } from 'react-router-dom';

import HomePage from '../HomePage/HomePage';
import About from '../About/About';
import Collection from '../Collection/Collection';
import Exhibitions from '../Exhibitions/Exhibitions';
import Contacts from '../Contacts/Contacts';

import 'react-image-gallery/styles/scss/image-gallery.scss';

export default function Main() {
  return (
    <main className="content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/exhibitions" element={<Exhibitions />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </main>
  );
}
