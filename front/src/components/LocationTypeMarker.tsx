
import React from "react";
import { ILocation } from "../api/location";
import { Marker, Popup } from 'react-leaflet';
import { Text, Separator, Stack } from 'office-ui-fabric-react';
import { mergeStyles, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';

interface ILocationTypeMarkerProps {
    location: ILocation;
    shrinkFactor: number;
};





export const LocationTypeMarker: React.FC<ILocationTypeMarkerProps> = (props: ILocationTypeMarkerProps) => {

    return (
        <Marker 
            position={[-(props.location.coordinate.y/props.shrinkFactor), props.location.coordinate.x/props.shrinkFactor]}
            key={props.location.id}
            >
            <Popup>
                <Text block variant="medium" style={{fontWeight: "bold"}}>{props.location.name}</Text>
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
