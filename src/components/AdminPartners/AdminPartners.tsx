import './AdminPartners.scss';

// React
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import {
  AdminRootState,
  setPartners,
  setPartnerToDisplay,
  clearPartnerForm
} from '../../slices/adminSlice';

// Components
import Preloader from '../Preloader/Preloader';
import Seo from '../Seo/Seo';

// Utils
import { api } from '../../utils/api';

export default function AdminPartners(): JSX.Element {
  const dispatch = useDispatch();

  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<string>('');

  const partners = useSelector((state: AdminRootState) => state.admin.partners);
  const partnerToDisplay = useSelector((state: AdminRootState) => state.admin.partnerToDisplay);

  const { title, link, logo, isActive } = partnerToDisplay;

  useEffect(() => {
    api.getPartners().then(partners => {
      dispatch(setPartners(partners));
      setShowPreloader(false);
    });
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    dispatch(setPartnerToDisplay({ ...partnerToDisplay, [name]: value }));
  };

  const handleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    dispatch(setPartnerToDisplay({ ...partnerToDisplay, [name]: checked }));
  };

  const handleCreatePartner = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFormDisabled(true);
    api
      .createPartner({ title, link, logo, isActive })
      .then(response => {
        dispatch(setPartners([...partners, response]));
        dispatch(clearPartnerForm());
        setIsFormDisabled(false);
        setSaveMessage('Новый партнёр в базе');
      })
      .catch(error => {
        console.log(error);
        setIsFormDisabled(false);
        setSaveMessage('Что-то пошло не так :(');
      });
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
              return (
                <div
                  key={partner._id}
                  className="muted admin-section-list__row admin-partners__row"
                >
                  <span>{partner.title}</span>
                  <span>{partner.isActive ? 'Да' : 'Нет'}</span>
                  <span>
                    <button
                      className="admin-section-list__edit-button"
                      //   onClick={() => dispatch(setPartnerToEdit(partner._id))}
                    ></button>
                  </span>
                </div>
              );
            })}
          </div>

          <div className="admin-section-form">
            <form
              className="background-muted bordered admin-section-form__form"
              onSubmit={handleCreatePartner}
            >
              <fieldset className="admin-section-form__fieldset" disabled={isFormDisabled}>
                <legend className="admin-section-form__field-legend">Добавить партнёра</legend>

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
                    {/* {!isExistingExhibitionEdited ? ( */}
                    {!false ? (
                      <>
                        <button
                          className="button"
                          type="button"
                          onClick={() => dispatch(clearPartnerForm())}
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
                          //   onClick={handleUpdateExhibition}
                          disabled={isFormDisabled}
                        >
                          Сохранить
                        </button>
                        <button
                          className="button"
                          type="button"
                          // onClick={handleDeleteExhibition}
                        >
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
