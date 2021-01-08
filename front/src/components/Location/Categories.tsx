import React, { useEffect, useState } from "react";
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { ApiClient } from "../../api/apiClient";

interface ICategoriesProps
{
    value: string;
    onChange: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => void;
}


const Categories: React.FC<ICategoriesProps> = (props: ICategoriesProps) => {

    const [locationTypeItems, setLocationTypeItems] = useState([] as IDropdownOption[]);

    useEffect(() => {
        const fetchData = async () => {
            const serverLocationTypes = await ApiClient.methods.getLocationTypes();
            console.log("locationtypes from server", serverLocationTypes);
            if (serverLocationTypes != null)
            setLocationTypeItems(serverLocationTypes.map<IDropdownOption>(lt => { 
                return { key : lt.id, text : lt.name };    
            }));
        }

        fetchData();
    }, []);
    
    return (
        <Dropdown 
            label="Category"
            options={locationTypeItems}
            selectedKey={props.value}
            required={true} 
            onChange={props.onChange}
            />
    );
}

export { Categories };