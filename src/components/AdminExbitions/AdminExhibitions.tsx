import './AdminExhibitions.scss';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import type { Exhibition, Exhibitions } from '../../types/exhibitionType';

import { api } from '../../utils/api';

export default function AdminExhibitions(): JSX.Element {
  const emptyExhibition: Exhibition = {
    id: 0,
    year: 0,
    dates: '',
    city: '',
    address: '',
    place: '',
    name: '',
    link: '',
    description: '',
    photosCount: 0,
    poster: false,
    curators: '',
    organisators: '',
    isActive: false
  };

  const [exhibitions, setExhibitions] = useState<Exhibitions>([]);
  const [exhibitionToCreate, setExhibitionToCreate] = useState<Exhibition>(emptyExhibition);

  const {
    id,
    year,
    dates,
    city,
    address,
    place,
    name,
    link,
    description,
    photosCount,
    poster,
    curators,
    organisators,
    isActive
  } = exhibitionToCreate;

  useEffect(() => {
    api.getExhibitions().then(exhibitions => setExhibitions(exhibitions));
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setExhibitionToCreate({ ...exhibitionToCreate, [name]: value });
  };

  const handleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    console.log('name:', name);
    console.log('value', checked);
    setExhibitionToCreate({ ...exhibitionToCreate, [name]: checked });
  };

  const handleCreateExhibition = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    api
      .createExhibition({
        id: Number(id),
        year: Number(year),
        dates,
        city,
        address,
        place,
        name,
        link,
        description,
        photosCount: Number(photosCount),
        poster,
        curators,
        organisators,
        isActive
      })
      .then(response => setExhibitions([...exhibitions, response]))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <div className="admin-exhibition__list">
        <span>ID</span>
        <span>Название</span>
        <span>Город</span>
        <span>Год</span>
        <span>Акт-сть</span>
      </div>
      {exhibitions.map(exhibition => {
        return (
          <div className="admin-exhibition__list">
            <span>{exhibition.id}</span>
            <span>{exhibition.name}</span>
            <span>{exhibition.city}</span>
            <span>{exhibition.year}</span>
            <span>{exhibition.isActive ? 'Да' : 'Нет'}</span>
          </div>
        );
      })}
      <form onSubmit={handleCreateExhibition}>
        <span>id: </span>
        <input type="text" name="id" placeholder="id" value={id} onChange={handleChange} />
        <span>год: </span>
        <input type="text" name="year" placeholder="год" value={year} onChange={handleChange} />
        <span>дата: </span>
        <input type="text" name="dates" placeholder="дата" value={dates} onChange={handleChange} />
        <span>город: </span>
        <input type="text" name="city" placeholder="город" value={city} onChange={handleChange} />
        <span>адрес: </span>
        <input
          type="text"
          name="address"
          placeholder="адрес"
          value={address}
          onChange={handleChange}
        />
        <span>место: </span>
        <input
          type="text"
          name="place"
          placeholder="название галереи"
          value={place}
          onChange={handleChange}
        />
        <span>название: </span>
        <input
          type="text"
          name="name"
          placeholder="название выставки"
          value={name}
          onChange={handleChange}
        />
        <span>ссылка: </span>
        <input type="text" name="link" placeholder="ссылка" value={link} onChange={handleChange} />
        <span>описание: </span>
        <input
          type="text"
          name="description"
          placeholder="описание"
          value={description}
          onChange={handleChange}
        />
        <span>кол-во фото: </span>
        <input
          type="text"
          name="photosCount"
          placeholder="кол-во фотографий"
          value={photosCount}
          onChange={handleChange}
        />
        <span>есть постер: </span>
        <input type="checkbox" name="poster" placeholder="постеры" onChange={handleCheckBox} />
        <span>кураторы: </span>
        <input
          type="text"
          name="curators"
          placeholder="кураторы"
          value={curators}
          onChange={handleChange}
        />
        <span>организаторы: </span>
        <input
          type="text"
          name="organisators"
          placeholder="организаторы"
          value={organisators}
          onChange={handleChange}
        />
        <span>активность: </span>
        <input type="checkbox" name="isActive" placeholder="активность" onChange={handleCheckBox} />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}
