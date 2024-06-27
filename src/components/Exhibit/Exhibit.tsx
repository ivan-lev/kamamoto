import './Exhibit.scss';

import parse, { Element } from 'html-react-parser';

// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../slices';

//vendor components
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/scss/image-gallery.scss';

import { Images } from '../../variables/images';

export default function Exhibit(): JSX.Element {
  const exhibit = useSelector((state: RootState) => state.exhibits.exhibit);

  const images: Images = [];

  for (let i = 1; i <= 10; i++) {
    const imageLink = `../../../public/exhibits/${exhibit?.id}/${i === 10 ? '10' : '0' + i}.jpg`;
    const imageObject = { original: imageLink, thumbnail: imageLink };
    images.push(imageObject);
    console.log(imageObject);
  }

  const options = {
    replace(domNode: any) {
      if (domNode instanceof Element && domNode.name === 'ul') {
        domNode.attribs.class = 'list';
        return domNode;
      }
      if (domNode instanceof Element && domNode.name === 'p') {
        domNode.attribs.class = 'text';
        return domNode;
      }
    }
  };

  return (
    <section className="section">
      <h3>{exhibit?.name}</h3>
      <ImageGallery items={images} />
      <div>{parse(exhibit?.description || '', options)}</div>
      {exhibit?.additionalPhotos && <ImageGallery items={images} />}
      <div>{parse(exhibit?.additionalDescription || '', options)}</div>
    </section>
  );
}
