import './Exhibit.scss';

import parse, { Element } from 'html-react-parser';

import { useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../slices';

//vendor components
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/scss/image-gallery.scss';

import { Images } from '../../variables/images';

import { handleSetExhibit } from '../../utils/handleSetExhibit';

export default function Exhibit(): JSX.Element {
  const exhibit = useSelector((state: RootState) => state.exhibits.exhibit);

  const dispatch = useDispatch();

  const images: Images = [];

  useEffect(() => {
    if (!exhibit) {
      handleSetExhibit(dispatch);
    }
  }, [exhibit]);

  for (let i = 1; i <= 10; i++) {
    const imageLink = `/exhibits/${exhibit?.id}/${i === 10 ? '10' : '0' + i}.jpg`;
    const imageObject = { original: imageLink, thumbnail: imageLink };
    images.push(imageObject);
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
