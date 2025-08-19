import type { RootState } from '../../slices/visitor';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Partner from '@/components/Partner/Partner';
import { setPartnersList } from '@/slices/visitor/partners';
import { api } from '@/utils/api/api';
import './Partners.scss';

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
			<section className="section">
				<div className="container container--background-transparent partners">
					<span className="partners__title">Организации-партнёры</span>
					<div className="partners__grid">
						{partnersList.map(partner => partner.isActive && <Partner key={partner._id} partner={partner} />)}
					</div>
				</div>
			</section>
		)
		: (
			<></>
		);
}
