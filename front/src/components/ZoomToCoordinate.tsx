import { ICoordinate } from "../api/location";
import { IStackItemStyles } from 'office-ui-fabric-react';
import React, { useEffect, useState } from "react";
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { PrimaryButton, Stack } from 'office-ui-fabric-react';
import { CoordinateControl } from "./Location/CoordinateControl";

interface IZoomToCoordinate 
{
    isOpen: boolean;
    openPanel: (() => void);
    dismissPanel: (() => void);
    onZoomClick: ((coordinate: ICoordinate) => void);
}

const stackItemStyles: IStackItemStyles = {
    root: {
      padding: 0,
      paddingTop: 20,
      paddingBottom: 40
    },
  };

const ZoomToCoordinate: React.FC<IZoomToCoordinate> = (props: IZoomToCoordinate) => {

    const [ coordinate, setCoordinate ] = useState({ x: "", z: "", y: "" })

    useEffect(() => setCoordinate({ x: "", z: "", y: ""}), []);

    return (
        <Panel
            headerText="Zoom to Coordinate"
            isOpen={props.isOpen}
            onDismiss={props.dismissPanel}
            closeButtonAriaLabel="Close">
            <Stack>
                <CoordinateControl x={coordinate.x} y={coordinate.y} z={coordinate.z} onChange={(coord) => {
                    setCoordinate({ x: coord.x, y: coord.y, z: coord.z })
                }} />

                <Stack horizontal>
                    <Stack.Item align="end" styles={stackItemStyles}>
                    <PrimaryButton text="Zoom" onClick={() => { 
                        const zoomCoord: ICoordinate = {
                            x: Number.parseInt(coordinate.x),
                            y: Number.parseInt(coordinate.y),
                            z: Number.parseInt(coordinate.z)
                        }
                        props.onZoomClick(zoomCoord);

                        props.dismissPanel();
                    }} />
                    </Stack.Item>
                </Stack>
            </Stack>
        </Panel>
    )
}

export { ZoomToCoordinate };