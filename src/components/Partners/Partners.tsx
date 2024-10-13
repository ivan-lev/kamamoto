// Types
import type { RootState } from '../../slices';

// React and Redux
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPartnersList } from '../../slices/partnersSlice';

// Components
import Partner from '../Partner/Partner';

// Utils and variables
import { api } from '../../utils/api';
import { PATHS } from '../../variables/variables';

import './Partners.scss';

const { IMAGES, PARTNERS, RESOURSES } = PATHS;

export default function Partners(): JSX.Element {
  const dispatch = useDispatch();
  const partnersList = useSelector((state: RootState) => state.partners);

  useEffect(() => {
    if (partnersList.length === 0) {
      api
        .getPartners()
        .then(partners => dispatch(setPartnersList(partners)))
        .catch(error => console.error(error));
    }
  }, []);

  return partnersList.length !== 0
    ? (
        <div className="container partners">
          <span className="muted partners__title">Организации-партнёры</span>
          <div className="partners__grid">
            {partnersList.map((partner) => {
              if (partner.isActive) {
                partner = {
                  ...partner,
                  logo: `${RESOURSES}/${IMAGES}/${PARTNERS}/${partner.logo}`,
                };
              }
              return partner.isActive ? <Partner key={partner._id} partner={partner} /> : null;
            })}
          </div>
        </div>
      )
    : (
        <></>
      );
}
