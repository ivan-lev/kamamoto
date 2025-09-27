import type { Statistics as StatisticsType } from '@/types/statistics';
import { useEffect, useState } from 'react';
import Preloader from '@/components/Preloader/Preloader';
import { api } from '@/utils/api/api';
import './Statistics.scss';

const defaultStatistics: StatisticsType = { exhibits: 0, exhibitions: 0, categories: 0, partners: 0, letters: 0 };

export default function Statistics() {
	const [statistics, setStatistics] = useState<StatisticsType>(defaultStatistics);
	const [showPreloader, setShowPreloader] = useState<boolean>(true);

	useEffect(() => {
		api.statistics.getStatistics()
			.then((response) => {
				setStatistics(response);
				setShowPreloader(false);
			})
			.catch(error => console.error(error));
	}, []);

	return showPreloader
		? (
			<Preloader />
		)
		: (
			<div className="statistics">
				<h2 className="title title--1">Статистика</h2>
				<div className="statistics__grid">
					<div className="statistics__dashboard-element">
						<img className="statistics__element-icon" src="/__spritemap#sprite-screen-users-view" alt="иконка" />
						<span className="statistics__element-title">
							Выставки:&nbsp;
							{ statistics.exhibitions }
						</span>
					</div>

					<div className="statistics__dashboard-element">
						<img className="statistics__element-icon" src="/__spritemap#sprite-bowl-view" alt="иконка" />
						<span className="statistics__element-title">
							Экспонаты:&nbsp;
							{ statistics.exhibits }
						</span>
					</div>

					<div className="statistics__dashboard-element">
						<img className="statistics__element-icon" src="/__spritemap#sprite-envelopes-view" alt="иконка" />
						<span className="statistics__element-title">
							Категории:&nbsp;
							{ statistics.categories }
						</span>
					</div>

					<div className="statistics__dashboard-element">
						<img className="statistics__element-icon" src="/__spritemap#sprite-user-view" alt="иконка" />
						<span className="statistics__element-title">
							Партнёры:&nbsp;
							{ statistics.partners }
						</span>
					</div>

					<div className="statistics__dashboard-element">
						<img className="statistics__element-icon" src="/__spritemap#sprite-diploma-view" alt="иконка" />
						<span className="statistics__element-title">
							Письма:&nbsp;
							{ statistics.letters }
						</span>
					</div>

				</div>
			</div>
		);
}
