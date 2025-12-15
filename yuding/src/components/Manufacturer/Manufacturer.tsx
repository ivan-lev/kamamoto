import type { Incense as IIncense, Manufacturer as IManufacturer } from '@/variables/incences.types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import DisplayGrid from '@/components/DisplayGrid/DisplayGrid';
import { incenses } from '@/variables/incenses/_incenses';
import { manufacturers } from '@/variables/manufacturers';
import './Manufacturer.scss';

export default function Manufacturer() {
	const base = import.meta.env.BASE_URL;
	const { manufacturerParam } = useParams();
	const [manufacturerToDisplay, setManufacturerToDisplay] = useState<IManufacturer>();
	const [incensesToDisplay, setIncensesToDisplay] = useState<IIncense[]>();

	useEffect(() => {
		for (const manufacturer in manufacturers) {
			if (manufacturer === manufacturerParam) {
				setManufacturerToDisplay(manufacturers[manufacturer]);
			}
		}
	}, []);

	useEffect(() => {
		setIncensesToDisplay(incenses.filter(incense => incense.manufacturer.slug === manufacturerParam && incense.isActive) || []);
	}, [manufacturerToDisplay]);

	return (
		<>
			<section className="section page-top">
				<Breadcrumbs />
				<h1 className="title title--1">{ `${manufacturerToDisplay?.title}` }</h1>
			</section>

			<section className="section manufacturer">
				<div className="manufacturer__header">
					<img className="manufacturer__logo" src={ `${base}images/incenses/${manufacturerParam}/${manufacturerParam}.svg` }></img>
					<p className="manufacturer__text">{ manufacturerToDisplay?.description }</p>
				</div>
			</section>

			{ incensesToDisplay
				&& (
					<section className="section">
						<DisplayGrid cards={ incensesToDisplay } nothingFoundMessage="Пока здесь нет благовоний, но должны появиться :)" />
					</section>
				) }
		</>
	);
}
