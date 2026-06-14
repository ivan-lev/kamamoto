import type { Marker as IMarker } from '@/components/visitor/Map/map.types';
import L from 'leaflet';
import { Marker, Popup, Tooltip } from 'react-leaflet';

interface Props {
	marker: IMarker;
	icon: string;
}

export default function MapMarker({ marker, icon }: Props) {
	const currentIcon = new L.Icon({
		iconUrl: `/__spritemap#sprite-${icon}-view`,
		iconRetinaUrl: `/__spritemap#sprite-${icon}-view`,
		iconSize: new L.Point(30, 30),
		iconAnchor: [0, 0],
		popupAnchor: [15, -5],
		tooltipAnchor: [15, 30],
	});

	return (
		<Marker
			position={ marker.geocode }
			icon={ currentIcon }
		>
			{ marker.tooltip
				&& (<Tooltip direction="bottom" permanent>{ marker.tooltip }</Tooltip>) }

			{ (marker.popup || marker.image)
				&& (
					<Popup>
						{ marker.image && <img className="map__image" src={ marker.image } /> }
						{ marker.popup && <span dangerouslySetInnerHTML={{ __html: marker.popup }}></span> }
					</Popup>
				) }
		</Marker>
	);
}
