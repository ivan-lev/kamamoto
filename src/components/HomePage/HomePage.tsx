// Vendor components
import ImageGallery from 'react-image-gallery';

// Components
import Partners from '../Partners/Partners';
import Statistics from '../Statistics/Statistics';

// Utils and variables
import { homepageSliderImages } from '../../variables/homepageSliderImages';

import 'react-image-gallery/styles/scss/image-gallery.scss';
import './HomePage.scss';

export default function HomePage() {
	return (
		<section className="section home-page">
			<div className="container">
				<h1 className="title title1">Камамото - японская керамика</h1>
			</div>
			<ImageGallery
				items={homepageSliderImages}
				showThumbnails={false}
				showFullscreenButton={false}
				showPlayButton={false}
				autoPlay={true}
			/>
			<div className="container">
				<Statistics />
			</div>
			<Partners />
		</section>
	);
}
