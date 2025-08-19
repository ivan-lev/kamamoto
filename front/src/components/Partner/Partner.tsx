import type { Partner as PartnerType } from '@/types/partnerType';
import './Partner.scss';

interface Props {
	partner: PartnerType;
}

export default function Partner({ partner }: Props) {
	const { link, logo, title } = partner;
	return (
		<div className="partner">
			<a href={link} className="partner__link">
				<img src={logo} alt="Логотип партёра" className="partner__image" title={title} />
			</a>
		</div>
	);
}
