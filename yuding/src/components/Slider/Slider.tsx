import type { Swiper as SwiperType } from 'swiper';
import type { SwiperOptions } from 'swiper/types';
import { useState } from 'react';
import { Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Picture from '@/components/Picture/Picture';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface Props {
	slides: string[];
}

const breakpoints: Record<number, SwiperOptions> = {
	0: {
		slidesPerView: 6.5,
		spaceBetween: 4,
	},
	481: {
		slidesPerView: 6.5,
		spaceBetween: 4,
	},
	769: {
		slidesPerView: 7.5,
		spaceBetween: 8,
	},
	1025: {
		slidesPerView: 10,
		spaceBetween: 8,
	},
};

const style = { aspectRatio: '3 / 3', width: '100%' };

export default function Slider({ slides }: Props) {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

	return slides.length !== 0
		&& (
			<section className="slider">
				<Swiper
					modules={ [Navigation, Thumbs] }
					navigation={ true }
					speed={ 1000 }
					thumbs={{ swiper: thumbsSwiper }}
				>
					{ slides.map((slide, i) => <SwiperSlide><Picture src={ slide } alt="Слайд" style={ style } fetchpriority={ i === 0 ? 'high' : 'low' } loading={ i === 0 ? 'eager' : 'lazy' }></Picture></SwiperSlide>) }
				</Swiper>

				<Swiper
					breakpoints={ breakpoints }
					modules={ [Navigation] }
					onSwiper={ setThumbsSwiper }
					watchSlidesProgress={ true }
				>
					{ slides.map(thumb => (
						<SwiperSlide>
							<Picture src={ thumb } style={ style } alt="Миниатюра слайда"></Picture>
						</SwiperSlide>
					)) }
				</Swiper>
			</section>
		);
};
