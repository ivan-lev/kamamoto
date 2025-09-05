import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

interface Props {
	slides: string[];
}

export default function SliderMain({ slides }: Props) {
	return (
		<section className="section slider">
			<Swiper
				modules={ [Autoplay, EffectFade, Navigation] }
				navigation={ true }
				speed={ 1000 }
				autoplay={{ delay: 3000 }}
				slidesPerView={ 1 }
				spaceBetween={ 0 }
				loop={ true }
				effect="fade"
			>
				{ slides.map((slide, i) => (
					<SwiperSlide key={ i }>
						<img className="slider__img" src={ slide }></img>
					</SwiperSlide>
				),
				) }
			</Swiper>
		</section>
	);
};
