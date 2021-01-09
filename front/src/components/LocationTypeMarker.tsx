
import React, { useState } from "react";
import Guid from "../api/guid";
import { ILocation } from "../api/location";
import { ILocationType } from "../api/locationType";
import { ApiClient } from "../api/apiClient";
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

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
            <Popup>{props.location.name}</Popup>
        </Marker>
    )
}



