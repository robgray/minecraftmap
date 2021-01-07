import { Stack, IStackTokens, Text } from 'office-ui-fabric-react';
import { ListItem } from "./LocationListItem";
import { ILocation } from "../../api/location";

import Guid from "../../api/guid";

interface ILocationListProps {
    locations: ILocation[];
    onDelete: ((id: Guid) => void);
    onLocationClicked: ((location: ILocation) => void);
};

const LocationsList: React.FC<ILocationListProps> = (props: ILocationListProps) => {   
    const sectionStackTokens: IStackTokens = { childrenGap: 5 };

    return (
        <Stack tokens={sectionStackTokens}>
            <Stack.Item>
                <Text variant="large">Locations</Text>
            </Stack.Item>
            {props.locations.map(location => {
                return (
                            <ListItem key={location.id}
                                location={location} 
                                onDelete={() => props.onDelete(location.id)} 
                                onLocationClicked={props.onLocationClicked}/>
                        )
            })}
        </Stack>
    );
}

export default LocationsList;