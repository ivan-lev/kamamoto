import './AdminStatistics.scss';

// React
import { useEffect, useState } from 'react';

// Utils
import { api } from '../../utils/api';

type Statistics = {
  exhibits: number;
  exhibitions: number;
};

const defaultStatistics = { exhibits: 0, exhibitions: 0 };

export default function AdminStatistics(): JSX.Element {
  const [statistics, setStatistics] = useState<Statistics>(defaultStatistics);
  useEffect(() => {
    api
      .getStatistics()
      .then(response => setStatistics(response))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="admin-statistics container">
      <h2 className="title3">Статистика</h2>
      <div className="admin-statistics__grid">
        <div className="bordered background-muted admin-statistics__element">
          <img
            className="admin-statistics__element-icon"
            src="/public/icons/exhibitions.svg"
            alt="иконка"
          />
          <span className="admin-statistics__element-title">
            Выставки: {statistics.exhibitions}
          </span>
        </div>
        <div className="bordered background-muted admin-statistics__element">
          <img
            className="admin-statistics__element-icon"
            src="/public/icons/exhibits.svg"
            alt="иконка"
          />
          <span className="admin-statistics__element-title">Экспонаты: {statistics.exhibits}</span>
        </div>
      </div>
    </div>
  );
}
