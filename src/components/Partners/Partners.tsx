import './Partners.scss';

// Components
import Partner from '../Partner/Partner';

import type { Partner as PartnerType } from '../../types/partnerType';

const partnersList: PartnerType[] = [
  {
    _id: '',
    link: 'https://vk.com/ru_jp_74',
    logo: '/images/partners/rakuda.svg',
    title: 'АНО Информационно-культурный центр «РАКУДА»',
    isActive: true
  },
  {
    _id: '',
    link: 'https://vk.com/yume.center',
    logo: '/images/partners/ume.svg',
    title: 'Центр восточных языков и культуры «ЮМЭ»',
    isActive: true
  },
  {
    _id: '',
    link: 'https://vk.com/public193971791',
    logo: '/images/partners/midori.svg',
    title: 'Информационный Культурный Центр «МИДОРИ»',
    isActive: true
  },
  {
    _id: '',
    link: 'https://vk.com/kodnt45',
    logo: '/images/partners/kodnt.svg',
    title: 'ГБУК «Курганский областной Дом народного творчества»',
    isActive: true
  }
];

export default function Partners(): JSX.Element {
  return (
    <div className="partners">
      {partnersList.map(partner => (
        <Partner partner={partner} />
      ))}
    </div>
  );
}
