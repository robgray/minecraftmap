import { PrimaryButton, TextField, Stack, IStackItemStyles, Text } from 'office-ui-fabric-react';
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
    const crossIcon: IIconProps = { iconName: 'Cancel' };
    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
    const [ name, setName ] = useState("");
    const [ categoryId, setCategoryId ] = useState("");
    const [ coordinate, setCoordinate ] = useState({ X: "", Z: "", Y: "" })

    return (
        <div>
            <ActionButton iconProps={addIcon} allowDisabledFocus onClick={openPanel}>Add Location</ActionButton>
            <Panel
                headerText="Add Location"
                isOpen={isOpen}
                onDismiss={dismissPanel}
                closeButtonAriaLabel="Close">
                <Stack>
                    <Stack.Item>
                        <TextField label="Name" required={true} value={name} />
                        <Categories value={categoryId} />
                        <CoordinateControl X={coordinate.X} Y={coordinate.Y} Z={coordinate.Z} />
                        <Stack horizontal>
                            <Stack.Item align="end" styles={stackItemStyles}>
                                <PrimaryButton text="Save" onClick={() => props.saveNewLocation(
                                    {
                                        name: name,
                                        coordinate: { 
                                            X: Number.parseInt(coordinate.X),
                                            Y: Number.parseInt(coordinate.Y),
                                            Z: Number.parseInt(coordinate.Z)
                                        },
                                        typeId: categoryId
                                    }
                                )} />
                            </Stack.Item>
                        </Stack>
                    </Stack.Item>
                </Stack>
            </Panel>
        </div>
    );
}

export { AddLocation };