import type { Swiper as SwiperType } from 'swiper';
import type { SwiperOptions } from 'swiper/types';
import { useState } from 'react';
import { Keyboard, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Picture from '@/components/visitor/Picture/Picture';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface Props {
	slides: string[];
}

const breakpoints: Record<number, SwiperOptions> = {
	0: {
		slidesPerView: 5.5,
		spaceBetween: 8,
	},
	768: {
		slidesPerView: 7.5,
	},
	1024: {
		slidesPerView: 10,
	},
};

const style = { aspectRatio: '3 / 2', width: '100%' };

export default function Slider({ slides }: Props) {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

	return slides.length !== 0
		&& (
			<section className="section slider">
				<Swiper
					modules={ [Keyboard, Navigation, Thumbs] }
					keyboard={{ enabled: true, onlyInViewport: true, pageUpDown: false }}
					navigation={ true }
					spaceBetween={ 10 }
					speed={ 1000 }
					thumbs={{ swiper: thumbsSwiper }}
				>
					{ slides.map((slide, i) => <SwiperSlide><Picture src={ slide } alt="Слайд" style={ style } fetchpriority={ i === 0 ? 'high' : 'low' } loading={ i === 0 ? 'eager' : 'lazy' }></Picture></SwiperSlide>) }
				</Swiper>

				{ (slides.length > 1) && (
					<Swiper
						breakpoints={ breakpoints }
						modules={ [Navigation] }
						onSwiper={ setThumbsSwiper }
						spaceBetween={ 10 }
						slidesPerView={ 10 }
						watchSlidesProgress={ true }
					>
						{ slides.map(thumb => (
							<SwiperSlide>
								<Picture src={ thumb } style={ style } alt="Мини изображение слайда" fallback="/images/error-thumbnail.webp"></Picture>
							</SwiperSlide>
						)) }
					</Swiper>
				) }
			</section>
		);
};
