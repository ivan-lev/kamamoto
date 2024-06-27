import './HomePage.scss';

//vendor components
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/scss/image-gallery.scss';

//components
import Statistics from '../Statistics/Statistics';

// variables
import { images } from '../../variables/images';

export default function HomePage() {
  return (
    <section className="section">
      <h1 className="title title1">Kamamoto - коллекция японской керамики</h1>
      <ImageGallery items={images} />
      <Statistics />
    </section>
  );
}
