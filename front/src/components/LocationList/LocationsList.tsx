import { Stack, IStackTokens, IStackItemStyles, Text, IStackStyles } from 'office-ui-fabric-react';
import { ListItem } from "./LocationListItem";
import { UpdateLocationRequest, LocationModel } from "../../api/client";
import { LocationsFilter } from "./LocationFilter";
import { useLocations } from '../../contexts/LocationsContext';

import Guid from "../../api/guid";

interface ILocationListProps {
    onLocationClicked: ((location: LocationModel) => void);
};

const LocationsList: React.FC<ILocationListProps> = (props: ILocationListProps) => {   

    const { locations, setFilter, deleteLocation, updateLocation } = useLocations();

    const sectionStackTokens: IStackTokens = { childrenGap: 5 };
    const headerStyles: IStackItemStyles = {
        root: {
            padding: 10
        }
    }
    const listStackStyles: IStackStyles = {
        root: {
            height: "calc(100vh - 44px)",
            overflowY: "scroll",
            marginLeft: 5,
            maringRight: 10,
            width: 330,
            paddingBottom: 10
        }
    }

    return (
        <Stack tokens={sectionStackTokens} styles={listStackStyles}>
            <Stack.Item styles={headerStyles}>
                <Text variant="large">Locations</Text>
            </Stack.Item>
            <Stack.Item>
                <LocationsFilter onFilter={setFilter}  />
            </Stack.Item>        
                { 
                    locations.map(location => (
                        <ListItem key={location.id}
                            location={location} 
                            onLocationClicked={props.onLocationClicked}
                            />
                        ))
                }
        </Stack>
    );
}

export default LocationsList;