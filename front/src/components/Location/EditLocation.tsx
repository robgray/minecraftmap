import { PrimaryButton, TextField, Stack, IStackItemStyles, Separator, IStackTokens } from 'office-ui-fabric-react';
import React, { useState } from "react";
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { CoordinateControl } from "./CoordinateControl";
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { Categories } from "./Categories";
import { LocationModel, CoordinateModel } from "../../api/client";
import { useLocations } from "../../contexts/LocationsContext";


const stackItemStyles: IStackItemStyles = {
    root: {
      padding: 0,
      paddingTop: 20,
      paddingBottom: 40
    },
  };

const checkboxStackTokens: IStackTokens = {
    childrenGap: 10,
    padding: 20
};

interface IEditLocationProps {
    location: LocationModel;
    dismissPanel: (() => void);
    openPanel: (() => void);
    isOpen: boolean;
}

const CoordinateToString = (coordinate: CoordinateModel) => {
    return {
        x: (coordinate.x||'').toString(), 
        z: (coordinate.z||'').toString(), 
        y: (coordinate.y||'').toString()
    };
};

const EditLocation: React.FC<IEditLocationProps> = (props: IEditLocationProps) => {

    const { updateLocation } = useLocations();

    const [ name, setName ] = useState(props.location.name);
    const [ categoryId, setCategoryId ] = useState(props.location.typeId);
    const [ coordinate, setCoordinate ] = useState(CoordinateToString(props.location.coordinate));
    const [ hasAnvil, setAnvil ] = useState(props.location.hasAnvil);
    const [ hasBed, setBed ] = useState(props.location.hasBed)
    const [ hasPortal, setPortal ] = useState(props.location.hasPortal);
    const [ hasEnderChest, setEnderChest ] = useState(props.location.hasEnderChest);
    const [ hasEnchantmentTable, setEnchantmentTable ] = useState(props.location.hasEnchantmentTable);
    const [ hasFurnace, setFurnace ] = useState(props.location.hasFurnace);
    const [ notes, setNotes] = useState(() => props.location.notes ? props.location.notes : "");

    return (
        <Panel
            headerText="Edit Location"
            isOpen={props.isOpen}
            onDismiss={props.dismissPanel}
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
                    <Separator>Options</Separator>
                    <Stack tokens={checkboxStackTokens}>
                        <Checkbox label="Anvil" checked={hasAnvil} onChange={(ev:React.FormEvent<HTMLElement | HTMLInputElement> | undefined, checked: boolean | undefined) => setAnvil(!!checked)} />
                        <Checkbox label="Bed" checked={hasBed} onChange={(ev:React.FormEvent<HTMLElement | HTMLInputElement> | undefined, checked: boolean | undefined) => setBed(!!checked)} />
                        <Checkbox label="Enchantment Table" checked={hasEnchantmentTable} onChange={(ev:React.FormEvent<HTMLElement | HTMLInputElement> | undefined, checked: boolean | undefined) => setEnchantmentTable(!!checked)} />
                        <Checkbox label="Ender Chest" checked={hasEnderChest} onChange={(ev:React.FormEvent<HTMLElement | HTMLInputElement> | undefined, checked: boolean | undefined) => setEnderChest(!!checked)} />
                        <Checkbox label="Furnace" checked={hasFurnace} onChange={(ev:React.FormEvent<HTMLElement | HTMLInputElement> | undefined, checked: boolean | undefined) => setFurnace(!!checked)} />
                        <Checkbox label="Portal" checked={hasPortal} onChange={(ev:React.FormEvent<HTMLElement | HTMLInputElement> | undefined, checked: boolean | undefined) => setPortal(!!checked)} />
                    </Stack>
                    <TextField label="Notes" multiline rows={5} value={notes} onChange={(e, newValue) => setNotes(newValue ? newValue : "")} />
                    <Stack horizontal>
                        <Stack.Item align="end" styles={stackItemStyles}>
                            <PrimaryButton text="Save" onClick={() => { 
                                updateLocation(props.location.id, 
                                {
                                    name: name,
                                    locationTypeId: categoryId,
                                    hasAnvil: hasAnvil,
                                    hasBed: hasBed,
                                    hasEnchantmentTable: hasEnchantmentTable,
                                    hasEnderChest: hasEnderChest,
                                    hasPortal: hasPortal,
                                    hasFurnace: hasFurnace,
                                    notes: notes ? notes : ""
                                });
                                props.dismissPanel();
                            }} />
                        </Stack.Item>
                    </Stack>
                </Stack.Item>
            </Stack>
        </Panel>
    );
}

export { EditLocation };