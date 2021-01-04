import { ICoordinate } from "../../api/location";
import { Stack, IStackTokens, Text } from 'office-ui-fabric-react';
import { ListItem } from "./LocationListItem";
import { ILocation } from "../../api/location";

import Guid from "../../api/guid";

interface ILocationListProps {
    locations: ILocation[]
};

const LocationsList: React.FC<ILocationListProps> = (props: ILocationListProps) => {   
    const sectionStackTokens: IStackTokens = { childrenGap: 5 };

    const deleteLocation = (id: string | undefined) => {
        // TODO: hook this up for delete.
        console.log("Id", id);
    }

    return (
        <Stack tokens={sectionStackTokens}>
            <Stack.Item>
                <Text variant="large">Locations</Text>
            </Stack.Item>
            {props.locations.map(location => {
                return (
                    <Stack.Item>
                        <ListItem 
                            location={location} 
                            onDelete={() => deleteLocation(location.id)} />
                    </Stack.Item>
                )})}
        </Stack>
    );
}

export default LocationsList;