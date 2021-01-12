import React, { useState } from "react";
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Stack, IStackTokens, IStackItemStyles, Text, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import { Categories } from "../Location/Categories";
import Guid from "../../api/guid";

const checkboxStackTokens: IStackTokens = {
    childrenGap: 10,
    padding: 20
};

const stackItemStyles: IStackItemStyles = {
    root: {
      padding: 0,
      paddingTop: 20,
      paddingBottom: 40
    },
  };

export interface ILocationFilter {
    hasAnvil: boolean;
    hasBed: boolean;
    hasPortal: boolean;
    hasEnderChest: boolean;
    hasEnchantmentTable: boolean;
    hasFurnace: boolean;
    typeId: Guid;
}

interface ILocationsFilterProps {
    onFilter: ((filter: ILocationFilter) => void)
}

export const LocationsFilter: React.FC<ILocationsFilterProps> = (props: ILocationsFilterProps) => {

    const [ categoryId, setCategoryId ] = useState("");

    const [ hasAnvil, setAnvil ] = useState(false);
    const [ hasBed, setBed ] = useState(false)
    const [ hasPortal, setPortal ] = useState(false);
    const [ hasEnderChest, setEnderChest ] = useState(false);
    const [ hasEnchantmentTable, setEnchantmentTable ] = useState(false);
    const [ hasFurnace, setFurnace ] = useState(false); 

    const clear = () => {
        setAnvil(false);
        setBed(false);
        setPortal(false);
        setEnderChest(false);
        setEnchantmentTable(false);
        setFurnace(false);
        setCategoryId("");

        props.onFilter({
            hasAnvil: false,
            hasBed: false,
            hasPortal: false,
            hasEnderChest: false,
            hasEnchantmentTable: false,
            hasFurnace: false,
            typeId: ""
        });
    }

    return (
        <Stack tokens={checkboxStackTokens}>
            <Text>Filter</Text>
            <Categories value={categoryId} onChange={(e, o) => {
                        if (o) setCategoryId(o.key.toString())
                        }} />
            <Checkbox label="Anvil" checked={hasAnvil} onChange={(ev:React.FormEvent<HTMLElement | HTMLInputElement> | undefined, checked: boolean | undefined) => setAnvil(!!checked)} />
            <Checkbox label="Bed" checked={hasBed} onChange={(ev:React.FormEvent<HTMLElement | HTMLInputElement> | undefined, checked: boolean | undefined) => setBed(!!checked)} />
            <Checkbox label="Enchantment Table" checked={hasEnchantmentTable} onChange={(ev:React.FormEvent<HTMLElement | HTMLInputElement> | undefined, checked: boolean | undefined) => setEnchantmentTable(!!checked)} />
            <Checkbox label="Ender Chest" checked={hasEnderChest} onChange={(ev:React.FormEvent<HTMLElement | HTMLInputElement> | undefined, checked: boolean | undefined) => setEnderChest(!!checked)} />
            <Checkbox label="Furnace" checked={hasFurnace} onChange={(ev:React.FormEvent<HTMLElement | HTMLInputElement> | undefined, checked: boolean | undefined) => setFurnace(!!checked)} />
            <Checkbox label="Portal" checked={hasPortal} onChange={(ev:React.FormEvent<HTMLElement | HTMLInputElement> | undefined, checked: boolean | undefined) => setPortal(!!checked)} />
            <Stack.Item>
                <Stack horizontal tokens={{ childrenGap: 5 }}>
                    <Stack.Item align="end" styles={stackItemStyles}>
                        <DefaultButton text="Clear" onClick={() => clear()}/>
                    </Stack.Item>
                    <Stack.Item align="end" styles={stackItemStyles}>
                        <PrimaryButton text="Filter" onClick={() => props.onFilter({
                            hasAnvil,
                            hasBed,
                            hasPortal,
                            hasEnderChest,
                            hasEnchantmentTable,
                            hasFurnace,
                            typeId: categoryId
                        })} />
                    </Stack.Item>
                </Stack>
            </Stack.Item>
        </Stack>
    )
}