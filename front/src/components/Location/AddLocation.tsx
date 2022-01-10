import { PrimaryButton, TextField, Stack, IStackItemStyles, Separator, IStackTokens } from 'office-ui-fabric-react';
import React, { useEffect, useState } from "react";
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { CoordinateControl } from "./CoordinateControl";
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { Categories } from "./Categories";
import { useLocations } from '../../contexts/LocationsContext';

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

interface IAddLocationProps {
    dismissPanel: (() => void);
    openPanel: (() => void);
    isOpen: boolean;
}

const AddLocation: React.FC<IAddLocationProps> = (props: IAddLocationProps) => {

    const { addLocation } = useLocations();

    const [ name, setName ] = useState("");
    const [ categoryId, setCategoryId ] = useState("");
    const [ coordinate, setCoordinate ] = useState({ x: "", z: "", y: "" });
    const [ hasAnvil, setAnvil ] = useState(false);
    const [ hasBed, setBed ] = useState(false)
    const [ hasPortal, setPortal ] = useState(false);
    const [ hasEnderChest, setEnderChest ] = useState(false);
    const [ hasEnchantmentTable, setEnchantmentTable ] = useState(false);
    const [ hasFurnace, setFurnace ] = useState(false);
    const [ notes, setNotes] = useState("");

    const clearPanel = () => {
        setName("");
        setCategoryId("");
        setCoordinate({ x: "", z: "", y: ""});
        setAnvil(false);
        setBed(false);
        setEnderChest(false);
        setEnchantmentTable(false);
        setPortal(false);
        setFurnace(false);
        setNotes("");
    }

    useEffect(() => {
        clearPanel();
    }, []);

    return (
        <Panel
            headerText="Add Location"
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
                        setCoordinate({ x: coord.x, y: coord.y, z: coord.z })
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
                                addLocation(
                                {
                                    name: name,
                                    coordinate: { 
                                        x: Number.parseInt(coordinate.x, 10),
                                        y: Number.parseInt(coordinate.y, 10),
                                        z: Number.parseInt(coordinate.z, 10)
                                    },
                                    typeId: categoryId,
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

export { AddLocation };