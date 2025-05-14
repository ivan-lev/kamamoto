import type { Exhibit } from '@/types/exhibitType';
import QR from '@/components/QR/QR';
import { useState } from 'react';
import './ExhibitTechInfo.scss';

interface Props {
	exhibit: Exhibit;
}

export default function ExhibitTechInfo({ exhibit }: Props) {
	const [showTechInfo, setShowTechInfo] = useState(false);

	const handleShowTechinfo = () => {
		setShowTechInfo(!showTechInfo);
	};

	return (
		<section className="section section-tech-info">
			<div className="container">
				<div className="tech-info">
					<button
						className={`tech-info__button ${showTechInfo ? 'tech-info__button_opened' : ''}`}
						onClick={handleShowTechinfo}
					>
						Техническая информация
					</button>

					<div className={`tech-info__content${showTechInfo ? '' : '_hidden'}`}>
						<div className="tech-info__potter-info">
							<span className="tech-info__column-title">Информация о мастере</span>
							<ul className="tech-info__list">
								<li className="tech-info__list-element">
									<span>Имя мастера:</span>
									<span>{exhibit?.potterName || 'неизвестно'}</span>
								</li>

								{exhibit?.potterJapaneseName && (
									<li className="tech-info__list-element">
										<span>Имя на японском:</span>
										<span>{exhibit?.potterJapaneseName}</span>
									</li>
								)}

								{exhibit?.potterLifeDates && (
									<li className="tech-info__list-element">
										<span>Даты жизни:</span>
										<span>{exhibit?.potterLifeDates}</span>
									</li>
								)}
							</ul>
						</div>

						<div className="tech-info__exhibit-info">
							<span className="tech-info__column-title">Информация о лоте</span>
							<ul className="tech-info__list">
								<li className="tech-info__list-element">
									<span>Номер лота: </span>
									{exhibit?.id}
								</li>

								{exhibit?.age && (
									<li className="tech-info__list-element">
										<span>Возраст предмета: </span>
										{exhibit?.age}
									</li>
								)}

								{exhibit?.style && (
									<li className="tech-info__list-element">
										<span>Стиль керамики: </span>
										{exhibit?.style.title}
									</li>
								)}

								{exhibit?.height && (
									<li className="tech-info__list-element">
										<span>Высота: </span>
										{`${exhibit?.height} см`}
									</li>
								)}

								{exhibit?.length && (
									<li className="tech-info__list-element">
										<span>Длина: </span>
										{`${exhibit?.length} см`}
									</li>
								)}

								{exhibit?.width && (
									<li className="tech-info__list-element">
										<span>Ширина: </span>
										{`${exhibit?.width} см`}
									</li>
								)}

								{exhibit?.diameter && (
									<li className="tech-info__list-element">
										<span>Диаметр: </span>
										{exhibit?.diameter}
									</li>
								)}

								{exhibit?.footDiameter && (
									<li className="tech-info__list-element">
										<span>Диаметр ножки: </span>
										{exhibit?.footDiameter}
									</li>
								)}

								{exhibit?.weight && (
									<li className="tech-info__list-element">
										<span>Вес:&nbsp;</span>
										{exhibit?.weight}
									</li>
								)}

								{exhibit?.volume && (
									<li className="tech-info__list-element">
										<span>Объём:&nbsp;</span>
										{exhibit?.volume}
									</li>
								)}

								{exhibit?.weightOfSet && (
									<li className="tech-info__list-element">
										<span>Вес набора:&nbsp;</span>
										{exhibit?.weightOfSet}
									</li>
								)}

								<li className="tech-info__list-element tech-info__list-element_justify">
									{exhibit?.complectation?.length === 1
										? (
												<>
													Комплектность:
													{exhibit?.complectation.join(', ')}
												</>
											)
										: (
									// <>{`Комплектность: ${exhibit?.complectation.join(', ')}`}</>
												<>{`Комплектность: ${exhibit?.complectation}`}</>
											)}
								</li>

								<li className="tech-info__list-element tech-info__list-element_justify">
									{`Сохранность: ${exhibit?.preservation || 'не оценена'}`}
								</li>
							</ul>
						</div>

						<div className="tech-info__qr-code">
							<QR />
						</div>

					</div>
				</div>
			</div>
		</section>
	);
}
