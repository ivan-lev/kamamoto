import type { Dispatch, SetStateAction } from 'react';
import type { Incense } from '@/variables/incences.types';
import { useEffect, useState } from 'react';
import { Features } from '@/variables/features';
import { incenses } from '@/variables/incenses/_incenses';
import { manufacturers } from '@/variables/manufacturers/manufacturers';
import './Filters.scss';

interface Props {
	setIncencesListToDisplay: Dispatch<SetStateAction<Incense[]>>;
}

export default function Filters({ setIncencesListToDisplay }: Props) {
	const incencesList: Incense[] = incenses.filter(incense => incense.isActive);
	const [selectedManufacturer, setManufacturer] = useState<string>('all');
	const [selectedFeature, setFeature] = useState<string>('all');
	const [showInStockOnly, setShowInStockOnly] = useState<boolean>(true);

	function getManufactures() {
		let list = Object.values(manufacturers).map((m) => {
			return { title: m.title, value: m.slug };
		});
		list = list.filter(object => object.value !== 'unknown');
		list.push({ title: 'все', value: 'all' });
		return list;
	}

	function getFeatures() {
		let list = Object.entries(Features).map(([key, value]) => ({ title: value, value: key }));
		list = list.filter(object => object.value !== 'none');
		return list;
	}

	function filterIncenseList() {
		const isManufacturerMatched = (incense: Incense) => selectedManufacturer === 'all' ? true : incense.manufacturer.slug === selectedManufacturer;
		const isFeatureMatched = (incense: Incense) => selectedFeature === 'all' ? true : incense.features.includes(Features[selectedFeature as keyof typeof Features]);
		const isInstockMatched = (incense: Incense) => !showInStockOnly ? true : incense.inStock;

		const filteredList = incencesList.filter(incense => isManufacturerMatched(incense) && isFeatureMatched(incense) && isInstockMatched(incense));
		setIncencesListToDisplay(filteredList);

		// const manufacturerFilteredList = incencesList.filter(incense => selectedManufacturer === 'all' ? true : incense.manufacturer.slug === selectedManufacturer);
		// const featureFilteredList = manufacturerFilteredList.filter(incense => selectedFeature === 'all' ? true : incense.features.includes(Features[selectedFeature as keyof typeof Features]));
		// const inStockFilteredList = featureFilteredList.filter(incense => showInStockOnly ? incense.inStock === true : true);

		// setIncencesListToDisplay(inStockFilteredList);
	};

	useEffect(() => {
		filterIncenseList();
	}, [selectedManufacturer, selectedFeature, showInStockOnly]);

	return (
		<search className="section filters">
			<label>
				Производитель
				<select
					className="input"
					name="manufacturer"
					value={ selectedManufacturer }
					onChange={ event => setManufacturer(event.target.value) }
				>
					{ getManufactures().map((manufacturer) => {
						return (
							<option key={ manufacturer.value } value={ manufacturer.value }>{ manufacturer.title }</option>
						);
					}) }
				</select>
			</label>

			<label>
				Особенность
				<select
					className="input"
					name="feature"
					value={ selectedFeature }
					onChange={ event => setFeature(event.target.value) }
				>
					{ getFeatures().map((feature) => {
						return (
							<option key={ feature.value } value={ feature.value }>{ feature.title }</option>
						);
					}) }
				</select>
			</label>
			<div>
				<span>В наличии</span>
				<label className={ `checkbox-label ${showInStockOnly ? 'checkbox-label--checked' : ''} ` }>
					<input
						className="checkbox-input"
						type="checkbox"
						checked={ showInStockOnly }
						name="isActive"
						onChange={ () => setShowInStockOnly(!showInStockOnly) }
					/>
				</label>
			</div>
		</search>
	);
}
