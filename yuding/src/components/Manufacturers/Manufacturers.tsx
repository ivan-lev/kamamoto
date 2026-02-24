import { useEffect, useState } from 'react';
import { manufacturers } from '@/variables/manufacturers/_index';
import './Manufacturers.scss';

export default function Manufacturers() {
	const base = import.meta.env.BASE_URL;
	const [manufacturersList, setManufacturersList] = useState<string[]>([]);

	useEffect(() => {
		const list = Object.values(manufacturers)
			.map(manufacturer => manufacturer.slug)
			.filter(name => name !== 'unknown');

		setManufacturersList(list);
	}, []);

	return (
		<section className="section manufacturers">
			{ manufacturersList.map((item) => {
				return (
					<div key={ item } className="manufacturers__card">
						<img className="manufacturers__logo" src={ `${base}images/incenses/${item}/${item}.svg` }></img>
						<a href={ `${base}${item}/` } className="manufacturers__link"></a>
					</div>
				);
			}) }
		</section>
	);
}
