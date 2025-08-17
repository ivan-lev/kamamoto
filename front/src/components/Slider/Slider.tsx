import type { Swiper as SwiperType } from 'swiper';
import { useState } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface Props {
	slides: string[];
}

export default function Slider({ slides }: Props) {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

	function generateSlides(slides: string[]) {
		return slides.map(slide => <SwiperSlide><img className="slider__img" src={slide}></img></SwiperSlide>);
	}

	return slides.length !== 0
		&& (
			<section className="section slider">
				<Swiper
					modules={[Navigation, Thumbs]}
					navigation={true}
					spaceBetween={10}
					speed={1000}
					thumbs={{ swiper: thumbsSwiper }}
				>
					{generateSlides(slides)}
				</Swiper>
				<Swiper
					onSwiper={setThumbsSwiper}
					spaceBetween={10}
					slidesPerView={10}
					freeMode={true}
					watchSlidesProgress={true}
					modules={[FreeMode, Navigation, Thumbs]}
				>
					{generateSlides(slides)}
				</Swiper>
			</section>
		);
};
