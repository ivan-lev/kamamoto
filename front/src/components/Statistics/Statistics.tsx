import type { RootState } from '@/slices/visitor';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStatistics } from '@/slices/visitor/statistics';
import { api } from '@/utils/api/api';
import './Statistics.scss';

export default function Statistics() {
	const dispatch = useDispatch();
	const statistics = useSelector((state: RootState) => state.statistics);

	useEffect(() => {
		if (statistics.isInitial) {
			api.statistics.getStatistics()
				.then(statistics => dispatch(setStatistics(statistics)))
				.catch(error => console.error(error));
		}
	}, []);

	return statistics.exhibits === 0
		? (
				<></>
			)
		: (
				<section className="section statistics">
					<ul className="statistics__list">
						<li className="statistics__element" key="2015">
							<span className="statistics__header">Начало</span>
							<span className="statistics__number">2015</span>
						</li>
						<li className="statistics__element" key={statistics.exhibitions}>
							<span className="statistics__header">Выставки</span>
							<span className="statistics__number">{statistics.exhibitions}</span>
						</li>
						<li className="statistics__element" key={statistics.exhibits}>
							<span className="statistics__header">Экспонаты</span>
							<span className="statistics__number">{statistics.exhibits}</span>
						</li>
					</ul>
				</section>
			);
}
