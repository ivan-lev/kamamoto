import './Main.scss';

import { Routes, Route } from 'react-router-dom';

import HomePage from '../HomePage/HomePage';
import Contacts from '../Contacts/Contacts';

import 'react-image-gallery/styles/scss/image-gallery.scss';

export default function Main() {
  return (
    <main className="content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </main>
  );
}
