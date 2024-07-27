import './Exhibition.scss';
import 'react-image-gallery/styles/scss/image-gallery.scss';

// React
import { useEffect, useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { RootState } from '../../slices';

import {
  setExhibitionId,
  resetExhibitionId,
  setExhibition,
  resetExhibition,
  setExhibitionImages,
  resetExhibitionImages
} from '../../slices/exhibitionSlice';

// Other packages
import parse from 'html-react-parser';
import ImageGallery from 'react-image-gallery';
import { Helmet } from 'react-helmet-async';

// Utils and variables
import { generateImageLinks } from '../../utils/generateImageLinks';
import { getExhibitionId } from '../../utils/getExhibitionId';
import { htmlParserOptions } from '../../variables/htmlParserOptions';
import { PATHS } from '../../variables/variables';

export default function Exhibit(): JSX.Element {
  const id = useSelector((state: RootState) => state.exhibition.id);
  const exhibition = useSelector((state: RootState) => state.exhibition.info);
  const images = useSelector((state: RootState) => state.exhibition.images);
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const options = htmlParserOptions;

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    if (!id) {
      dispatch(setExhibitionId(getExhibitionId(location)));
    }

    return () => {
      dispatch(resetExhibitionId());
      dispatch(resetExhibition());
      dispatch(resetExhibitionImages());
    };
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(setExhibition(id));
      dispatch(setExhibitionImages(generateImageLinks(PATHS.EXHIBITION_PATH, id)));
    }
  }, [id]);

  useEffect(() => {
    if (exhibition) {
      dispatch(setExhibition(id));
      dispatch(
        setExhibitionImages(
          generateImageLinks(PATHS.EXHIBITION_PATH, exhibition.id, exhibition.photosCount)
        )
      );
    }
  }, [exhibition]);

  const pageTitle = `Камамото: ${exhibition?.name}`;
  const pagePreview = `https://kamamoto.ru/images/og-image.jpg`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:image" content={pagePreview} />
      </Helmet>
      <section className="section exhibition">
        <div className="exhibition__breadcrumbs">
          <Link to=".." className="link link_navigational muted exhibit__link" relative="path">
            <img
              className="background-muted bordered link__icon"
              src="/icons/link-arrow-left.svg"
            />
            Назад
          </Link>
        </div>

        <h3 className="title title3 exhibition__title">Выставка «{exhibition?.name}»</h3>

        <div className="container exhibition__place">
          <span>Место проведения: </span>
          <span>
            {exhibition?.city}, {exhibition?.address}
          </span>
          <span>{exhibition?.place}</span>
          <span>
            {exhibition?.year} год, {exhibition?.dates}
          </span>
        </div>

        <div className="container bordered background-muted muted exhibition__participants">
          {exhibition?.organisators && (
            <div>
              <span>Организаторы:</span>
              {parse(exhibition?.organisators || '', options)}
            </div>
          )}
          {exhibition?.curators && (
            <div>
              <span>Кураторы:</span>
              {parse(exhibition?.curators || '', options)}
            </div>
          )}
        </div>

        {images?.length !== 0 && (
          <div className="exhibition__photos">
            <ImageGallery
              items={images || []}
              showFullscreenButton={false}
              showPlayButton={false}
              showBullets={true}
              showThumbnails={false}
            />
          </div>
        )}

        <div className="text-block exhibition__description">
          {exhibition?.poster && (
            <img
              className="exhibition__poster"
              src={`${PATHS.EXHIBITION_PATH}${exhibition?.id}/poster.jpg`}
            ></img>
          )}
          {parse(exhibition?.description || '', options)}
        </div>
      </section>
    </>
  );
}
