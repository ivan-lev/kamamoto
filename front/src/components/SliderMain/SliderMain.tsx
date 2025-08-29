import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface Props {
	slides: string[];
}

export default function SliderMain({ slides }: Props) {
	return (
		<section className="section slider">
			<Swiper
				modules={ [Autoplay, EffectFade, Pagination] }
				speed={ 1000 }
				autoplay={{ delay: 3000 }}
				pagination={{ clickable: true }}
				slidesPerView={ 1 }
				spaceBetween={ 0 }
				loop={ true }
				effect="fade"
			>
				{ slides.map(slide => <SwiperSlide><img className="slider__img" src={ slide }></img></SwiperSlide>) }
			</Swiper>
		</section>
	);
};
