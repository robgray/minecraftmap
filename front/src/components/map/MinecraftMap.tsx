import React, { useMemo }  from 'react';
import { MapContainer, useMap, LayersControl, Rectangle, FeatureGroup } from 'react-leaflet';
import { CRS } from 'leaflet';
import { LocationTypeMarker } from './LocationTypeMarker';
import { CoordinateModel, LocationModel } from "../../api/client";
import { useMaps } from "../../contexts/MapsContext";
import { useLocations } from "../../contexts/LocationsContext";
import { 
    toLeafletLatLng, 
    toLeafletTuple, 
    getTranslatedBounds, 
    getBoundsFromLocations, 
    SHRINK_FACTOR 
} from '../../utils/coords';

interface IMinecraftMapProps {
    center?: CoordinateModel;
    selectedLocation?: LocationModel;
}

interface IMapProps {
    center?: CoordinateModel;
}

const TheMap: React.FC<IMapProps> = ({ center }) => {
    const map = useMap();
    
    if (center) {
        map.flyTo(toLeafletLatLng(center));
    }

    return null;
}

const MinecraftMap: React.FC<IMinecraftMapProps> = ({ center: propsCenter, selectedLocation })  => {
    const maps = useMaps();
    const { locations } = useLocations();
    //const { point } = useLayer();

    const bounds = useMemo(() => 
        getBoundsFromLocations(locations.map(location => toLeafletTuple(location.coordinate))),
        [locations]
    );

    const center = useMemo(() => bounds.getCenter(), [bounds]);

    return (
        <MapContainer 
            center={center} 
            zoom={4} 
            scrollWheelZoom={true} 
            crs={CRS.Simple} 
            bounds={bounds}>
            <TheMap center={propsCenter} />
            <LayersControl position="topright">
                <LayersControl.Overlay checked name="Maps">
                    <FeatureGroup>
                    {maps.map(m => (
                        <Rectangle 
                            key={m.mapNumber}
                            bounds={getTranslatedBounds(m.bounds)} 
                            pathOptions={{ color: "green"}} 
                        />
                    ))}
                    </FeatureGroup>
                </LayersControl.Overlay>
            </LayersControl>
            {locations.map(location => (
                <LocationTypeMarker 
                    key={location.id}
                    location={location} 
                    shrinkFactor={SHRINK_FACTOR} 
                    selected={selectedLocation?.id === location.id}
                />
            ))}
        </MapContainer>
    )
}

export default MinecraftMap;