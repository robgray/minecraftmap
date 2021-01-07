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
    const [ coordinate, setCoordinate ] = useState({ X: "", Z: "", Y: "" })

    const clearPanel = () => {
        setCoordinate({ X: "", Z: "", Y: ""});
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
                    <CoordinateControl X={coordinate.X} Y={coordinate.Y} Z={coordinate.Z} onChange={(coord) => {
                        setCoordinate({ X: coord.X.toString(), Y: coord.Y.toString(), Z: coord.Z.toString() })
                    }} />

                    <Stack horizontal>
                        <Stack.Item align="end" styles={stackItemStyles}>
                        <PrimaryButton text="Zoom" onClick={() => { 
                            const zoomCoord: ICoordinate = {
                                X: Number.parseInt(coordinate.X),
                                Y: Number.parseInt(coordinate.Y),
                                Z: Number.parseInt(coordinate.Z)
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