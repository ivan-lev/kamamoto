import './Partners.scss';

// React
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { RootState } from '../../slices';
import { setPartnersList } from '../../slices/partnersSlice';

// Components
import Partner from '../Partner/Partner';

// Variables
import { api } from '../../utils/api';

export default function Partners(): JSX.Element {
  const dispatch = useDispatch();
  const partnersList = useSelector((state: RootState) => state.partners);

  useEffect(() => {
    api
      .getPartners()
      .then(partners => dispatch(setPartnersList(partners)))
      .catch(error => console.log(error));
  }, []);

  return partnersList.length !== 0 ? (
    <div className="container partners">
      <span className="muted partners__title">Организации-партнёры</span>
      <div className="partners__grid">
        {partnersList.map(partner => {
          const partnerToRender = { ...partner, logo: `./images/partners/${partner.logo}` };
          return <Partner key={partner._id} partner={partnerToRender} />;
        })}
      </div>
    </div>
  ) : (
    <></>
  );
}
