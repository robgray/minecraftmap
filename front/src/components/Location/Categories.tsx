import React, { useEffect, useState } from "react";
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { useLocationTypes } from "../../contexts/LocationTypesContext";

interface ICategoriesProps
{
    value: string;
    onChange: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => void;
}

const Categories: React.FC<ICategoriesProps> = (props: ICategoriesProps) => {

    const { locationTypes } = useLocationTypes();
    const [locationTypeItems, setLocationTypeItems] = useState([] as IDropdownOption[]);

    useEffect(() => {
        const fetchData = async () => {
            setLocationTypeItems(locationTypes.map<IDropdownOption>(lt => { 
                return { key : lt.id||"", text : (lt.name || "<unknown>") };    
            }));
        }
        fetchData();
    }, [locationTypes]);
    
    return (<Dropdown 
                label="Category"
                options={locationTypeItems}
                selectedKey={props.value}
                required={true} 
                onChange={props.onChange}
                />);
}


export { Categories };