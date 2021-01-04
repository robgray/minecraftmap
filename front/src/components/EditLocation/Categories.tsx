import React, { useState } from "react";
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { locationTypes } from "../../api/testData";

const Categories: React.FC = () => {

    const [locationTypeItems] = useState(locationTypes.map<IDropdownOption>(lt => { 
        return { key : lt.id, text : lt.name }; 
    }));
    
    return (
        <Dropdown 
            label="Category"
            options={locationTypeItems}
            required={true} />
    );
}

export { Categories };