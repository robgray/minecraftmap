import React, { useEffect, useState } from "react";
import { ILocation } from "../../api/location";
import { Marker, Popup } from 'react-leaflet';
import { Text, Separator, Stack } from 'office-ui-fabric-react';
import { mergeStyles, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { ApiClient } from '../../api/apiClient';
import { EditButton } from "../EditButton";
import L from "leaflet";

interface ILocationTypeMarkerProps {
    location: ILocation;
    shrinkFactor: number;
};

const getIcon = (location: ILocation) => {
    const locationType = (ApiClient.data.locationTypes??[]).find(lt => lt.id === location.typeId);
    const iconColour = locationType ? locationType.iconClass : "blue";
    const myIcon = new L.Icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${iconColour}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    return myIcon;
}
 
export const LocationTypeMarker: React.FC<ILocationTypeMarkerProps> = (props: ILocationTypeMarkerProps) => {

    const [ icon, setIcon ] = useState(() => getIcon(props.location));
    useEffect(() => {
         setIcon(getIcon(props.location))
    }, [props]);

    return (
        <Marker 
            position={[-(props.location.coordinate.y/props.shrinkFactor), props.location.coordinate.x/props.shrinkFactor]}
            key={props.location.id}
            icon={icon}
            >
            <Popup>
                <Text variant="medium" style={{fontWeight: "bold"}}>{props.location.name}</Text>
                <EditButton onEdit={() => alert("TODO") } height={15} fontSize={10} />
                <Text block>Map: {props.location.mapNumber}</Text>
                <Text>{props.location.notes}</Text>
                
                <Separator style={{marginTop: 5}}></Separator>
                <Stack>
                    <Stack.Item>
                        <AvailabilityIcon available={props.location.hasAnvil} /><Text>Anvil</Text>
                    </Stack.Item>
                    <Stack.Item>
                        <AvailabilityIcon available={props.location.hasPortal} /><Text>Portal</Text>
                    </Stack.Item>
                    <Stack.Item>
                        <AvailabilityIcon available={props.location.hasBed} /><Text>Bed</Text>
                    </Stack.Item>
                    <Stack.Item>
                        <AvailabilityIcon available={props.location.hasEnchantmentTable} /><Text>Enchantment Table</Text>
                    </Stack.Item>
                    <Stack.Item>
                        <AvailabilityIcon available={props.location.hasEnderChest} /><Text>Ender Chest</Text>
                    </Stack.Item>
                    <Stack.Item>
                        <AvailabilityIcon available={props.location.hasFurnace} /><Text>Furnace</Text>
                    </Stack.Item>
                </Stack>
            </Popup>
        </Marker>
    )
}

interface IAvailabilityIconProps
{
    available: boolean;
}

const iconClass = mergeStyles({
    fontSize: 15,
    height: 15,
    width: 20,
    margin: '0 5px',
  });

  const classNames = mergeStyleSets({
    available: [{ color: 'green'}, iconClass],
    notAvailable: [{ color: 'red' }, iconClass],
  });


const AvailabilityIcon: React.FC<IAvailabilityIconProps> = (props: IAvailabilityIconProps) => {

    return (
        <FontIcon 
            iconName={props.available ? "CheckMark": "StatusCircleErrorX"} 
            className={props.available ? classNames.available : classNames.notAvailable} />
    )
}
