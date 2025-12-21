import React, { useMemo, useRef, useEffect } from "react";
import { Marker, Popup } from 'react-leaflet';
import { useBoolean } from '@uifabric/react-hooks';
import { Text, Separator, Stack } from 'office-ui-fabric-react';
import { mergeStyles, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { Customizer } from 'office-ui-fabric-react/lib/Utilities';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { EditButton } from "../EditButton";
import L from "leaflet";
import { useLocationTypes } from "../../contexts/LocationTypesContext";
import { LocationModel, LocationTypeModel } from "../../api/client";
import { EditLocation } from "../../components/Location/EditLocation";
import { toLeafletTuple } from "../../utils/coords";

interface ILocationTypeMarkerProps {
    location: LocationModel;
    shrinkFactor: number;
    selected?: boolean;
};

const getIcon = (locationTypes: LocationTypeModel[], location: LocationModel) => {

    const locationType = (locationTypes ?? []).find(lt => lt.id === location.typeId);
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

export const LocationTypeMarker: React.FC<ILocationTypeMarkerProps> = ({ location, selected }) => {

    const { locationTypes } = useLocationTypes();

    const [isEditLocationOpen, { setTrue: openEditLocationPanel, setFalse: dismissEditLocationPanel }] = useBoolean(false);

    const icon = useMemo(() => getIcon(locationTypes, location), [locationTypes, location]);

    const position = useMemo(() => toLeafletTuple(location.coordinate), [location.coordinate]);

    const markerRef = useRef<L.Marker>(null);

    useEffect(() => {
        if (selected && markerRef.current) {
            markerRef.current.openPopup();
        }
    }, [selected]);

    return (
        <Marker
            position={position}
            key={location.id}
            icon={icon}
            ref={markerRef}
        >
            <Popup>
                <Text variant="medium" style={{ fontWeight: "bold" }}>{location.name}</Text>
                <EditButton onEdit={() => openEditLocationPanel()} height={15} fontSize={10} />
                <Text block>Map: {location.mapNumber}</Text>
                <Text>{location.notes}</Text>

                <Separator style={{ marginTop: 5 }}></Separator>
                <Stack>
                    <Stack.Item>
                        <AvailabilityIcon available={location.hasAnvil} /><Text>Anvil</Text>
                    </Stack.Item>
                    <Stack.Item>
                        <AvailabilityIcon available={location.hasPortal} /><Text>Portal</Text>
                    </Stack.Item>
                    <Stack.Item>
                        <AvailabilityIcon available={location.hasBed} /><Text>Bed</Text>
                    </Stack.Item>
                    <Stack.Item>
                        <AvailabilityIcon available={location.hasEnchantmentTable} /><Text>Enchantment Table</Text>
                    </Stack.Item>
                    <Stack.Item>
                        <AvailabilityIcon available={location.hasEnderChest} /><Text>Ender Chest</Text>
                    </Stack.Item>
                    <Stack.Item>
                        <AvailabilityIcon available={location.hasFurnace} /><Text>Furnace</Text>
                    </Stack.Item>
                </Stack>
                <Customizer>
                    {
                        isEditLocationOpen && (
                            <EditLocation
                                location={location}
                                isOpen={isEditLocationOpen}
                                openPanel={openEditLocationPanel}
                                dismissPanel={dismissEditLocationPanel}
                            />
                        )
                    }
                </Customizer>
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
