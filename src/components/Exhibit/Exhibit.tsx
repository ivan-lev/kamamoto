import './Exhibit.scss';
import 'react-image-gallery/styles/scss/image-gallery.scss';

// React
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
import { generateListToDisplay } from '../../utils/generateListToDisplay';
import { exhibits } from '../../variables/exhibits';
import { setDisplayList } from '../../slices/listSlice';

export default function Exhibit(): JSX.Element {
  const exhibit = useSelector((state: RootState) => state.exhibit.info);
  const images = useSelector((state: RootState) => state.exhibit.images);
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const options = htmlParserOptions;

  useEffect(() => {
    const { exhibitCategory, exhibitNumber } = getExhibitNumberAndCategory(location);

    if (!exhibit) {
      dispatch(setExhibit(exhibitNumber));
      dispatch(setCategory(exhibitCategory));
      dispatch(setDisplayList(generateListToDisplay(exhibitCategory, exhibits)));
    }

    if (exhibit) {
      generateImageLinks(exhibit.id, dispatch);
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
