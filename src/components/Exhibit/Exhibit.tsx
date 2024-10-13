// Types
import type { RootState } from '../../slices';

// React and redux
import { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setCategory } from '../../slices/categorySlice';
import {
  resetAdditionalImages,
  resetExhibit,
  resetImages,
  setAdditionalImages,
  setExhibit,
  setImages,
} from '../../slices/exhibitSlice';

// Components
import ExhibitTechInfo from '../ExhibitTechInfo/ExhibitTechInfo';
import Seo from '../Seo/Seo';

// Other packages
import parse from 'html-react-parser';
import ImageGallery from 'react-image-gallery';

// Utils and variables
import { generateImageLinks } from '../../utils/generateImageLinks';
import { getExhibitNumberAndCategory } from '../../utils/getExhibitNumberAndCategory';
import { ceramicStylesDescriptions } from '../../variables/ceramisStylesDescriptions';
import { htmlParserOptions } from '../../variables/htmlParserOptions';
import { PATHS } from '../../variables/variables';

import './Exhibit.scss';
import 'react-image-gallery/styles/scss/image-gallery.scss';

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
      dispatch(setImages(generateImageLinks(PATHS.EXHIBITS, exhibit.id)));
      dispatch(
        setAdditionalImages(
          generateImageLinks(PATHS.EXHIBITS, exhibit.id, true),
        ),
      );
    }
  }, [exhibit]);

  return (
    <>
      <Seo title={`Камамото: ${exhibit?.name.charAt(0).toLowerCase()}${exhibit?.name.slice(1)}`} />

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
        {images && (
          <ImageGallery items={images || []} showFullscreenButton={false} showPlayButton={false} />
        )}

        {/* Exhibit description section */}
        <div className="text-block">
          {exhibit?.description
            ? (
                parse(exhibit?.description || '', options)
              )
            : (
                <p className="text">Описание в процессе подготовки</p>
              )}
        </div>

        {/* Potter description section */}
        {exhibit?.potterInfo && (
          <div className="text-block">
            {exhibit?.potterPhoto && (
              <img
                className="exhibit__potter-photo"
                src={`${PATHS.EXHIBITS}${exhibit?.id}/${exhibit.potterPhoto}`}
              >
              </img>
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
        {ceramicStyle && ceramicStyle !== 'other' && (
          <div className="container bordered background-muted text-block">
            {parse(
              ceramicStylesDescriptions[ceramicStyle as keyof typeof ceramicStylesDescriptions]
              || '',
              options,
            )}
          </div>
        )}

        {/* Technical info */}
        {exhibit && <ExhibitTechInfo exhibit={exhibit} />}
      </section>
    </>
  );
}
