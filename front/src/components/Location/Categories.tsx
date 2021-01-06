import React, { useState } from "react";
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { locationTypes } from "../../api/testData";

interface ICategoriesProps
{
    value: string
}


const Categories: React.FC<ICategoriesProps> = (props: ICategoriesProps) => {

    const [locationTypeItems] = useState(locationTypes.map<IDropdownOption>(lt => { 
        return { key : lt.id, text : lt.name }; 
    }));
    
    return (
        <Dropdown 
            label="Category"
            options={locationTypeItems}
            selectedKey={props.value}
            required={true} />
    );
}

export { Categories };