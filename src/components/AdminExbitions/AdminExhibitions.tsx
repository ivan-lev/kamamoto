import './AdminExhibitions.scss';

// React
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import {
  AdminRootState,
  setExhibitionToEdit,
  setExhibitions,
  openEmptyExhibitionForm
} from '../../slices/adminSlice';

// Components
import AdminExhibitionForm from '../AdminExhibitionForm/AdminExhibitionForm';

// Utils
import { api } from '../../utils/api';

export default function AdminExhibitions(): JSX.Element {
  const dispatch = useDispatch();
  const exhibitions = useSelector((state: AdminRootState) => state.admin.exhibitions);
  const isExhibitionFormShowed = useSelector(
    (state: AdminRootState) => state.admin.isExhibitionFormShowed
  );

  useEffect(() => {
    api.getExhibitions().then(exhibitions => {
      dispatch(setExhibitions(exhibitions));
    });
  }, []);

  return (
    <div className="container admin-exhibitions">
      <div className="admin-exhibitions__list">
        <div className="admin-exhibitions__row">
          <span>ID</span>
          <span>Название</span>
          <span>Город</span>
          <span>Год</span>
          <span>Акт-сть</span>
          <span></span>
        </div>
        {exhibitions.map(exhibition => {
          return (
            <div key={exhibition.id} className="muted admin-exhibitions__row">
              <span>{exhibition.id}</span>
              <span>{exhibition.name}</span>
              <span>{exhibition.city}</span>
              <span>{exhibition.year}</span>
              <span>{exhibition.isActive ? 'Да' : 'Нет'}</span>
              <span>
                <button
                  className="admin-exhibitions__edit-button"
                  onClick={() => dispatch(setExhibitionToEdit(exhibition.id))}
                ></button>
              </span>
            </div>
          );
        })}
      </div>

      {isExhibitionFormShowed ? (
        <AdminExhibitionForm />
      ) : (
        <button className="button" onClick={() => dispatch(openEmptyExhibitionForm())}>
          Создать
        </button>
      )}
    </div>
  );
}
