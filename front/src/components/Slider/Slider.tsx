import type { Swiper as SwiperType } from 'swiper';
import { useState } from 'react';
import { Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Slide from '@/components/Slide/Slide';
import 'swiper/css';
import 'swiper/css/free-mode';
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

	function generateSlides(slides: string[]) {
		return slides.map((slide, i) => <SwiperSlide><Slide src={ slide } fallback="/images/error.webp" fetchpriority={ i === 0 ? 'high' : 'low' } loading={ i === 0 ? 'eager' : 'lazy' }></Slide></SwiperSlide>);
	}

	function generateThumbs(thumbs: string[]) {
		return thumbs.map(thumb => <SwiperSlide><Slide src={ thumb } fallback="/images/error-thumbnail.webp" loading="lazy"></Slide></SwiperSlide>);
	}

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
					{ generateSlides(slides) }
				</Swiper>

				<Swiper
					onSwiper={ setThumbsSwiper }
					spaceBetween={ 10 }
					slidesPerView={ 10 }
					freeMode={ true }
					watchSlidesProgress={ true }
					modules={ [Navigation, Thumbs] }
					breakpoints={ breakpoints }
				>
					{ generateThumbs(slides) }
				</Swiper>
			</section>
		);
};
