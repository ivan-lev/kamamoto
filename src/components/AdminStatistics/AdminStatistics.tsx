import './AdminStatistics.scss';

// React
import { useEffect, useState } from 'react';

// Components
import Preloader from '../Preloader/Preloader';

// Utils
import { api } from '../../utils/api';

type Statistics = {
  exhibits: number;
  exhibitions: number;
  categories: number;
  partners: number;
};

const defaultStatistics: Statistics = { exhibits: 0, exhibitions: 0, categories: 0, partners: 0 };

export default function AdminStatistics(): JSX.Element {
  const [statistics, setStatistics] = useState<Statistics>(defaultStatistics);
  const [showPreloader, setShowPreloader] = useState<boolean>(true);

  useEffect(() => {
    api
      .getStatistics()
      .then(response => {
        setStatistics(response);
        setShowPreloader(false);
      })
      .catch(error => console.log(error));
  }, []);

  return showPreloader ? (
    <Preloader />
  ) : (
    <div className="admin-statistics container">
      <h2 className="title3">Статистика</h2>
      <div className="admin-statistics__grid">
        <div className="bordered background-muted admin-statistics__element">
          <img
            className="admin-statistics__element-icon"
            src="/icons/exhibitions.svg"
            alt="иконка"
          />
          <span className="admin-statistics__element-title">
            Выставки: {statistics.exhibitions}
          </span>
        </div>

        <div className="bordered background-muted admin-statistics__element">
          <img className="admin-statistics__element-icon" src="/icons/exhibits.svg" alt="иконка" />
          <span className="admin-statistics__element-title">Экспонаты: {statistics.exhibits}</span>
        </div>

        <div className="bordered background-muted admin-statistics__element">
          <img
            className="admin-statistics__element-icon"
            src="/icons/categories.svg"
            alt="иконка"
          />
          <span className="admin-statistics__element-title">
            Категории: {statistics.categories}
          </span>
        </div>

        <div className="bordered background-muted admin-statistics__element">
          <img className="admin-statistics__element-icon" src="/icons/partners.svg" alt="иконка" />
          <span className="admin-statistics__element-title">Партнёры: {statistics.partners}</span>
        </div>
      </div>
    </div>
  );
}
