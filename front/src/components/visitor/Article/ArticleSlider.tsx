import type { Swiper as SwiperType } from 'swiper';
import type { SwiperOptions } from 'swiper/types';
import type { ArticleSlide } from '@/components/visitor/Article/Article.types';
import { useState } from 'react';
import { Keyboard, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Picture from '@/components/visitor/Picture/Picture';

interface Props {
	slides: ArticleSlide[];
}

const style = { aspectRatio: '3 / 2', width: '100%' };

const breakpoints: Record<number, SwiperOptions> = {
	0: {
		slidesPerView: 6.5,
		spaceBetween: 4,
	},
	481: {
		slidesPerView: 6.5,
		spaceBetween: 8,
	},
	769: {
		slidesPerView: 10.5,
		spaceBetween: 8,
	},
	1025: {
		slidesPerView: 15.5,
		spaceBetween: 8,
	},
};

export default function SliderArticle({ slides }: Props) {
	const [articleThumbsSwiper, setArticleThumbsSwiper] = useState<SwiperType | null>(null);

	return slides.length !== 0
		&& (
			<>
				<Swiper
					className="article-slider"
					keyboard={{ enabled: true, onlyInViewport: true, pageUpDown: false }}
					modules={ [Keyboard, Navigation, Thumbs] }
					navigation={ true }
					pagination={{ clickable: true }}
					loop={ slides.length > 1 }
					speed={ 1000 }
					thumbs={{ swiper: articleThumbsSwiper }}
				>
					{ slides.map((slide, i) => {
						if (slide.filename) {
							return (
								<SwiperSlide className="article-slide">

									<Picture
										src={ slide.filename }
										alt={ slide.caption || 'Слайд' }
										style={ style }
										fetchpriority={ i === 0 ? 'high' : 'low' }
										loading={ i === 0 ? 'eager' : 'lazy' }
									/>

									{ slide.source && (
										<a href={ slide.source } className="link link--muted article-slide__source" target="_blank">Источник фото</a>
									) }

									{ slide.caption && (
										<p className="article-slide__caption">{ slide.caption }</p>
									) }

								</SwiperSlide>
							);
						}
						else {
							return null;
						}
					}) }
				</Swiper>

				{ slides.length > 1
					&& (
						<Swiper
							breakpoints={ breakpoints }
							modules={ [Navigation] }
							onSwiper={ setArticleThumbsSwiper }
							watchSlidesProgress={ true }
						>
							{ slides.map(slide => (
								<SwiperSlide className="swiper-thumb">
									<Picture src={ slide.filename || '' } style={ style } alt={ slide.caption || 'Миниатюра слайда' }></Picture>
								</SwiperSlide>
							)) }
						</Swiper>
					) }
			</>
		);
};
