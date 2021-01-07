import { useContext, useState }  from 'react';
import { MapContainer, Marker, Popup, LayerGroup } from 'react-leaflet';
import { CRS, LatLngBounds, LatLngTuple } from 'leaflet';
import { LayerContext } from './context/LayerContext';
import { ILocation } from '../api/location';

interface IMinecraftMapProps {
    locations: ILocation[];
}

const MinecraftMap: React.FC<IMinecraftMapProps> = (props: IMinecraftMapProps) => {

    const getBoundsFromLocations = (locs: LatLngTuple[]):LatLngBounds =>
    {
        let smallestX = Number.MAX_SAFE_INTEGER;
        let smallestY = Number.MAX_SAFE_INTEGER;
        let largestX = Number.MIN_SAFE_INTEGER;
        let largestY = Number.MIN_SAFE_INTEGER;

        locs.forEach((point) => {
            if (point[0] < smallestX) smallestX = point[0];
            if (point[0] > largestX) largestX = point[0];

            if (point[1] < smallestY) smallestY = point[1];
            if (point[1] > largestY) largestY = point[1];
        });
        return new LatLngBounds([smallestX, smallestY], [largestX, largestY]);
    }

    const { point } = useContext(LayerContext);
    const [ locations, setLocations] = useState((): LatLngTuple[] => props.locations.map(location => [ location.coordinate.X, location.coordinate.Y]));
    const [ bounds, setBounds] = useState(() => getBoundsFromLocations(locations))
    const [ zoomLevel, setZoomLevel] = useState(-10);
    const [ center, setCenter] = useState(bounds.getCenter());

    return (
        <MapContainer center={center} zoom={zoomLevel} scrollWheelZoom={true} crs={CRS.Simple} bounds={bounds}>
            <LayerGroup>
                {point}
            </LayerGroup>
            {props.locations.map(location => (
                <Marker position={[-location.coordinate.Y, location.coordinate.X]} key={location.id}>
                    <Popup>{location.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}

export default MinecraftMap;