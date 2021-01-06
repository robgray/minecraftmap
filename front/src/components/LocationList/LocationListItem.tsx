import { Stack, IStackTokens, Text, IStackItemStyles, DefaultPalette, IStackStyles } from 'office-ui-fabric-react';
import { Card, ICardTokens, ICardSectionStyles, ICardSectionTokens, ICardItemStyles, ICardItemTokens } from '@uifabric/react-cards';
import { ICoordinate, ILocation } from "../../api/location";
import { DeleteButton } from "../DeleteButton";
import { CoordinateLabel } from "./CoordinateLabel";
import Guid from "../../api/guid";

interface ILocationProps {
    location: ILocation;
    onDelete: Function;
}

const ListItem: React.FC<ILocationProps> = (props: ILocationProps) => {

    const mapNumberSectionStyle: ICardItemStyles = {
        root: {
            alignSelf: 'stretch',
            borderRight: '1px solid #F3F2F1',
            padding: 10,
            marginRight: 5
          }
    }
    const mapNameStyles: ICardSectionStyles = {

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

    return (
        <Card horizontal tokens={cardTokens}>
            <Card.Item styles={mapNumberSectionStyle}>
                <Text variant="xLarge">{props.location.map}</Text>
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