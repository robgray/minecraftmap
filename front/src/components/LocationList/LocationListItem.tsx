import { Stack, IStackTokens, Text } from 'office-ui-fabric-react';
import { Card, ICardTokens, ICardSectionStyles, ICardSectionTokens } from '@uifabric/react-cards';
import { ICoordinate, ILocation } from "../../api/location";
import { DeleteButton } from "../DeleteButton";
import { CoordinateLabel } from "./CoordinateLabel";
import Guid from "../../api/guid";

interface ILocationProps {
    location: ILocation;
    onDelete: Function;
}

const ListItem: React.FC<ILocationProps> = (props: ILocationProps) => {

    const cardTokens: ICardTokens = { childrenMargin: 5 };
    const itemAlignmentsStackTokens: IStackTokens = {
        childrenGap: 5,
        padding: 3,
    };

    return (
        <Card horizontal tokens={cardTokens}>
            <Card.Item>
                <Stack horizontal tokens={itemAlignmentsStackTokens}>
                    <Stack.Item align="start">
                        <Text variant="xLarge">3</Text>
                    </Stack.Item>
                    <Stack.Item align="start">
                        <Stack>
                            <Text block>{props.location.name}</Text>
                            <CoordinateLabel coordinate={props.location.coordinate} />
                        </Stack>     
                    </Stack.Item>
                    <Stack.Item align="end">
                        <DeleteButton onDelete={() => { console.log("Deleted this")}} />
                    </Stack.Item>
                </Stack>
            </Card.Item>
        </Card>
    );
}

export { ListItem }