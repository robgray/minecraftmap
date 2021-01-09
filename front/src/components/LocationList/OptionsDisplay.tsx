import React from "react";
import { ILocation } from "../../api/location";
import { Stack } from 'office-ui-fabric-react';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { mergeStyles, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

interface IOptionsDisplayProps
{
    location: ILocation;
}

const iconClass = mergeStyles({
    fontSize: 10,
    height: 10,
    width: 10,
    margin: '0 5px',
  });

  const classNames = mergeStyleSets({
    portal: [{ color: 'purple'}, iconClass],
    anvil: [{ color: 'black' }, iconClass],
    bed: [{ color: 'grey' }, iconClass],
    enchantmentTable: [{ color: 'green' }, iconClass],
    enderChest: [{ color: 'orange' }, iconClass],
    furnace: [{ color: 'red' }, iconClass]
  });

export const OptionsDisplay: React.FC<IOptionsDisplayProps> = (props: IOptionsDisplayProps) => {

    return (
        <Stack horizontal>
            {props.location.hasPortal && (<FontIcon  iconName="LocationFill" className={classNames.portal} />)}
            {props.location.hasAnvil && (<FontIcon  iconName="LocationFill" className={classNames.anvil} />)}
            {props.location.hasBed && (<FontIcon  iconName="LocationFill" className={classNames.bed} />)}
            {props.location.hasEnchantmentTable && (<FontIcon  iconName="LocationFill" className={classNames.enchantmentTable} />)}
            {props.location.hasEnderChest && (<FontIcon  iconName="LocationFill" className={classNames.enderChest} />)}
            {props.location.hasFurnace && (<FontIcon  iconName="LocationFill" className={classNames.furnace} />)}
        </Stack>
    );
}