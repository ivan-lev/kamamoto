import './HomePage.scss';

//vendor components
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/scss/image-gallery.scss';

//components
import Statistics from '../Statistics/Statistics';

// variables
import { homepageSliderImages } from '../../variables/homepageSliderImages';

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
    </section>
  );
}
