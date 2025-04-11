import Statistics from '@/components/Statistics/Statistics';
import { homepageSliderImages } from '@/variables/homepageSliderImages';
import ImageGallery from 'react-image-gallery';
import Partners from '../Partners/Partners';
import './HomePage.scss';

export default function HomePage() {
	return (
		<section className="section home-page">
			<div className="container container--background-transparent">
				<h1 className="title title1">Камамото - японская керамика</h1>
			</div>
			<ImageGallery
				items={homepageSliderImages}
				showThumbnails={false}
				showFullscreenButton={false}
				showPlayButton={false}
				autoPlay={true}
			/>
			<div className="container container--background-transparent">
				<Statistics />
			</div>
			<Partners />
		</section>
	);
}
