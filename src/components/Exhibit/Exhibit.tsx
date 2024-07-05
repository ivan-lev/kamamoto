import './Exhibit.scss';
import 'react-image-gallery/styles/scss/image-gallery.scss';

// React
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { RootState } from '../../slices';
import { setExhibit } from '../../slices/exhibitSlice';
import { setCategory } from '../../slices/categorySlice';

// Other packages
import parse from 'html-react-parser';
import ImageGallery from 'react-image-gallery';

// Utils and variables
import { generateImageLinks } from '../../utils/generateImageLinks';
import { htmlParserOptions } from '../../variables/htmlParserOptions';
import { getExhibitNumberAndCategory } from '../../utils/getExhibitNumberAndCategory';

export default function Exhibit(): JSX.Element {
  const exhibit = useSelector((state: RootState) => state.exhibit.info);
  const category = useSelector((state: RootState) => state.category.category);
  const images = useSelector((state: RootState) => state.exhibit.images);
  const dispatch = useDispatch();
  const options = htmlParserOptions;

  const navigate = useNavigate();
  const location = useLocation().pathname;

  useEffect(() => {
    const { exhibitCategory, exhibitNumber } = getExhibitNumberAndCategory(location);

    if (!exhibit) {
      dispatch(setExhibit(exhibitNumber));
    }

    if (!category) {
      dispatch(setCategory(exhibitCategory));
    }

    if (exhibit) {
      generateImageLinks(exhibit.id, dispatch);
    }
  }, [exhibit]);

  return (
    <section className="section exhibit">
      <a className="link exhibit__link" onClick={() => navigate(-1)}>
        Назад
      </a>
      <h3>{exhibit?.name}</h3>
      <ImageGallery items={images || []} showFullscreenButton={false} showPlayButton={false} />
      <div className="container">{parse(exhibit?.description || '', options)}</div>
      {exhibit?.additionalPhotos && <ImageGallery items={images || []} />}
      {exhibit?.additionalDescription && (
        <div className="container">{parse(exhibit?.additionalDescription || '', options)}</div>
      )}
    </section>
  );
}
