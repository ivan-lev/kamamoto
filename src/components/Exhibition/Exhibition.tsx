import './Exhibition.scss';
import 'react-image-gallery/styles/scss/image-gallery.scss';

// React
import { useEffect, useLayoutEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { RootState } from '../../slices';
import { setExhibitionToDisplay } from '../../slices/exhibitionsSlice';

// Other packages
import parse from 'html-react-parser';
import ImageGallery from 'react-image-gallery';
import { Helmet } from 'react-helmet-async';

// Utils and variables
import { generateImageLinks } from '../../utils/generateImageLinks';
import { htmlParserOptions } from '../../variables/htmlParserOptions';
import { PATHS } from '../../variables/variables';
import { api } from '../../utils/api';
import { Images } from '../../types/imageType';

export default function Exhibit(): JSX.Element {
  const dispatch = useDispatch();
  const options = htmlParserOptions;
  const { exhId } = useParams();

  const exhibitions = useSelector((state: RootState) => state.exhibitions.exhibitionsList);
  const exhibitionToDisplay = useSelector(
    (state: RootState) => state.exhibitions.exhibitionToDisplay
  );

  const {
    id,
    name,
    city,
    address,
    place,
    year,
    dates,
    link,
    organisators,
    curators,
    poster,
    description,
    photos
  } = exhibitionToDisplay;

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    if (exhibitions.length !== 0) {
      const exhibition = exhibitions.find(exhibition => exhibition.id === parseInt(exhId || '0'));
      dispatch(setExhibitionToDisplay(exhibition));
      return;
    }

    api.getExhibitionById(exhId || '0').then(response => {
      dispatch(setExhibitionToDisplay(response));
    });
  }, [exhId]);

  const [photosToDisplay, setPhotosToDisplay] = useState<Images>([]);

  useEffect(() => {
    const path = `${PATHS.BASE_URL}/${PATHS.EXHIBITION_PATH}/${id}`;
    const newPhotosToDisplay = generateImageLinks(path, photos);
    setPhotosToDisplay(newPhotosToDisplay);
  }, [exhibitionToDisplay]);

  const pageTitle = `Камамото: ${name}`;
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

        <h3 className="title title3 exhibition__title">{`«${name}»`}</h3>

        <div className="container exhibition__place">
          <span className="muted">Место проведения: </span>
          <span className="text">
            {city}, {address}, {place}
          </span>
          <span className="muted">Даты: </span>
          <span>
            {year} год, {dates}
          </span>
          {link && (
            <span className="muted">
              Ссылка на{' '}
              <a className="link exhibition__link" href={link}>
                мероприятие
              </a>
            </span>
          )}
        </div>

        <div className="container bordered background-muted muted exhibition__participants">
          {organisators && (
            <div>
              <span>Организаторы:</span>
              {parse(organisators || '', options)}
            </div>
          )}
          {curators && (
            <div>
              <span>Кураторы:</span>
              {parse(curators || '', options)}
            </div>
          )}
        </div>

        {photosToDisplay.length !== 0 && (
          <div className="exhibition__photos">
            <ImageGallery
              items={photosToDisplay}
              showFullscreenButton={false}
              showPlayButton={false}
              showBullets={true}
              showThumbnails={false}
            />
          </div>
        )}

        <div className="text-block exhibition__description">
          {poster && (
            <img
              className="exhibition__poster"
              src={`${PATHS.BASE_URL}/${PATHS.EXHIBITION_PATH}/${id}/poster.jpg`}
            ></img>
          )}
          {parse(description || '', options)}
        </div>
      </section>
    </>
  );
}
