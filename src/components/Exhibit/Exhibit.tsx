import './Exhibit.scss';

// React & Redux
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../slices';
import { resetExhibit, resetImages } from '../../slices/exhibitsSlice';

// Other packages
import parse from 'html-react-parser';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/scss/image-gallery.scss';

// Utils
import { handleSetExhibit } from '../../utils/handleSetExhibit';
import { generateImageLinks } from '../../utils/generateImageLinks';

// Variables
import { htmlParserOptions } from '../../variables/htmlParserOptions';

export default function Exhibit(): JSX.Element {
  const exhibit = useSelector((state: RootState) => state.exhibits.exhibit);
  const images = useSelector((state: RootState) => state.exhibits.images);
  const dispatch = useDispatch();
  const options = htmlParserOptions;

  useEffect(() => {
    if (!exhibit) {
      handleSetExhibit(dispatch);
    }

    if (exhibit) {
      generateImageLinks(exhibit.id, dispatch);
    }

    return () => {
      exhibit && dispatch(resetExhibit());
      dispatch(resetImages());
    };
  }, [exhibit]);

  return (
    <section className="section">
      <h3>{exhibit?.name}</h3>
      <ImageGallery items={images || []} />
      <div>{parse(exhibit?.description || '', options)}</div>
      {exhibit?.additionalPhotos && <ImageGallery items={images || []} />}
      <div>{parse(exhibit?.additionalDescription || '', options)}</div>
    </section>
  );
}
