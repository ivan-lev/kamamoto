import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Picture from '@/components/Picture/Picture';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface Props {
	slides: { url: string, source?: string }[];
}

const style = { aspectRatio: '3 / 2', width: '100%' };

export default function SliderArticle({ slides }: Props) {
	return slides.length !== 0
		&& (
			<section className="section slider">
				<Swiper
					modules={ [Navigation, Pagination] }
					navigation={ true }
					speed={ 1000 }
				>
					{ slides.map((slide, i) => {
						return (
							<SwiperSlide>
								<Picture
									additionalClass="article-slide"
									src={ slide.url }
									alt="Слайд"
									style={ style }
									fetchpriority={ i === 0 ? 'high' : 'low' }
									loading={ i === 0 ? 'eager' : 'lazy' }
								/>
							</SwiperSlide>
						);
					}) }
				</Swiper>
			</section>
		);
};
