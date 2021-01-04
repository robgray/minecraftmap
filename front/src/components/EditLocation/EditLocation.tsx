import { PrimaryButton, TextField, Stack, IStackItemStyles, Text } from 'office-ui-fabric-react';
import React from "react";
import { ActionButton, IIconProps } from 'office-ui-fabric-react';
import { Coordinates } from "./Coordinates";
import { Categories } from "./Categories";

const stackItemStyles: IStackItemStyles = {
    root: {
      padding: 0,
      paddingTop: 20,
      paddingBottom: 40
    },
  };

interface IEditLocationProps {
    saveNewLocation: Function,
    updateLocation: Function,
    mode: string 
}

const addIcon: IIconProps = { iconName: 'Add' };

const AddLocationButton: React.FC = (props) => {
    return (
        <ActionButton iconProps={addIcon} allowDisabledFocus>Add Location</ActionButton>
    )
}

const EditLocation = (props: IEditLocationProps) => {
    const crossIcon: IIconProps = { iconName: 'Cancel' };
    return (
    <Stack >
        <Stack.Item>
            <AddLocationButton /> 
        </Stack.Item>
        <Stack.Item>
        <Stack>
            <Stack.Item>
                <Stack horizontal>
                    <Stack.Item align="start">
                        <Text variant="large">{(props.mode == "edit" ? "Edit" : "New") + " Location"}</Text>
                    </Stack.Item>
                    <Stack.Item align="end">
                        <ActionButton onClick={() => console.log("close panel")} iconProps={crossIcon} />
                    </Stack.Item>
                </Stack>
            </Stack.Item>
            <Stack.Item>
                <TextField label="Name" required={true}/>
                <Categories />
                <Coordinates />
                <Stack horizontal>
                    <Stack.Item align="end" styles={stackItemStyles}>
                        <PrimaryButton text="Save" onClick={() => console.log()} />
                    </Stack.Item>
                </Stack>
            </Stack.Item>
        </Stack>
        </Stack.Item>
    </Stack>
    );
}

export default EditLocation;