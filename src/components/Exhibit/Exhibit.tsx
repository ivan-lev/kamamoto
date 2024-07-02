import './Exhibit.scss';

// React
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../slices';
import { resetExhibit, resetImages } from '../../slices/exhibitsSlice';

// Other packages
import parse from 'html-react-parser';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/scss/image-gallery.scss';

// Utils and variables
import { handleSetExhibit } from '../../utils/handleSetExhibit';
import { generateImageLinks } from '../../utils/generateImageLinks';
import { htmlParserOptions } from '../../variables/htmlParserOptions';

export default function Exhibit(): JSX.Element {
  const exhibit = useSelector((state: RootState) => state.exhibits.exhibit);
  const images = useSelector((state: RootState) => state.exhibits.images);
  const dispatch = useDispatch();
  const options = htmlParserOptions;

  const navigate = useNavigate();

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
    <section className="section exhibit">
      <a className="link exhibit__link" onClick={() => navigate(-1)}>
        Назад
      </a>
      <h3>{exhibit?.name}</h3>
      <ImageGallery items={images || []} />
      <div>{parse(exhibit?.description || '', options)}</div>
      {exhibit?.additionalPhotos && <ImageGallery items={images || []} />}
      <div>{parse(exhibit?.additionalDescription || '', options)}</div>
    </section>
  );
}
