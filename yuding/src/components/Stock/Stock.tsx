import type { Incense } from '@/variables/incences.types';
import { incenses } from '@/variables/incenses/_index';
import { manufacturers } from '@/variables/manufacturers/_index';

interface StockRecord {
	manufacturer: { slug: string, title: string };
	incenses: Incense[];
}

export default function Stock() {
	const stock: StockRecord[] = Object.values(manufacturers).map(manufacturer => ({
		manufacturer: { slug: manufacturer.slug, title: manufacturer.title },
		incenses: [],
	}));

	incenses.forEach((incence) => {
		stock.forEach((stockRecord) => {
			if (incence.manufacturer.slug === stockRecord.manufacturer.slug) {
				stockRecord.incenses.push(incence);
			}
		});
	});

	return (
		<>
			<title>Юй Дин - Запасы</title>
			<section>
				{ stock.map((stockRecord, index) => (
					stockRecord.manufacturer.slug !== 'unknown'
						? (
							<div key={ index }>
								<p>{ `${stockRecord.manufacturer.title}` }</p>
								<p>==========================</p>

								<ul>
									{ stockRecord.incenses.map((incense, incIndex) => (
										<li key={ incIndex }>
											{ `${incense.title} - ${incense.quantity} штук` }
										</li>
									)) }
								</ul>
								<br />
							</div>
						)
						: null // ничего не рендерить если производитель unknown
				)) }
			</section>
		</>
	);
};
