import { Stack, IStackTokens, IStackItemStyles, Text, IStackStyles } from 'office-ui-fabric-react';
import { ListItem } from "./LocationListItem";
import { ILocation } from "../../api/location";
import { IUpdateLocationRequest } from "../../api/apiClient";

import Guid from "../../api/guid";

interface ILocationListProps {
    locations: ILocation[];
    onDelete: ((id: Guid) => void);
    onLocationClicked: ((location: ILocation) => void);
    onUpdateLocation: ((lLocation: IUpdateLocationRequest) => void);
};

const LocationsList: React.FC<ILocationListProps> = (props: ILocationListProps) => {   
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
            {props.locations.map(location => {
                return (
                            <ListItem key={location.id}
                                location={location} 
                                onDelete={() => props.onDelete(location.id)} 
                                onLocationClicked={props.onLocationClicked}
                                onUpdateLocation={props.onUpdateLocation} />
                        )
            })}
        </Stack>
    );
}

export default LocationsList;