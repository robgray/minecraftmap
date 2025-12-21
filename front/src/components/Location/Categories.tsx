import React, { useMemo } from "react";
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { useLocationTypes } from "../../contexts/LocationTypesContext";

interface ICategoriesProps
{
    value: string;
    onChange: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => void;
}

const Categories: React.FC<ICategoriesProps> = ({ value, onChange }) => {

    const { locationTypes } = useLocationTypes();

    const options = useMemo(() => 
        locationTypes.map<IDropdownOption>(lt => ({
            key: lt.id || "",
            text: lt.name || "<unknown>"
        })),
        [locationTypes]
    );
    
    return (
        <Dropdown 
            label="Category"
            options={options}
            selectedKey={value}
            required={true} 
            onChange={onChange}
        />
    );
}

export { Categories };