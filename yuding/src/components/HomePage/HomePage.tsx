import type { Incense as IIncense } from '@/variables/incences.types';
import { useState } from 'react';
import DisplayGrid from '@/components/DisplayGrid/DisplayGrid';
import Filters from '@/components/Filters/Filters';
import Manufacturers from '@/components/Manufacturers/Manufacturers';

export default function HomePage() {
	const [incencesListToDisplay, setIncencesListToDisplay] = useState<IIncense[]>([]);
	return (
		<>
			<Manufacturers />
			<Filters setIncencesListToDisplay={ setIncencesListToDisplay } />
			<section className="section">
				<DisplayGrid cards={ incencesListToDisplay } nothingFoundMessage="Ничего не найдено" />
			</section>
		</>
	);
}
