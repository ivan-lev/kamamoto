import type { Marker as IMarker } from '@/components/visitor/Map/map.types';
import L from 'leaflet';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import Picture from '@/components/visitor/Picture/Picture';
import { PATHS } from '@/variables/variables';

interface Props {
	marker: IMarker;
	icon: string;
}

export default function MapMarker({ marker, icon }: Props) {
	const basePath = PATHS.STATIC_URL;

	// центр иконки ровно на координате: иначе точка визуально смещена
	// от своего места и на малом зуме «уезжает» в море
	const currentIcon = new L.Icon({
		iconUrl: `/__spritemap#sprite-${icon}-view`,
		iconRetinaUrl: `/__spritemap#sprite-${icon}-view`,
		iconSize: new L.Point(30, 30),
		iconAnchor: [15, 15],
		popupAnchor: [0, -20],
		tooltipAnchor: [0, 15],
	});

	return (
		<Marker
			position={ marker.geocode }
			icon={ currentIcon }
		>
			{ marker.title
				&& (<Tooltip direction="bottom" permanent>{ marker.title }</Tooltip>) }

			{ (marker.info || marker.image)
				&& (
					<Popup>
						{ marker.image && <Picture additionalClass="leaflet-map__image" alt={ `Изображение для маркера ${marker.title}` } src={ `${basePath}/map/${marker.image}` } /> }
						{ marker.info && <span dangerouslySetInnerHTML={{ __html: marker.info }}></span> }
					</Popup>
				) }
		</Marker>
	);
}
