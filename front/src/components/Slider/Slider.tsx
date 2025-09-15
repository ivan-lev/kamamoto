import type { Swiper as SwiperType } from 'swiper';
import { useState } from 'react';
import { Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Slide from '@/components/Slide/Slide';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface Props {
	slides: string[];
}

const breakpoints = {
	0: {
		slidesPerView: 5.5,
	},
	768: {
		slidesPerView: 7.5,
	},
	1024: {
		slidesPerView: 10,
	},
};

export default function Slider({ slides }: Props) {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

	return slides.length !== 0
		&& (
			<section className="section slider">
				<Swiper
					modules={ [Navigation, Thumbs] }
					navigation={ true }
					spaceBetween={ 10 }
					speed={ 1000 }
					thumbs={{ swiper: thumbsSwiper }}
				>
					{ slides.map((slide, i) => <SwiperSlide><Slide src={ slide } fetchpriority={ i === 0 ? 'high' : 'low' } loading={ i === 0 ? 'eager' : 'lazy' }></Slide></SwiperSlide>) }
				</Swiper>

				<Swiper
					breakpoints={ breakpoints }
					modules={ [Navigation] }
					onSwiper={ setThumbsSwiper }
					spaceBetween={ 10 }
					slidesPerView={ 10 }
					watchSlidesProgress={ true }
				>
					{ slides.map(thumb => <SwiperSlide><Slide src={ thumb } fallback="/images/error-thumbnail.webp"></Slide></SwiperSlide>) }
				</Swiper>
			</section>
		);
};
