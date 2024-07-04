import './Exhibit.scss';

// React
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { RootState } from '../../slices';
import { resetExhibit, resetImages } from '../../slices/exhibitSlice';

// Other packages
import parse from 'html-react-parser';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/scss/image-gallery.scss';

// Utils and variables
import { handleSetExhibit } from '../../utils/handleSetExhibit';
import { generateImageLinks } from '../../utils/generateImageLinks';
import { htmlParserOptions } from '../../variables/htmlParserOptions';

export default function Exhibit(): JSX.Element {
  const exhibit = useSelector((state: RootState) => state.exhibit.info);
  const images = useSelector((state: RootState) => state.exhibit.images);
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
      <div className="container">{parse(exhibit?.description || '', options)}</div>
      {exhibit?.additionalPhotos && <ImageGallery items={images || []} />}
      {exhibit?.additionalDescription && (
        <div className="container">{parse(exhibit?.additionalDescription || '', options)}</div>
      )}
    </section>
  );
}
