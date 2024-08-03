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
import { Helmet } from 'react-helmet-async';

// Components
import ExhibitTechInfo from '../ExhibitTechInfo/ExhibitTechInfo';

// Utils and variables
import { generateImageLinks } from '../../utils/generateImageLinks';
import { htmlParserOptions } from '../../variables/htmlParserOptions';
import { getExhibitNumberAndCategory } from '../../utils/getExhibitNumberAndCategory';
import { ceramicStylesDescriptions } from '../../variables/ceramisStylesDescriptions';
import { PATHS } from '../../variables/variables';

export default function Exhibit(): JSX.Element {
  const category = useSelector((state: RootState) => state.category.category);
  const exhibit = useSelector((state: RootState) => state.exhibit.info);
  const images = useSelector((state: RootState) => state.exhibit.images);
  const ceramicStyle = useSelector((state: RootState) => state.exhibit.info?.style);
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
      dispatch(
        setAdditionalImages(
          generateImageLinks(PATHS.EXHIBIT_PATH, exhibit.id, exhibit.additionalPhotosCount, true)
        )
      );
    }
  }, [exhibit]);

  const pageTitle = `Камамото: ${exhibit?.name.charAt(0).toLowerCase()}${exhibit?.name.slice(1)}`;
  const pagePreview = `https://kamamoto.ru/exhibits/${exhibitNumber}/0.jpg`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:image" content={pagePreview} />
      </Helmet>
      <section className="section exhibit">
        <div className="exhibit__breadcrumbs">
          <Link to=".." className="link link_navigational muted exhibit__link" relative="path">
            <img
              className="background-muted bordered link__icon"
              src="/icons/link-arrow-left.svg"
            />
            Назад
          </Link>
        </div>

        <h3 className="title title3">{exhibit?.name}</h3>

        {/* Main image gallery */}
        <ImageGallery items={images || []} showFullscreenButton={false} showPlayButton={false} />

        {/* Exhibit description section */}
        <div className="text-block">
          {exhibit?.description ? (
            parse(exhibit?.description || '', options)
          ) : (
            <p className="text">Описание в процессе подготовки</p>
          )}
        </div>

        {/* Potter description section */}
        {exhibit?.potterInfo && (
          <div className="text-block">
            {exhibit?.potterPhoto && (
              <img
                className="exhibit__potter-photo"
                src={`${PATHS.EXHIBIT_PATH}${exhibit?.id}/${exhibit.potterPhoto}`}
              ></img>
            )}

            {exhibit?.potterInfo && parse(exhibit?.potterInfo || '', options)}
          </div>
        )}

        {/* Additional info */}
        {exhibit?.additionalDescription && (
          <div className="text-block">
            {exhibit?.additionalDescription && parse(exhibit?.additionalDescription || '', options)}
          </div>
        )}

        {/* Additional photo gallery */}
        {exhibit?.additionalPhotos && (
          <ImageGallery
            items={additionalImages || []}
            showFullscreenButton={false}
            showPlayButton={false}
            showThumbnails={false}
            showBullets={true}
          />
        )}

        {/* Ceramic style description section */}
        {ceramicStyle !== 'other' && (
          <div className="container bordered background-muted text-block">
            {parse(
              ceramicStylesDescriptions[ceramicStyle as keyof typeof ceramicStylesDescriptions] ||
                '',
              options
            )}
          </div>
        )}

        {/* Technical info */}
        <ExhibitTechInfo exhibit={exhibit} />
      </section>
    </>
  );
}
