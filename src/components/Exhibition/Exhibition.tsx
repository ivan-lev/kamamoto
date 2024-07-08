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

  return (
    <section className="section exhibition">
      <div className="exhibition__breadcrumbs">
        <Link to=".." className="link link_navigational muted exhibit__link" relative="path">
          <img className="background-muted bordered link__icon" src="/icons/link-arrow-left.svg" />
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
        <p>
          Организаторы:
          <br />
          {parse(exhibition?.organisators || '', options)}
        </p>
        <p>
          Кураторы:
          <br />
          {parse(exhibition?.curators || '', options)}
        </p>
      </div>

      <div className="exhibition__photos">
        <ImageGallery
          items={images || []}
          showFullscreenButton={false}
          showPlayButton={false}
          showBullets={true}
          showThumbnails={false}
        />
      </div>

      <div className="exhibition__description">
        {exhibition?.poster && (
          <img
            className="exhibition__poster"
            src={`${PATHS.EXHIBITION_PATH}${exhibition?.id}/poster.jpg`}
          ></img>
        )}
        {parse(exhibition?.description || '', options)}
      </div>
    </section>
  );
}
