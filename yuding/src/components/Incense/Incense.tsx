import type { Incense as IIncense } from '@/variables/incences.types';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Counter from '@/components/Counter/Counter';
import Slider from '@/components/Slider/Slider';
import { useCart } from '@/hooks/useCart';
import { incenses } from '@/variables/incenses/_incenses';
import './Incense.scss';

export default function Incense() {
	const { incenseParam, manufacturerParam } = useParams();
	const [incenseToDisplay, setIncenseToDisplay] = useState<IIncense>();
	const [photosToDisplay, setPhotosToDisplay] = useState<string[]>();
	const [count, setCount] = useState<number>(5);
	const { addItem, getItemCount } = useCart();
	const inCart = getItemCount(manufacturerParam!, incenseParam!);

	useEffect(() => {
		setIncenseToDisplay(incenses.find(incense => incense.slug === incenseParam));
	}, []);

	useEffect(() => {
		const base = import.meta.env.BASE_URL;
		setPhotosToDisplay(incenseToDisplay?.photos.map(photo => `${base}images/incenses/${incenseToDisplay?.manufacturer.slug}/${incenseToDisplay?.slug}/${photo}`));
	}, [incenseToDisplay?.photos]);

	useLayoutEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant',
		});
	}, []);

	return (
		<>

			<section className="section page-top">
				<Breadcrumbs />
				<h1 className="title title--1">{ `${incenseToDisplay?.title} от ${incenseToDisplay?.manufacturer.title}` }</h1>
			</section>

			<section className="section">
				<div className="article">
					<div className="article__slider">
						<Slider slides={ photosToDisplay || [] } />
					</div>

					<div className="article__info">
						<div className="article__row">
							<img className="article__icon" src="/__spritemap#sprite-globe-view"></img>
							<span>{ `Происхождение: ${incenseToDisplay?.origin}` }</span>
						</div>

						<div className="article__row">
							<img className="article__icon" src="/__spritemap#sprite-home-view"></img>
							<span>{ `Производитель: ${incenseToDisplay?.manufacturer.title}` }</span>
						</div>

						{ incenseToDisplay?.series
							&& (
								<div className="article__row">
									<img className="article__icon" src="/__spritemap#sprite-books-view"></img>
									<span>{ `Серия: ${incenseToDisplay?.series?.title}` }</span>
								</div>
							) }

						<span>&nbsp;</span>

						<div className="article__row">
							<img className="article__icon" src="/__spritemap#sprite-tag-view"></img>
							<span>{ `Особенности: ${incenseToDisplay?.features.join(', ')}` }</span>
						</div>

						<div className="article__row">
							<img className="article__icon" src="/__spritemap#sprite-network-view"></img>
							<span>{ `Состав: ${incenseToDisplay?.ingredients.join(', ')}` }</span>
						</div>

						<div className="article__row">
							<img className="article__icon" src="/__spritemap#sprite-ruler-view"></img>
							<span>{ `Длина: ${incenseToDisplay?.lenght} см` }</span>
						</div>

						<div className="article__row">
							<img className="article__icon" src="/__spritemap#sprite-hourglass-view"></img>
							<span>{ `Время горения: ~${incenseToDisplay?.burnTime} мин` }</span>
						</div>

						{ incenseToDisplay?.inStock
							&& (
								<div className="article__row">
									<img className="article__icon" src="/__spritemap#sprite-pen-view"></img>
									<span>{ `Цена за шт: ${incenseToDisplay?.pricePerStick} р` }</span>
								</div>
							) }
					</div>

					{ incenseToDisplay?.inStock
						? (
							<div className="article__price">
								<Counter count={ count } action={ setCount } />

								<button
									className="button article__add-to-cart"
									onClick={ () =>
										addItem(
											manufacturerParam!,
											incenseParam!,
											count,
										) }
								>
									Добавить в корзину
								</button>

								<output className="article__total">{ `Итого: ${incenseToDisplay?.pricePerStick as number * count} р` }</output>

								{ incenseToDisplay && inCart > 0 && (
									<span>{ `В корзине ${inCart} шт на сумму ${inCart * incenseToDisplay?.pricePerStick}р` }</span>
								) }
							</div>
						)
						: (<div className="article__out-of-stock ">Нет в наличии :(</div>) }

					<div className="article__description">
						<span>Описание:</span>
						<p>{ `${incenseToDisplay?.description}` }</p>
					</div>

					{ incenseToDisplay?.series
						&& (
							<div className="article__series">
								<span>О линейке благовоний:</span>
								<p>{ `${incenseToDisplay?.series?.description}` }</p>
							</div>
						) }

					<div className="article__manufacturer">
						<span>О производителе:</span>
						<p>{ `${incenseToDisplay?.manufacturer.description}` }</p>
					</div>
				</div>
			</section>
		</>
	);
}
