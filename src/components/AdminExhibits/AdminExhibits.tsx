import './AdminExhibits.scss';

import { useEffect, useState } from 'react';

import type { Exhibit, Exhibits } from '../../types/exhibitType';

import { api } from '../../utils/api';

export default function AdminExhibits(): JSX.Element {
  const [exhibits, setExhibits] = useState<Exhibits>([]);

  useEffect(() => {
    const exhibitsList: Exhibits = [];
    api.getExhibits().then(response => {
      response.forEach((exhibit: any) => {
        const someExhibit: Exhibit = {
          ...exhibit,
          category: exhibit.category.title
        };
        exhibitsList.push(someExhibit);
      });
      setExhibits(exhibitsList);
    });
  }, []);

  return (
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
  );
}
