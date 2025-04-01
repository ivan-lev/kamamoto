import type { Statistics } from '@/types/statistics';
import Preloader from '@/components/Preloader/Preloader';
import { api } from '@/utils/api';
import { useEffect, useState } from 'react';
import './AdminStatistics.scss';

const defaultStatistics: Statistics = { exhibits: 0, exhibitions: 0, categories: 0, partners: 0, letters: 0 };

export default function AdminStatistics(): JSX.Element {
	const [statistics, setStatistics] = useState<Statistics>(defaultStatistics);
	const [showPreloader, setShowPreloader] = useState<boolean>(true);

	useEffect(() => {
		api
			.getStatistics()
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
				<div className="admin-statistics">
					<h2 className="title3">Статистика</h2>
					<div className="admin-statistics__grid">
						<div className="admin-statistics__element">
							<img
								className="admin-statistics__element-icon"
								src="/icons/exhibitions.svg"
								alt="иконка"
							/>
							<span className="admin-statistics__element-title">
								Выставки:&nbsp;
								{statistics.exhibitions}
							</span>
						</div>

						<div className="admin-statistics__element">
							<img className="admin-statistics__element-icon" src="/icons/exhibits.svg" alt="иконка" />
							<span className="admin-statistics__element-title">
								Экспонаты:&nbsp;
								{statistics.exhibits}
							</span>
						</div>

						<div className="admin-statistics__element">
							<img
								className="admin-statistics__element-icon"
								src="/icons/categories.svg"
								alt="иконка"
							/>
							<span className="admin-statistics__element-title">
								Категории:&nbsp;
								{statistics.categories}
							</span>
						</div>

						<div className="admin-statistics__element">
							<img className="admin-statistics__element-icon" src="/icons/partners.svg" alt="иконка" />
							<span className="admin-statistics__element-title">
								Партнёры:&nbsp;
								{statistics.partners}
							</span>
						</div>

						<div className="admin-statistics__element">
							<img className="admin-statistics__element-icon" src="/icons/letter.svg" alt="иконка" />
							<span className="admin-statistics__element-title">
								Письма:&nbsp;
								{statistics.letters}
							</span>
						</div>
					</div>
				</div>
			);
}
