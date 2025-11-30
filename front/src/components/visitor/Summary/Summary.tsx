import type { RootState } from '@/slices/admin';
import type { ExhibitExtended } from '@/types/exhibitType';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import QR from '@/components/visitor/QR/QR';
import './Summary.scss';

interface Props {
	exhibit: ExhibitExtended;
}

export default function Summary({ exhibit }: Props) {
	const complectations = useSelector((state: RootState) => state.complectations.complectations);
	const [showTechInfo, setShowTechInfo] = useState(false);

	const handleShowTechinfo = () => {
		setShowTechInfo(!showTechInfo);
	};

	function parseComplectations() {
		const result: string[] = [];
		exhibit.complectation.forEach((exhibitComplectationItem) => {
			const foundElement = complectations.find(complectationVariant => complectationVariant.name === exhibitComplectationItem);
			if (foundElement) {
				result.push(foundElement.title);
			}
		});
		return result.join(', ');
	}

	return (
		<section className="section">
			<div className="container">
				<div className="summary">
					<button
						className={ `summary__button ${showTechInfo ? 'summary__button_opened' : ''}` }
						onClick={ handleShowTechinfo }
					>
						Сводка
					</button>

					<div className={ `summary__content${showTechInfo ? '' : ' summary__content--hidden'}` }>
						<div className="summary__potter-info">
							<span className="summary__column-title">Информация о мастере</span>
							<ul className="summary__list">
								<li className="summary__list-element">
									<span>Имя мастера:</span>
									<span>{ exhibit?.potter.name || 'неизвестно' }</span>
								</li>

								{ exhibit?.potter.japaneseName && (
									<li className="summary__list-element">
										<span>Имя на японском:</span>
										<span>{ exhibit?.potter.japaneseName }</span>
									</li>
								) }

								{ exhibit?.potter.lifeDates && (
									<li className="summary__list-element">
										<span>Даты жизни:</span>
										<span>{ exhibit?.potter.lifeDates }</span>
									</li>
								) }
							</ul>
						</div>

						<div className="summary__exhibit-info">
							<span className="summary__column-title">Информация о лоте</span>
							<ul className="summary__list">
								<li className="summary__list-element">
									<span>Номер лота: </span>
									{ exhibit?.id }
								</li>

								{ exhibit?.age && (
									<li className="summary__list-element">
										<span>Возраст предмета: </span>
										{ exhibit?.age }
									</li>
								) }

								{ exhibit?.style && (
									<li className="summary__list-element">
										<span>Стиль керамики: </span>
										{ exhibit?.style.title }
									</li>
								) }

								{ exhibit?.season && (
									<li className="summary__list-element">
										<span>Сезон: </span>
										{ exhibit?.season }
									</li>
								) }

								{ Boolean(exhibit?.height) && (
									<li className="summary__list-element">
										<span>Высота: </span>
										{ `${exhibit?.height} см` }
									</li>
								) }

								{ Boolean(exhibit?.length) && (
									<li className="summary__list-element">
										<span>Длина: </span>
										{ `${exhibit?.length} см` }
									</li>
								) }

								{ Boolean(exhibit?.width) && (
									<li className="summary__list-element">
										<span>Ширина: </span>
										{ `${exhibit?.width} см` }
									</li>
								) }

								{ Boolean(exhibit?.diameter) && (
									<li className="summary__list-element">
										<span>Диаметр: </span>
										{ `${exhibit?.diameter} см` }
									</li>
								) }

								{ Boolean(exhibit?.footDiameter) && (
									<li className="summary__list-element">
										<span>Диаметр ножки: </span>
										{ `${exhibit?.footDiameter} см` }
									</li>
								) }

								{ Boolean(exhibit?.volume) && (
									<li className="summary__list-element">
										<span>Объём:&nbsp;</span>
										{ `${exhibit?.volume} мл` }
									</li>
								) }

								{ Boolean(exhibit?.weight) && (
									<li className="summary__list-element">
										<span>Вес:&nbsp;</span>
										{ `${exhibit?.weight} г` }
									</li>
								) }

								{ Boolean(exhibit?.weightOfSet) && (
									<li className="summary__list-element">
										<span>Вес набора:&nbsp;</span>
										{ `${exhibit?.weightOfSet} г` }
									</li>
								) }

								<li className="summary__list-element summary__list-element_justify">
									{ exhibit?.complectation?.length !== 0 && `Комплектность: ${parseComplectations()} ` }
								</li>

								<li className="summary__list-element summary__list-element_justify">
									{ `Сохранность: ${exhibit?.preservation || 'не оценена'}` }
								</li>
							</ul>
						</div>

						<div className="summary__qr-code">
							<QR />
						</div>

					</div>
				</div>
			</div>
		</section>
	);
}
