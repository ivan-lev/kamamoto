import type { Marker, MarkerGroup } from '@/components/visitor/Map/map.types';
import { useEffect, useLayoutEffect, useState } from 'react';
import { LayersControl, MapContainer, TileLayer } from 'react-leaflet';
import Preloader from '@/components/shared/Preloader/Preloader';
import MapGroup from '@/components/visitor/Map/MapGroup';
import { MARKER_GROUPS } from '@/components/visitor/Map/markerGroups';
import PageTop from '@/components/visitor/PageTop/PageTop';
import Seo from '@/components/visitor/Seo/Seo';
import { api } from '@/utils/api/api';
import { scrollToTop } from '@/utils/scrollToTop';
import './Map.scss';

export default function Map() {
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const [groups, setGroups] = useState<MarkerGroup[]>([]);
	const [query, setQuery] = useState<string>('');

	const count = groups.reduce((total, group) => total + group.markers.length, 0);

	// const apiKey = import.meta.env.VITE_MAP_API_KEY;

	const normalizedQuery = query.trim().toLowerCase();

	function getGroupMarkers(groupName: string): Marker[] {
		const markers = groups.find(group => group.groupName === groupName)?.markers ?? [];

		if (!normalizedQuery)
			return markers;

		return markers.filter(marker =>
			marker.title.toLowerCase().includes(normalizedQuery)
			|| marker.kanji?.includes(query)
			|| marker.romaji?.toLowerCase().includes(normalizedQuery),
		);
	};

	useEffect(() => {
		api.maps.getMarkerGroups()
			.then((response) => {
				setGroups(response);
				setShowPreloader(false);
			})
			.catch(error => console.error(error));
	}, []);

	useLayoutEffect(() => scrollToTop(), []);

	return (
		<>
			<Seo
				title="Камамото: карта гочарных центров"
				description="Страница с картой керамических центров"
			/>

			<PageTop
				title="Карта японских гочарных центров"
				subtitle="Маркеры кликабельны"
				backLink="/useful/"
			/>

			{ showPreloader
				? (
					<Preloader />
				)
				: (
					<>

						<section className="section">
							<p>{ `Карта содержит названия и примерные координаты территорий, на которых расположены гончарные центры Японии. На данный момент их отмечено ${count}, но этот список не может претендовать на звание полного, и может пополняться по мере появления новой информации. Можно найти нужное вам название, введя его на русском, английском, или японском языках.` }</p>
						</section>
						<section className="section map-section">
							<div className="map-section__filters">
								<input
									name="text"
									type="text"
									className="input"
									placeholder="поиск: рус / англ / кандзи"
									value={ query }
									onChange={ event => setQuery(event.target.value) }
								/>
								<button className="button button--xs map-section__button" onClick={ () => setQuery('') }>X</button>
							</div>
							<MapContainer center={ [38.205, 138.253] } zoom={ 5 } scrollWheelZoom={ true } fadeAnimation={ false } className="map">
								{ /* бесплаьные карты если израсходуется лимит */ }
								{ /* https://gist.github.com/bokub/dd85ffe1368bb10396f871111dff7201 */ }

								{ /* бесплаьные с лимитом */ }
								{ /* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */ }

								<TileLayer url="https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png" />
								<LayersControl position="topright" collapsed={ false }>
									{ MARKER_GROUPS.map(group => (
										<MapGroup
											key={ group.groupName }
											title={ group.title }
											markers={ getGroupMarkers(group.groupName) }
											icon={ group.icon }
										/>
									)) }
								</LayersControl>
							</MapContainer>
						</section>
						<section className="section">
							<ul className="list">
								<li>
									<p>"Шесть ранних печей" (六古窯, Роккоё) — это категория, разработанная Коямой Фудзио (小山富士夫 1900–1975) в послевоенный период для описания наиболее важных керамических центров традиционной японской керамики, по аналогии с "Пятью великими печами" династии Сун в Китае. В случае Японии подразумевается не конкретная печь, а традиционный региональный стиль керамики, производимой на многочисленных действующих печах. В отличие от китайских "печей", японские стили продолжают производиться и по сей день.</p>
								</li>

								<li>
									<p>"Семь печей Энсю" (遠州七窯 Энсю тё или Энсю нана гама) — это список японских гончарных мастерских, продукция которых считалась одной из любимых у мастера чайной церемонии Кобори Энсю (小堀 遠州 1579–1647). Мастер Энсю использовал множество японских чайных принадлежностей и вел переписку по этому поводу с другими друзьями, ценителями чая и правителями провинций, где располагались печи. Самого списка не существовало, но он был составлен после смерти мастера на основе его переписки и знания о том, каким печам он отдавал предпочтение. Самое раннее упоминание его списка содержится в книге позднего периода Эдо 1857 года под названием "Историческое исследование бытовой керамики" (Хонтё Токи Косё).</p>
								</li>

								<li>
									<p>Японские традиционные ремёсла (伝統的工芸品, Дэн тотэкикогэйхин) - категория, которая присваивается ремеслу Министерством экономики, торговли и промышленности на основе нескольких критериев, описанных в Законе № 57 о содействии развитию традиционных ремесленных отраслей (1974), также известным как Закон о традиционном ремесле (伝産法):</p>
									<ul className="list">
										<li>Это прежде всего ремесло для повседневного использования</li>
										<li>Производственный процесс в значительной степени осуществляется вручную</li>
										<li>Имеет более чем столетнюю историю, при этом в производстве продолжают использоваться традиционные технологии и методы</li>
										<li>Тип основного сырья остается неизменным на протяжении более 100 лет</li>
										<li>Чтобы считаться региональной отраслью, ремесленники, занимающиеся этим ремеслом, должны достичь определенного масштаба производства.</li>
									</ul>
								</li>

								<li>
									<p>
										"Места производства керамики" (日本の陶磁器産地一覧, Нихон-но тодзики санти итиран) включает в себя исторические и существующие гончарные мастерские в Японии, а также японскую керамику и фарфор, которые они преимущественно производили. В список включены печи пост-хэйанского периода.
									</p>
								</li>
							</ul>
						</section>
					</>
				) }
		</>
	);
}
