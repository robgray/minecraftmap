import { useContext }  from 'react';
import { MapContainer, Marker, Popup, LayerGroup } from 'react-leaflet';
import { CRS, LatLngBounds, LatLngTuple, LatLng } from 'leaflet';
import { LayerContext } from './context/LayerContext';

const pretendLocations: LatLngTuple[] = [[100,80], [250,7], [-374,902], [-150,-900]];
const bounds = getBoundsFromLocations(pretendLocations);
const zoom: number = -10;
const center: LatLng = bounds.getCenter();

const MinecraftMap:React.FC = () => {
    const { point } = useContext(LayerContext);

    return (
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} crs={CRS.Simple} bounds={bounds}>
            <LayerGroup>
                {point}
            </LayerGroup>
            {pretendLocations.map(location => (
                <Marker position={location}>
                </Marker>
            ))}
        </MapContainer>
    )
}

function getBoundsFromLocations(locations: LatLngTuple[]):LatLngBounds
{
    let smallestX = Number.MAX_SAFE_INTEGER;
    let smallestY = Number.MAX_SAFE_INTEGER;
    let largestX = Number.MIN_SAFE_INTEGER;
    let largestY = Number.MIN_SAFE_INTEGER;

    locations.forEach((point) => {
        if (point[0] < smallestX) smallestX = point[0];
        if (point[0] > largestX) largestX = point[0];

        if (point[1] < smallestY) smallestY = point[1];
        if (point[1] > largestY) largestY = point[1];
    });
    return new LatLngBounds([smallestX, smallestY], [largestX, largestY]);
}

export default MinecraftMap;