import './Exhibit.scss';
import 'react-image-gallery/styles/scss/image-gallery.scss';

// React
import { useEffect, useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { RootState } from '../../slices';
import { setCategory } from '../../slices/categorySlice';
import {
  setExhibit,
  resetExhibit,
  setImages,
  resetImages,
  setAdditionalImages,
  resetAdditionalImages
} from '../../slices/exhibitSlice';

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
  const additionalImages = useSelector((state: RootState) => state.exhibit.additionalImages);
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
      dispatch(resetAdditionalImages());
    };
  }, []);

  useEffect(() => {
    if (exhibit) {
      dispatch(setImages(generateImageLinks(PATHS.EXHIBIT_PATH, exhibit.id)));
      dispatch(setAdditionalImages(generateImageLinks(PATHS.EXHIBIT_PATH, exhibit.id, 2, true)));
    }
  }, [exhibit]);

  return (
    <section className="section exhibit">
      <div className="exhibit__breadcrumbs">
        <Link to=".." className="link link_navigational muted exhibit__link" relative="path">
          <img className="background-muted bordered link__icon" src="/icons/link-arrow-left.svg" />
          Назад
        </Link>
      </div>
      <h3 className="title title3">{exhibit?.name}</h3>
      <ImageGallery items={images || []} showFullscreenButton={false} showPlayButton={false} />
      <div className="container exhibit__description">
        {exhibit?.potterPhoto && (
          <img
            className="exhibit__potter-photo"
            src={`${PATHS.EXHIBIT_PATH}${exhibit?.id}/${exhibit.potterPhoto}`}
          ></img>
        )}

        {exhibit?.description ? (
          parse(exhibit?.description || '', options)
        ) : (
          <p className="text">Описание в процессе подготовки</p>
        )}
        {exhibit?.additionalDescription && parse(exhibit?.additionalDescription || '', options)}
        {exhibit?.additionalPhotos && (
          <ImageGallery
            items={additionalImages || []}
            showFullscreenButton={false}
            showPlayButton={false}
            showThumbnails={false}
            showBullets={true}
          />
        )}
      </div>
    </section>
  );
}
