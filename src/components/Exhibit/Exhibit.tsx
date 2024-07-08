import './Exhibit.scss';
import 'react-image-gallery/styles/scss/image-gallery.scss';

// React
import { useEffect, useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { RootState } from '../../slices';
import { setCategory } from '../../slices/categorySlice';
import { setExhibit, resetExhibit, setImages, resetImages } from '../../slices/exhibitSlice';

// Other packages
import parse from 'html-react-parser';
import ImageGallery from 'react-image-gallery';

// Utils and variables
import { generateImageLinks } from '../../utils/generateImageLinks';
import { htmlParserOptions } from '../../variables/htmlParserOptions';
import { getExhibitNumberAndCategory } from '../../utils/getExhibitNumberAndCategory';
import { PATHS } from '../../variables/variables';

export default function Exhibit(): JSX.Element {
  const category = useSelector((state: RootState) => state.category.category);
  const exhibit = useSelector((state: RootState) => state.exhibit.info);
  const images = useSelector((state: RootState) => state.exhibit.images);
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const { exhibitCategory, exhibitNumber } = getExhibitNumberAndCategory(location);
  const options = htmlParserOptions;

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    if (!category) {
      dispatch(setCategory(exhibitCategory));
    }

    dispatch(setExhibit(exhibitNumber));

    return () => {
      dispatch(resetExhibit());
      dispatch(resetImages());
    };
  }, []);

  useEffect(() => {
    if (exhibit) {
      dispatch(setImages(generateImageLinks(PATHS.EXHIBIT_PATH, exhibit.id)));
    }
  }, [exhibit]);

  return (
    <section className="section exhibit">
      <span className="exhibit__breadcrumbs">
        <Link to=".." className="link exhibit__link" relative="path">
          Назад
        </Link>
      </span>
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
