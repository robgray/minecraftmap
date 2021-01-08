import { PrimaryButton, TextField, Stack, IStackItemStyles } from 'office-ui-fabric-react';
import React, { useState } from "react";
import { useBoolean } from '@uifabric/react-hooks';
import { ActionButton, IIconProps } from 'office-ui-fabric-react';
import { CoordinateControl } from "./CoordinateControl";
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { Categories } from "./Categories";
import { INewLocation } from "../../api/location";

const stackItemStyles: IStackItemStyles = {
    root: {
      padding: 0,
      paddingTop: 20,
      paddingBottom: 40
    },
  };

interface IAddLocationProps {
    saveNewLocation: ((newLocation: INewLocation) => void)
}

const addIcon: IIconProps = { iconName: 'Add' };

const AddLocation: React.FC<IAddLocationProps> = (props: IAddLocationProps) => {

    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
    const [ name, setName ] = useState("");
    const [ categoryId, setCategoryId ] = useState("");
    const [ coordinate, setCoordinate ] = useState({ x: "", z: "", y: "" })

    const clearPanel = () => {
        setName("");
        setCategoryId("");
        setCoordinate({ x: "", z: "", y: ""});
    }

    return (
        <>
            <ActionButton iconProps={addIcon} 
                allowDisabledFocus 
                onClick={() => {
                    clearPanel();
                    openPanel();
                }}>Add Location</ActionButton>
            <Panel
                headerText="Add Location"
                isOpen={isOpen}
                onDismiss={dismissPanel}
                closeButtonAriaLabel="Close">
                <Stack>
                    <Stack.Item>
                        <TextField label="Name" required={true} value={name} onChange={(e, newValue) => setName(newValue ? newValue : "")}/>
                        <Categories value={categoryId} onChange={(e, o) => {
                            if (o) setCategoryId(o.key.toString())
                         }} />
                        <CoordinateControl x={coordinate.x} y={coordinate.y} z={coordinate.z} onChange={(coord) => {
                            setCoordinate({ x: coord.x.toString(), y: coord.y.toString(), z: coord.z.toString() })
                        }} />
                        <Stack horizontal>
                            <Stack.Item align="end" styles={stackItemStyles}>
                                <PrimaryButton text="Save" onClick={() => { 
                                    props.saveNewLocation(
                                    {
                                        name: name,
                                        coordinate: { 
                                            x: Number.parseInt(coordinate.x),
                                            y: Number.parseInt(coordinate.y),
                                            z: Number.parseInt(coordinate.z)
                                        },
                                        typeId: categoryId
                                    });
                                    dismissPanel();
                                }} />
                            </Stack.Item>
                        </Stack>
                    </Stack.Item>
                </Stack>
            </Panel>
        </>
    );
}

export { AddLocation };