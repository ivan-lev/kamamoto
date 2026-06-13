import { LayersControl, MapContainer, TileLayer } from 'react-leaflet';
import MapGroup from '@/components/visitor/Map/MapGroup';
import { otherKilns, sixOldKilns, traditionalKilns } from '@/components/visitor/Map/markers';
import PageTop from '@/components/visitor/PageTop/PageTop';
import Seo from '@/components/visitor/Seo/Seo';

export default function Map() {
	return (
		<>
			<PageTop title="Карта японских гочарных центров" subtitle="Маркеры кликабельны" />
			<Seo title="Камамото: карта гочарных центров" description="Страница с картой керамических центров" />

			<section className="section">
				<MapContainer center={ [36.205, 138.253] } zoom={ 7 } scrollWheelZoom={ true } style={{ }} className="map">
					{ /* бесплаьные карты если израсходуется лимит */ }
					{ /* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */ }

					{ /* апи ключ из maptiler.com с лимитом */ }
					<TileLayer url="https://api.maptiler.com/maps/base-v4/{z}/{x}/{y}.png?key=FYATTDOvOWqDBLnn9Z0i" />
					<LayersControl position="topright" collapsed={ false }>
						<MapGroup title="Шесть ранних печей" markers={ sixOldKilns } icon="kiln-six-old" />
						<MapGroup title="Японские традиционные ремёсла" markers={ traditionalKilns } icon="kiln-traditional" />
						<MapGroup title="Другие стили керамики" markers={ otherKilns } icon="kiln-other" />

						{ /* <LayersControl.Overlay name="Feature group">
								<FeatureGroup pathOptions={{ color: 'purple' }}>
									<Popup>Popup in FeatureGroup</Popup>
									<Circle center={[36, 138]} radius={3500} />
									<Rectangle bounds={[[37, 136], [36, 137],]} />
								</FeatureGroup>
							</LayersControl.Overlay> */ }
					</LayersControl>
				</MapContainer>
			</section>

			<section className="section">
				<ul>
					<li>
						<p>"Шесть ранних печей" (六古窯, Роккоё) — это категория, разработанная Коямой Фудзио (小山富士夫 1900–1975) в послевоенный период для описания наиболее важных керамических центров традиционной японской керамики, по аналогии с "Пятью великими печами" династии Сун в Китае. В случае Японии подразумевается не конкретная печь, а традиционный региональный стиль керамики, производимой на многочисленных действующих печах. В отличие от китайских "печей", японские стили продолжают производиться и по сей день.</p>
					</li>
					<br />
					<li>
						<p>
							Японские традиционные ремёсла (伝統的工芸品, Дэн тотэкикогэйхин) - категория, которая присваивается ремеслу Министерством экономики, торговли и промышленности на основе нескольких критериев, описанных в Законе № 57 о содействии развитию традиционных ремесленных отраслей (1974), также известным как Закон о традиционном ремесле (伝産法):
							<ul>
								<li>Это прежде всего ремесло для повседневного использования</li>
								<li>Производственный процесс в значительной степени осуществляется вручную</li>
								<li>Имеет более чем столетнюю историю, при этом в производстве продолжают использоваться традиционные технологии и методы</li>
								<li>Тип основного сырья остается неизменным на протяжении более 100 лет</li>
								<li>Чтобы считаться региональной отраслью, ремесленники, занимающиеся этим ремеслом, должны достичь определенного масштаба производства.</li>
							</ul>
						</p>
					</li>
				</ul>
			</section>
		</>
	);
}
