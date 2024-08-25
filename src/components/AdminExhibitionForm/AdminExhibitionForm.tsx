import './AdminExhibitionForm.scss';

// React
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Redux
import {
  AdminRootState,
  setExhibitions,
  setExhibitionFormShowed,
  clearExhibitionForm,
  setExhibitionToDisplay
} from '../../slices/adminSlice';

//Utils
import { api } from '../../utils/api';

export default function AdminExhibitionForm(): JSX.Element {
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
  const dispatch = useDispatch();

  const exhibitions = useSelector((state: AdminRootState) => state.admin.exhibitions);
  const isExistingExhibitionEdited = useSelector(
    (state: AdminRootState) => state.admin.isExistingExhibitionEdited
  );
  const exhibitionToDisplay = useSelector(
    (state: AdminRootState) => state.admin.exhibitionToDisplay
  );

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
  } = exhibitionToDisplay;

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    dispatch(setExhibitionToDisplay({ ...exhibitionToDisplay, [name]: value }));
  };

  const handleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    dispatch(setExhibitionToDisplay({ ...exhibitionToDisplay, [name]: checked }));
  };

  const handleCreateExhibition = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFormDisabled(true);
    api
      .createExhibition({
        ...exhibitionToDisplay,
        id: Number(id),
        year: Number(year),
        photosCount: Number(photosCount)
      })
      .then(response => {
        dispatch(setExhibitions([...exhibitions, response]));
        dispatch(clearExhibitionForm());
        setIsFormDisabled(false);
      })
      .catch(error => {
        console.log(error);
        setIsFormDisabled(false);
      });
  };

  const handleUpdateExhibition = () => {
    setIsFormDisabled(true);
    api
      .updateExhibition(exhibitionToDisplay)
      .then(response => {
        const newExhibitions = exhibitions.map(exhibition => {
          return exhibition.id !== exhibitionToDisplay.id ? exhibition : response;
        });
        dispatch(setExhibitions(newExhibitions));
        setIsFormDisabled(false);
      })
      .catch(error => {
        console.log(error);
        setIsFormDisabled(false);
      });
  };

  const handleDeleteExhibition = () => {
    api
      .deleteExhibition(exhibitionToDisplay)
      .then(response => {
        const newExhibitions = exhibitions.filter(exhibition => exhibition.id !== response.id);
        dispatch(setExhibitions(newExhibitions));
        handleCloseExhibitionForm();
        setIsFormDisabled(false);
      })
      .catch(error => {
        console.log(error);
        setIsFormDisabled(false);
      });
  };

  const handleCloseExhibitionForm = () => {
    dispatch(setExhibitionFormShowed(false));
    dispatch(clearExhibitionForm());
  };

  return (
    <div className="admin-exhibition-form">
      <form
        className="background-muted bordered admin-exhibition-form__form"
        onSubmit={handleCreateExhibition}
      >
        <fieldset className="admin-exhibition-form__fieldset" disabled={isFormDisabled}>
          <legend className="admin-exhibition-form__field-legend">Добавить выставку</legend>

          <div className="admin-exhibition-form__fields-row">
            <div className="admin-exhibition-form__field admin-exhibition-form__field-id">
              <span>номер</span>
              <input
                className={`background-muted bordered input ${
                  isFormDisabled ? 'input_disabled' : ''
                }`}
                type="text"
                name="id"
                placeholder="id"
                value={id}
                onChange={handleChange}
              />
            </div>

            <div className="admin-exhibition-form__field admin-exhibition-form__field-year">
              <span>год</span>
              <input
                className={`background-muted bordered input ${
                  isFormDisabled ? 'input_disabled' : ''
                }`}
                type="text"
                name="year"
                placeholder="год"
                value={year}
                onChange={handleChange}
              />
            </div>

            <div className="admin-exhibition-form__field admin-exhibition-form__field-date">
              <span>даты</span>
              <input
                className={`background-muted bordered input ${
                  isFormDisabled ? 'input_disabled' : ''
                }`}
                type="text"
                name="dates"
                placeholder="даты"
                value={dates}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="admin-exhibition-form__fields-row">
            <div className="admin-exhibition-form__field admin-exhibition-form__field-name">
              <span>название</span>
              <input
                className={`background-muted bordered input ${
                  isFormDisabled ? 'input_disabled' : ''
                }`}
                type="text"
                name="name"
                placeholder="название выставки"
                value={name}
                onChange={handleChange}
              />
            </div>

            <div className="admin-exhibition-form__field admin-exhibition-form__field-city">
              <span>город</span>
              <input
                className={`background-muted bordered input ${
                  isFormDisabled ? 'input_disabled' : ''
                }`}
                type="text"
                name="city"
                placeholder="город"
                value={city}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="admin-exhibition-form__fields-row">
            <div className="admin-exhibition-form__field admin-exhibition-form__field-address">
              <span>адрес</span>
              <input
                className={`background-muted bordered input ${
                  isFormDisabled ? 'input_disabled' : ''
                }`}
                type="text"
                name="address"
                placeholder="адрес"
                value={address}
                onChange={handleChange}
              />
            </div>

            <div className="admin-exhibition-form__field admin-exhibition-form__field-place">
              <span>место проведения</span>
              <input
                className={`background-muted bordered input ${
                  isFormDisabled ? 'input_disabled' : ''
                }`}
                type="text"
                name="place"
                placeholder="место проведения"
                value={place}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="admin-exhibition-form__fields-row">
            <div className="admin-exhibition-form__field admin-exhibition-form__field-curators">
              <span>кураторы</span>
              <textarea
                className="background-muted bordered textarea input"
                name="curators"
                placeholder="кураторы"
                value={curators}
                onChange={handleChange}
              />
            </div>

            <div className="admin-exhibition-form__field admin-exhibition-form__field-organisators">
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

          <div className="admin-exhibition-form__fields-row">
            <div className="admin-exhibition-form__field admin-exhibition-form__field-description">
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

          <div className="admin-exhibition-form__fields-row">
            <div className="admin-exhibition-form__field admin-exhibition-form__field-link">
              <span>ссылка</span>
              <input
                className={`background-muted bordered input ${
                  isFormDisabled ? 'input_disabled' : ''
                }`}
                type="text"
                name="link"
                placeholder="ссылка"
                value={link}
                onChange={handleChange}
              />
            </div>

            <div className="admin-exhibition-form__field admin-exhibition-form__field-photos-count">
              <span>кол-во фото</span>
              <input
                className={`background-muted bordered input ${
                  isFormDisabled ? 'input_disabled' : ''
                }`}
                type="text"
                name="photosCount"
                placeholder="кол-во фотографий"
                value={photosCount}
                onChange={handleChange}
              />
            </div>

            <div className="checkbox admin-exhibition-form__field admin-exhibition-form__field-poster">
              <span>постер</span>
              <label
                className={`background-muted bordered input checkbox-label ${
                  poster ? 'checkbox-label_checked' : ''
                } ${
                  isFormDisabled ? 'checkbox-label_disabled' : ''
                } admin-exhibition-form__checkbox-label`}
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

            <div className="checkbox admin-exhibition-form__field admin-exhibition-form__field-is-active">
              <span>на сайте</span>
              <label
                className={`background-muted bordered input checkbox-label ${
                  isActive ? 'checkbox-label_checked' : ''
                } ${
                  isFormDisabled ? 'checkbox-label_disabled' : ''
                } admin-exhibition-form__checkbox-label`}
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
          </div>

          <div className="admin-exhibition-form__fields-row">
            <div className="admin-exhibition-form__field admin-exhibition-form__field-submit">
              {!isExistingExhibitionEdited ? (
                <>
                  <button
                    className="button"
                    type="button"
                    onClick={() => dispatch(clearExhibitionForm())}
                  >
                    Очистить
                  </button>
                  <button className="button" type="submit">
                    Создать
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="button"
                    type="button"
                    onClick={handleUpdateExhibition}
                    disabled={isFormDisabled}
                  >
                    Сохранить
                  </button>
                  <button className="button" type="button" onClick={handleDeleteExhibition}>
                    Удалить
                  </button>
                </>
              )}
              <button className="button" type="button" onClick={handleCloseExhibitionForm}>
                Закрыть
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
