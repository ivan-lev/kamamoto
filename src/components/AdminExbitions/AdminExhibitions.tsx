import './AdminExhibitions.scss';

import { useEffect, useState } from 'react';

import type { Exhibitions } from '../../types/exhibitionType';

import { api } from '../../utils/api';

export default function AdminExhibitions(): JSX.Element {
  const [exhibitions, setExhibitions] = useState<Exhibitions>([]);

  useEffect(() => {
    api.getExhibitions().then(exhibitions => setExhibitions(exhibitions));
  }, []);

  return (
    <div>
      <div className="admin-exhibition__list">
        <span>ID</span>
        <span>Название</span>
        <span>Город</span>
        <span>Место</span>
        <span>Год</span>
      </div>
      {exhibitions.map(exhibition => {
        return (
          <div className="admin-exhibition__list">
            <span>{exhibition.id}</span>
            <span>{exhibition.name}</span>
            <span>{exhibition.city}</span>
            <span>{exhibition.place}</span>
            <span>{exhibition.year}</span>
          </div>
        );
      })}
    </div>
  );
}
