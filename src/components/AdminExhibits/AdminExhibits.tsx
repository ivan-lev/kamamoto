// Types
import type { Exhibit, Exhibits } from '../../types/exhibitType';

// React
import { useEffect, useState } from 'react';

// Components
import Preloader from '../Preloader/Preloader';
import Seo from '../Seo/Seo';

// Utils
import { api } from '../../utils/api';

import './AdminExhibits.scss';

export default function AdminExhibits(): JSX.Element {
  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  const [exhibits, setExhibits] = useState<Exhibits>([]);

  useEffect(() => {
    const exhibitsList: Exhibits = [];
    const token = localStorage.getItem('kmmttkn');
    if (token) {
      api
        .getExhibits()
        .then((response) => {
          response.forEach((exhibit: any) => {
            const someExhibit: Exhibit = {
              ...exhibit,
              category: exhibit.category.title,
            };
            exhibitsList.push(someExhibit);
          });
          setExhibits(exhibitsList);
          setShowPreloader(false);
        })
        .catch(error => console.error(error));
    }
  }, []);

  return (
    <>
      <Seo title="Камамото: лоты" />

      {showPreloader
        ? (
            <Preloader />
          )
        : (
            <div className="container">
              <div className="admin-exhibit__list">
                <span>ID</span>
                <span>Название</span>
                <span>Категория</span>
                <span>Стиль</span>
              </div>
              {exhibits.map(exhibit => (
                <div className="admin-exhibit__list" key={exhibit.id}>
                  <span>{exhibit.id}</span>
                  <span>{exhibit.name}</span>
                  <span>{exhibit.category}</span>
                  <span>{exhibit.style}</span>
                </div>
              ))}
            </div>
          )}
    </>
  );
}
