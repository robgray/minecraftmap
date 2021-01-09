import { useContext }  from 'react';
import { MapContainer, LayerGroup, useMap } from 'react-leaflet';
import { CRS, LatLngBounds, LatLngTuple, LatLng } from 'leaflet';
import { LayerContext } from './context/LayerContext';
import { ILocation, ICoordinate } from '../api/location';
import { LocationTypeMarker } from './LocationTypeMarker';

// Shrink_factor makes it easier to work with the large values for x and y that minecraft produces
// in the leaftlet.js map these are far apart when zoomed out.
// By decreasing the scale we can move them closer together and make better use of the 
// zoom functionality of the map.
const SHRINK_FACTOR = 100;

interface IMinecraftMapProps {
    locations: ILocation[];
    center?: ICoordinate;
}

interface IMapProps {
    center?: ICoordinate;
}

const TheMap: React.FC<IMapProps> = (props: IMapProps) => {
    const map = useMap();
    
    if (props.center) {
        map.flyTo(new LatLng(-props.center.y/SHRINK_FACTOR, props.center.x/SHRINK_FACTOR));
    }

    return null;
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
        return new LatLngBounds([smallestX/SHRINK_FACTOR, smallestY/SHRINK_FACTOR], [largestX/SHRINK_FACTOR, largestY/SHRINK_FACTOR]);
    }

    const { point } = useContext(LayerContext);
    const bounds = getBoundsFromLocations(props.locations.map(location => [-location.coordinate.y/SHRINK_FACTOR, location.coordinate.x/SHRINK_FACTOR ]));
    const center = bounds.getCenter();

    return (
        <MapContainer 
            center={center} 
            zoom={4} 
            scrollWheelZoom={true} 
            crs={CRS.Simple} 
            bounds={bounds}>
            <TheMap center={props.center} />
            <LayerGroup>
                {point}
            </LayerGroup>
            {props.locations.map(location => (
                <LocationTypeMarker location={location} shrinkFactor={SHRINK_FACTOR} />
            ))}
        </MapContainer>
    )
}

export default MinecraftMap;