import './AdminCategories.scss';

// React
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// redux
import {
  AdminRootState,
  setCategories,
  setCategoryToDisplay,
  setIsExistingCategoryEdited,
  clearCategoryForm
} from '../../slices/adminSlice';

// Components
import Preloader from '../Preloader/Preloader';
import Seo from '../Seo/Seo';

// Utils
import { api } from '../../utils/api';

// Types
import type { Category } from '../../types/category';

export default function AdminCategories(): JSX.Element {
  //   const [categories, setCatsegories] = useState<Array<Category>>([]);
  const dispatch = useDispatch();

  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<string>('');

  const categories = useSelector((state: AdminRootState) => state.admin.categories);
  const categoryToDisplay = useSelector((state: AdminRootState) => state.admin.categoryToDisplay);
  const isExistingCategoryEdited = useSelector(
    (state: AdminRootState) => state.admin.isExistingCategoryEdited
  );

  const { category, title, thumbnail } = categoryToDisplay;

  useEffect(() => {
    api
      .getCategories()
      .then(response => {
        dispatch(setCategories(response));
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
    dispatch(setCategoryToDisplay({ ...categoryToDisplay, [name]: value }));
  };

  const handleCreateCategory = () => {
    setIsFormDisabled(true);
    const token = localStorage.getItem('kmmttkn');
    if (token) {
      api
        .createCategory(token, category, title, thumbnail)
        .then(response => {
          dispatch(setCategories([...categories, response]));
          dispatch(clearCategoryForm());
          dispatch(setIsExistingCategoryEdited(false));
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

  const handleEditCategory = (category: Category) => {
    dispatch(setCategoryToDisplay(category));
    dispatch(setIsExistingCategoryEdited(true));
  };

  const handleUpdateCategory = () => {
    setIsFormDisabled(true);
    const token = localStorage.getItem('kmmttkn');
    if (token) {
      api
        .updateCategory(token, categoryToDisplay)
        .then(response => {
          const newCategoriesList = categories.map(category => {
            return response.category !== category.category ? category : response;
          });
          dispatch(setCategories(newCategoriesList));
          dispatch(clearCategoryForm());
          dispatch(setIsExistingCategoryEdited(false));
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

  const handleDeleteCategory = () => {
    const token = localStorage.getItem('kmmttkn');
    if (token) {
      api
        .deleteCategory(token, category)
        .then(response => {
          const newCategoriesList = categories.filter(cat => cat.category !== response.category);
          dispatch(setCategories(newCategoriesList));
          dispatch(clearCategoryForm());
          dispatch(setIsExistingCategoryEdited(false));
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
        <div className="container admin-categories">
          <div className="admin-section-list">
            <div className="admin-section-list__row admin-categories__row">
              <span>Название</span>
              <span>Ссылка</span>
              <span>Файл предпросмотра</span>
              <span></span>
            </div>
            {categories.map(cat => {
              const { category, title, thumbnail } = cat;
              return (
                <div key={category} className="muted admin-section-list__row admin-categories__row">
                  <span>{title}</span>
                  <span>{category}</span>
                  <span>{thumbnail}</span>
                  <span>
                    <button
                      className="admin-section-list__edit-button"
                      onClick={() => handleEditCategory(cat)}
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
                  {!isExistingCategoryEdited ? 'Добавить категорию' : 'Редактировать категорию'}
                </legend>

                <div className="admin-section-form__fields-row">
                  <div className="admin-section-form__field">
                    <span>Название</span>
                    <input
                      className={`background-muted bordered input ${
                        isFormDisabled ? 'input_disabled' : ''
                      }`}
                      type="text"
                      name="title"
                      placeholder="по-русски"
                      value={title}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-section-form__field">
                    <span>путь</span>
                    <input
                      className={`background-muted bordered input ${
                        isFormDisabled ? 'input_disabled' : ''
                      }`}
                      type="text"
                      name="category"
                      placeholder="по-английски"
                      value={category}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-section-form__field">
                    <span>файл картинки</span>
                    <input
                      className={`background-muted bordered input ${
                        isFormDisabled ? 'input_disabled' : ''
                      }`}
                      type="text"
                      name="thumbnail"
                      placeholder="в галерею"
                      value={thumbnail}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="admin-section-form__fields-row">
                  <div className="admin-section-form__field admin-partners__submit-field">
                    {!isExistingCategoryEdited ? (
                      <>
                        <button
                          className="button"
                          type="button"
                          onClick={() => dispatch(clearCategoryForm())}
                        >
                          Очистить
                        </button>
                        <button className="button" type="submit" onClick={handleCreateCategory}>
                          Создать
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="button"
                          type="button"
                          onClick={handleUpdateCategory}
                          disabled={isFormDisabled}
                        >
                          Сохранить
                        </button>
                        <button className="button" type="button" onClick={handleDeleteCategory}>
                          Удалить
                        </button>
                      </>
                    )}
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
