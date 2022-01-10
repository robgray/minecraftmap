import React, { useEffect, useState } from "react";
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { useRealms } from "../../contexts/RealmsContext";

interface IRealmsProps
{
    value: string;
    onChange: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => void;
}

const Realms: React.FC<IRealmsProps> = (props: IRealmsProps) => {

    const { allRealms } = useRealms();
    const [realmItems, setRealmItems] = useState([] as IDropdownOption[]);

    useEffect(() => {
        const fetchData = async () => {
          setRealmItems(allRealms.map<IDropdownOption>(r => { 
            return { key : r.id||"", text : (r.name || "<unknown>") };    
          }));
        }

        console.log("the realms", allRealms)
        fetchData();
    }, [allRealms]);
    
    return (<Dropdown 
                label="New Realm"
                options={realmItems}
                selectedKey={props.value}
                onChange={props.onChange}
                />);
}

export { Realms };