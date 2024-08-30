import './AdminPartners.scss';

// React
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import {
  AdminRootState,
  setPartners,
  setPartnerToDisplay,
  clearPartnerForm,
  setIsExistingPartnerEdited
} from '../../slices/adminSlice';

// Components
import Preloader from '../Preloader/Preloader';
import Seo from '../Seo/Seo';

// Utils
import { api } from '../../utils/api';
import { Partner } from '../../types/partnerType';

export default function AdminPartners(): JSX.Element {
  const dispatch = useDispatch();

  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<string>('');

  const partners = useSelector((state: AdminRootState) => state.admin.partners);
  const partnerToDisplay = useSelector((state: AdminRootState) => state.admin.partnerToDisplay);
  const isExistingPartnerEdited = useSelector(
    (state: AdminRootState) => state.admin.isExistingPartnerEdited
  );

  const { title, link, logo, isActive } = partnerToDisplay;

  useEffect(() => {
    dispatch(clearPartnerForm());
    api
      .getPartners()
      .then(partners => {
        dispatch(setPartners(partners));
        setShowPreloader(false);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (saveMessage) {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  }, [saveMessage]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    dispatch(setPartnerToDisplay({ ...partnerToDisplay, [name]: value }));
  };

  const handleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    dispatch(setPartnerToDisplay({ ...partnerToDisplay, [name]: checked }));
  };

  const handleCreatePartner = () => {
    setIsFormDisabled(true);
    const token = localStorage.getItem('kmmttkn');
    if (token) {
      api
        .createPartner(token, title, link, logo, isActive)
        .then(response => {
          dispatch(setPartners([...partners, response]));
          dispatch(clearPartnerForm());
          dispatch(setIsExistingPartnerEdited(false));
          setIsFormDisabled(false);
          setSaveMessage('Новый партнёр в базе');
        })
        .catch(error => {
          console.log(error);
          setIsFormDisabled(false);
          setSaveMessage('Что-то пошло не так :(');
        });
    } else {
      alert('Что-то не так с токеном');
    }
  };

  const handleEditPartner = (partner: Partner) => {
    dispatch(setPartnerToDisplay(partner));
    dispatch(setIsExistingPartnerEdited(true));
  };

  const handleUpdatePartner = () => {
    setIsFormDisabled(true);
    const token = localStorage.getItem('kmmttkn');
    if (token) {
      api
        .updatePartner(token, partnerToDisplay)
        .then(response => {
          const newPartnersList = partners.map(partner => {
            return response._id !== partner._id ? partner : response;
          });
          dispatch(setPartners(newPartnersList));
          dispatch(clearPartnerForm());
          dispatch(setIsExistingPartnerEdited(false));
          setIsFormDisabled(false);
          setSaveMessage('Данные обновлены');
        })
        .catch(error => {
          console.log(error);
          setIsFormDisabled(false);
          setSaveMessage('Что-то пошло не так :(');
        });
    } else {
      alert('Что-то не так с токеном');
    }
  };

  const handleDeletePartner = () => {
    const token = localStorage.getItem('kmmttkn');
    if (token) {
      api
        .deletePartner(token, partnerToDisplay._id)
        .then(response => {
          const newPartnersList = partners.filter(partner => partner._id !== response._id);
          dispatch(setPartners(newPartnersList));
          dispatch(clearPartnerForm());
          dispatch(setIsExistingPartnerEdited(false));
          setIsFormDisabled(false);
        })
        .catch(error => {
          console.log(error);
          setIsFormDisabled(false);
        });
    } else {
      alert('Что-то не так с токеном');
    }
  };

  return (
    <>
      <Seo title="Камамото: список партнёров" />

      {showPreloader ? (
        <Preloader />
      ) : (
        <div className="container admin-partners">
          <div className="admin-section-list">
            <div className="admin-section-list__row admin-partners__row">
              <span>Название</span>
              <span>Акт-сть</span>
              <span></span>
            </div>
            {partners.map(partner => {
              const { _id, title, isActive } = partner;
              return (
                <div key={_id} className="muted admin-section-list__row admin-partners__row">
                  <span>{title}</span>
                  <span>{isActive ? 'Да' : 'Нет'}</span>
                  <span>
                    <button
                      className="admin-section-list__edit-button"
                      onClick={() => handleEditPartner(partner)}
                    ></button>
                  </span>
                </div>
              );
            })}
          </div>

          <div className="admin-section-form">
            <form className="background-muted bordered admin-section-form__form">
              <fieldset className="admin-section-form__fieldset" disabled={isFormDisabled}>
                <legend className="admin-section-form__field-legend">
                  {!isExistingPartnerEdited ? 'Добавить партнёра' : 'Редактировать данные партнёра'}
                </legend>

                <div className="admin-section-form__fields-row">
                  <div className="admin-section-form__field admin-partners__title-field">
                    <span>наименование</span>
                    <input
                      className={`background-muted bordered input ${
                        isFormDisabled ? 'input_disabled' : ''
                      }`}
                      type="text"
                      name="title"
                      placeholder="название организации"
                      value={title}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="checkbox admin-section-form__field admin-partners__is-active-field">
                    <span>на сайте</span>
                    <label
                      className={`background-muted bordered input checkbox-label ${
                        isActive ? 'checkbox-label_checked' : ''
                      } ${
                        isFormDisabled ? 'checkbox-label_disabled' : ''
                      } admin-section-form__checkbox-label`}
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

                <div className="admin-section-form__fields-row">
                  <div className="admin-section-form__field admin-partners__link-field">
                    <span>ссылка на ресурс партнёра</span>
                    <input
                      className={`background-muted bordered input ${
                        isFormDisabled ? 'input_disabled' : ''
                      }`}
                      type="text"
                      name="link"
                      placeholder="сайт, вк, канал в телеграме"
                      value={link}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-section-form__field admin-partners__logo-field">
                    <span>файл логотипа</span>
                    <input
                      className={`background-muted bordered input ${
                        isFormDisabled ? 'input_disabled' : ''
                      }`}
                      type="text"
                      name="logo"
                      placeholder="название файла"
                      value={logo}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="admin-section-form__fields-row">
                  <div className="admin-section-form__field admin-partners__submit-field">
                    {!isExistingPartnerEdited ? (
                      <>
                        <button
                          className="button"
                          type="button"
                          onClick={() => dispatch(clearPartnerForm())}
                        >
                          Очистить
                        </button>
                        <button className="button" type="submit" onClick={handleCreatePartner}>
                          Создать
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="button"
                          type="button"
                          onClick={handleUpdatePartner}
                          disabled={isFormDisabled}
                        >
                          Сохранить
                        </button>
                        <button className="button" type="button" onClick={handleDeletePartner}>
                          Удалить
                        </button>
                      </>
                    )}
                    {/* <button
                      className="button"
                      type="button"
                      // onClick={handleCloseExhibitionForm}
                    >
                      Закрыть
                    </button> */}
                  </div>
                </div>
              </fieldset>
              <span className="admin-section-form__save-status">{saveMessage}</span>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
