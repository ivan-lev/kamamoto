import type { IArticleSlide } from '@/components/visitor/Article/Article.types';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Picture from '@/components/visitor/Picture/Picture';
import 'swiper/css';
import 'swiper/css/pagination';

interface Props {
	slides: IArticleSlide[];
}

const style = { aspectRatio: '3 / 2', width: '100%' };

export default function SliderArticle({ slides }: Props) {
	return slides.length !== 0
		&& (
			<Swiper
				className="article-slider"
				modules={ [Pagination] }
				pagination={{ clickable: true }}
				loop={ true }
				speed={ 1000 }
			>
				{ slides.map((slide, i) => {
					return (
						<SwiperSlide className="article-slide">

							<Picture
								src={ slide.url }
								alt="Слайд"
								style={ style }
								fetchpriority={ i === 0 ? 'high' : 'low' }
								loading={ i === 0 ? 'eager' : 'lazy' }
							/>

							{ slide.source && (
								<a href={ slide.source } className="link link--muted article-slide__source" target="_blank">Источник фото</a>
							) }

							{ slide.caption && (
								<span className="link link--muted article-slide__caption">{ slide.caption }</span>
							) }

						</SwiperSlide>
					);
				}) }
			</Swiper>
		);
};
