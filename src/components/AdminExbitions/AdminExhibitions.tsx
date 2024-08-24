import './AdminExhibitions.scss';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import type { Exhibition, Exhibitions } from '../../types/exhibitionType';

import { api } from '../../utils/api';

export default function AdminExhibitions(): JSX.Element {
  const emptyExhibition: Exhibition = {
    id: 0,
    year: 2024,
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
    api.getExhibitions().then(exhibitions => {
      setExhibitions(exhibitions);
      setExhibitionToCreate({ ...exhibitionToCreate, id: exhibitions.length + 1 });
    });
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setExhibitionToCreate({ ...exhibitionToCreate, [name]: value });
  };

  const handleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
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
      .then(response => {
        setExhibitions([...exhibitions, response]);
        setExhibitionToCreate({ ...emptyExhibition, id: exhibitionToCreate.id + 1 });
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="container admin-exhibition">
      <div className="admin-exhibition__list">
        <div className="admin-exhibition__row">
          <span>ID</span>
          <span>Название</span>
          <span>Город</span>
          <span>Год</span>
          <span>Акт-сть</span>
        </div>
        {exhibitions.map(exhibition => {
          return (
            <div key={exhibition.id} className="admin-exhibition__row">
              <span>{exhibition.id}</span>
              <span>{exhibition.name}</span>
              <span>{exhibition.city}</span>
              <span>{exhibition.year}</span>
              <span>{exhibition.isActive ? 'Да' : 'Нет'}</span>
            </div>
          );
        })}
      </div>
      <form
        className="background-muted bordered admin-exhibition__form"
        onSubmit={handleCreateExhibition}
      >
        <fieldset className="admin-exhibition__fieldset">
          <legend className="admin-exhibition__field-legend">Добавить выставку</legend>

          <div className="admin-exhibition__fields-row">
            <div className="admin-exhibition__field admin-exhibition__field-id">
              <span>номер</span>
              <input
                className="background-muted bordered input"
                type="text"
                name="id"
                placeholder="id"
                value={id}
                onChange={handleChange}
              />
            </div>

            <div className="admin-exhibition__field admin-exhibition__field-year">
              <span>год</span>
              <input
                className="background-muted bordered input"
                type="text"
                name="year"
                placeholder="год"
                value={year}
                onChange={handleChange}
              />
            </div>

            <div className="admin-exhibition__field admin-exhibition__field-date">
              <span>даты</span>
              <input
                className="background-muted bordered input"
                type="text"
                name="dates"
                placeholder="даты"
                value={dates}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="admin-exhibition__fields-row">
            <div className="admin-exhibition__field admin-exhibition__field-name">
              <span>название</span>
              <input
                className="background-muted bordered input"
                type="text"
                name="name"
                placeholder="название выставки"
                value={name}
                onChange={handleChange}
              />
            </div>

            <div className="admin-exhibition__field admin-exhibition__field-city">
              <span>город</span>
              <input
                className="background-muted bordered input"
                type="text"
                name="city"
                placeholder="город"
                value={city}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="admin-exhibition__fields-row">
            <div className="admin-exhibition__field admin-exhibition__field-address">
              <span>адрес</span>
              <input
                className="background-muted bordered input"
                type="text"
                name="address"
                placeholder="адрес"
                value={address}
                onChange={handleChange}
              />
            </div>

            <div className="admin-exhibition__field admin-exhibition__field-place">
              <span>место проведения</span>
              <input
                className="background-muted bordered input"
                type="text"
                name="place"
                placeholder="место проведения"
                value={place}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="admin-exhibition__fields-row">
            <div className="admin-exhibition__field admin-exhibition__field-curators">
              <span>кураторы</span>
              <textarea
                className="background-muted bordered textarea input"
                name="curators"
                placeholder="кураторы"
                value={curators}
                onChange={handleChange}
              />
            </div>

            <div className="admin-exhibition__field admin-exhibition__field-organisators">
              <span>организаторы</span>
              <textarea
                className="background-muted bordered textarea input"
                name="organisators"
                placeholder="организаторы"
                value={organisators}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="admin-exhibition__fields-row">
            <div className="admin-exhibition__field admin-exhibition__field-description">
              <span>описание</span>
              <textarea
                className="background-muted bordered textarea input"
                name="description"
                placeholder="описание"
                value={description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="admin-exhibition__fields-row">
            <div className="admin-exhibition__field admin-exhibition__field-link">
              <span>ссылка</span>
              <input
                className="background-muted bordered input"
                type="text"
                name="link"
                placeholder="ссылка"
                value={link}
                onChange={handleChange}
              />
            </div>

            <div className="admin-exhibition__field admin-exhibition__field-photos-count">
              <span>кол-во фото</span>
              <input
                className="background-muted bordered input"
                type="text"
                name="photosCount"
                placeholder="кол-во фотографий"
                value={photosCount}
                onChange={handleChange}
              />
            </div>

            <div className="checkbox admin-exhibition__field admin-exhibition__field-poster">
              <span>постер</span>
              <label
                className={`background-muted bordered input checkbox-label ${
                  exhibitionToCreate.poster ? 'checkbox-label_checked' : ''
                } admin-exhibition__checkbox-label`}
              >
                <input
                  className="checkbox-input"
                  type="checkbox"
                  checked={poster}
                  name="poster"
                  onChange={handleCheckBox}
                />
              </label>
            </div>

            <div className="checkbox admin-exhibition__field admin-exhibition__field-is-active">
              <span>на сайте</span>
              <label
                className={`background-muted bordered input checkbox-label ${
                  exhibitionToCreate.isActive ? 'checkbox-label_checked' : ''
                } admin-exhibition__checkbox-label`}
              >
                <input
                  className="checkbox-input"
                  type="checkbox"
                  checked={isActive}
                  name="isActive"
                  onChange={handleCheckBox}
                />
              </label>
            </div>

            <div className="admin-exhibition__field admin-exhibition__field-submit">
              <button className="admin-exhibition__field-button button" type="submit">
                Отправить
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
