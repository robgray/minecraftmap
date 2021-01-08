import { Text } from 'office-ui-fabric-react';
import { Card, ICardTokens, ICardStyles, ICardItemStyles, ICardItemTokens } from '@uifabric/react-cards';
import { ILocation } from "../../api/location";
import { DeleteButton } from "../DeleteButton";
import { CoordinateLabel } from "./CoordinateLabel";
import Guid from "../../api/guid";

interface ILocationListItemProps {
    location: ILocation;
    onDelete: ((id: Guid) => void);
    onLocationClicked: ((location: ILocation) => void);
}

const ListItem: React.FC<ILocationListItemProps> = (props: ILocationListItemProps) => {

    const mapNumberSectionStyle: ICardItemStyles = {
        root: {
            alignSelf: 'stretch',
            borderRight: '1px solid #F3F2F1',
            padding: 10,
            marginRight: 5
          }
    }
    const deleteStyles: ICardItemStyles = {
        root: {
            alignSelf: 'stretch',
            borderLeft: '1px solid #F3F2F1',
          }
    }
    const deleteTokens: ICardItemTokens = {
        padding: "0px 0px 0px 10px"
    }
    const cardTokens: ICardTokens = { childrenMargin: 8 };
    const cardStyles: ICardStyles = {
        root: {
            marginLeft: 5,
            marginRight: 15
        }
    }

    return (
        <Card horizontal tokens={cardTokens} onClick={() => props.onLocationClicked(props.location)} styles={cardStyles}>
            <Card.Item styles={mapNumberSectionStyle}>
                <Text variant="xLarge">{"n/a"}</Text>
            </Card.Item>
            <Card.Section>
                <Text block>{props.location.name}</Text>
                <CoordinateLabel coordinate={props.location.coordinate} />
            </Card.Section>
            <Card.Item grow={1}>
                <span/>
            </Card.Item>
            <Card.Item styles={deleteStyles} tokens={deleteTokens}>
                <DeleteButton onDelete={() => props.onDelete(props.location.id)} />
            </Card.Item>
        </Card>
    );
}

export { ListItem }