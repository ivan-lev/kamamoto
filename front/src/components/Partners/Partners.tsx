import type { RootState } from '../../slices/visitor';
import Partner from '@/components/Partner/Partner';
import { setPartnersList } from '@/slices/visitor/partners';
import { api } from '@/utils/api/api';
import { PATHS } from '@/variables/variables';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Partners.scss';

const { IMAGES, PARTNERS, RESOURSES } = PATHS;

export default function Partners() {
	const dispatch = useDispatch();
	const partnersList = useSelector((state: RootState) => state.partners);

	useEffect(() => {
		if (partnersList.length === 0) {
			api.partners.getPartners()
				.then(partners => dispatch(setPartnersList(partners)))
				.catch(error => console.error(error));
		}
	}, []);

	return partnersList.length !== 0
		? (
				<div className="container container--background-transparent partners">
					<span className="partners__title">Организации-партнёры</span>
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
