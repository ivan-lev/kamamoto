import type { Partner as PartnerType } from '../../types/partnerType';

import './Partner.scss';

export default function Partner({ partner }: { partner: PartnerType }): JSX.Element {
  const { link, logo, title } = partner;
  return (
    <div className="partner">
      <a href={link} className="partner__link">
        <img src={logo} alt="Логотип партёра" className="partner__image" title={title} />
      </a>
    </div>
  );
}
