import { LayerGroup, LayersControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import MapMarker from '@/components/visitor/Map/MapMarker';
import { Marker } from '@/components/visitor/Map/map.types';

interface Props {
	title: string;
	markers: Marker[];
	icon: string;
}

export default function MapGroup({ title, markers, icon }: Props) {
	return (
		<LayersControl.Overlay checked name={title}>
			<LayerGroup>
				<MarkerClusterGroup showCoverageOnHover={false} >
					{ markers.map(marker => (
						<MapMarker marker={marker} icon={icon}/>
					))}
				</MarkerClusterGroup>
			</LayerGroup>
		</LayersControl.Overlay>
	)
}