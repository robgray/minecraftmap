import { useContext }  from 'react';
import { MapContainer, LayerGroup, useMap, LayersControl, Rectangle, FeatureGroup, Popup } from 'react-leaflet';
import { CRS, LatLngBounds, LatLngTuple, LatLng } from 'leaflet';
import { LayerContext } from './LayerContext';
import { ILocation, ICoordinate } from '../../api/location';
import { LocationTypeMarker } from './LocationTypeMarker';
import { IMap, IBounds} from "../../api/apiClient";

// Shrink_factor makes it easier to work with the large values for x and y that minecraft produces
// in the leaftlet.js map these are far apart when zoomed out.
// By decreasing the scale we can move them closer together and make better use of the 
// zoom functionality of the map.
const SHRINK_FACTOR = 100;

interface IMinecraftMapProps {
    locations: ILocation[];
    center?: ICoordinate;
    maps?: IMap[];
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

const getTranslatedBounds = (bounds: IBounds): LatLngBounds => new LatLngBounds(
        [-bounds.bottomRight.y/SHRINK_FACTOR, bounds.topLeft.x/SHRINK_FACTOR],
        [-bounds.topLeft.y/SHRINK_FACTOR, bounds.bottomRight.x/SHRINK_FACTOR]);
        
const MinecraftMap: React.FC<IMinecraftMapProps> = (props: IMinecraftMapProps)  => {
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
        return new LatLngBounds([smallestY/SHRINK_FACTOR, smallestX/SHRINK_FACTOR], [largestY/SHRINK_FACTOR, largestX/SHRINK_FACTOR]);
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
            <LayersControl position="topright">
                <LayersControl.Overlay name="Maps">
                <FeatureGroup >
                 {props.maps && (
                        props.maps.map(m => (
                            <Rectangle bounds={getTranslatedBounds(m.bounds)} pathOptions={{ color: "green"}}/>
                        ))
                    )}
                    </FeatureGroup>
                </LayersControl.Overlay>
            </LayersControl>
            <LayerGroup>
                {point}
            </LayerGroup>
            {props.locations.map(location => (
                <LocationTypeMarker location={location} shrinkFactor={SHRINK_FACTOR} key={location.id} />
            ))}
        </MapContainer>
    )
}

export default MinecraftMap;