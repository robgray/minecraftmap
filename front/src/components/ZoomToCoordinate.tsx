import { ICoordinate } from "../api/location";
import { ActionButton, IIconProps, IStackItemStyles } from 'office-ui-fabric-react';
import React, { useState } from "react";
import { useBoolean } from '@uifabric/react-hooks';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { PrimaryButton, Stack } from 'office-ui-fabric-react';
import { CoordinateControl } from "./Location/CoordinateControl";

interface IZoomToCoordinate 
{
    onZoomClick: ((coordinate: ICoordinate) => void);
}

const stackItemStyles: IStackItemStyles = {
    root: {
      padding: 0,
      paddingTop: 20,
      paddingBottom: 40
    },
  };

const zoomIcon: IIconProps = { iconName: 'Zoom' };

const ZoomToCoordinate: React.FC<IZoomToCoordinate> = (props: IZoomToCoordinate) => {

    const [ isOpen, { setTrue: openPanel, setFalse: dismissPanel } ] = useBoolean(false);
    const [ coordinate, setCoordinate ] = useState({ x: "", z: "", y: "" })

    const clearPanel = () => {
        setCoordinate({ x: "", z: "", y: ""});
    }

    return (
        <>
            <ActionButton iconProps={zoomIcon} 
                allowDisabledFocus 
                onClick={() => {
                    clearPanel();
                    openPanel();
                }}>Zoom to Coordinate</ActionButton>
            <Panel
                headerText="Zoom to Coordinate"
                isOpen={isOpen}
                onDismiss={dismissPanel}
                closeButtonAriaLabel="Close">
                <Stack>
                    <CoordinateControl x={coordinate.x} y={coordinate.y} z={coordinate.z} onChange={(coord) => {
                        setCoordinate({ x: coord.x.toString(), y: coord.y.toString(), z: coord.z.toString() })
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

                            dismissPanel();
                        }} />
                        </Stack.Item>
                    </Stack>
                </Stack>
            </Panel>
        </>
    )
}

export { ZoomToCoordinate };