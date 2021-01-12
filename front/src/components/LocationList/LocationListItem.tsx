import { Text, Stack, IStackTokens } from 'office-ui-fabric-react';
import { useBoolean } from '@uifabric/react-hooks';
import { Card, ICardTokens, ICardStyles, ICardItemStyles, ICardItemTokens, ICardSectionStyles } from '@uifabric/react-cards';
import { ILocation } from "../../api/location";
import { DeleteButton } from "../DeleteButton";
import { EditButton } from "../EditButton";
import { CoordinateLabel } from "./CoordinateLabel";
import { Customizer } from 'office-ui-fabric-react/lib/Utilities';
import { EditLocation } from "../Location/EditLocation";
import Guid from "../../api/guid";
import { IUpdateLocationRequest } from "../../api/apiClient";
import { OptionsDisplay } from "./OptionsDisplay";

interface ILocationListItemProps {
    location: ILocation;
    onDelete: ((id: Guid) => void);
    onLocationClicked: ((location: ILocation) => void);
    onUpdateLocation: ((lLocation: IUpdateLocationRequest) => void);
}

const buttonTokens: IStackTokens = {
    childrenGap: 0,
    padding: 0
}

const ListItem: React.FC<ILocationListItemProps> = (props: ILocationListItemProps) => {

    const [isEditLocationOpen, { setTrue: openEditLocationPanel, setFalse: dismissEditLocationPanel }] = useBoolean(false);

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
    const mainCardSectionStyles: ICardSectionStyles = {
        root:
        {
            paddingTop: 0
        }
    }

    const buttonHeight = 30;
    const buttonFontSize = 15;

    return (
        <Card horizontal tokens={cardTokens} onClick={() => props.onLocationClicked(props.location)} styles={cardStyles}>
            <Card.Item styles={mapNumberSectionStyle}>
                <Text variant="xLarge">{props.location.mapNumber}</Text>
            </Card.Item>
            <Card.Section styles={mainCardSectionStyles}>
                <Text block nowrap>{props.location.name}</Text>
                <CoordinateLabel coordinate={props.location.coordinate} />
                <OptionsDisplay location={props.location} />
            </Card.Section>
            <Card.Item grow={1}>
                <span/>
            </Card.Item>
            <Card.Item styles={deleteStyles} tokens={deleteTokens}>
                <Stack tokens={buttonTokens}>
                    <EditButton onEdit={() => openEditLocationPanel() } height={buttonHeight} fontSize={buttonFontSize} />
                    <DeleteButton onDelete={() => props.onDelete(props.location.id)} identifyingName={props.location.name} height={buttonHeight} fontSize={buttonFontSize}  />
                    <Customizer>
                        { 
                            isEditLocationOpen && (
                                <EditLocation
                                    location={props.location}
                                    isOpen={isEditLocationOpen} 
                                    openPanel={openEditLocationPanel}
                                    dismissPanel={dismissEditLocationPanel}
                                    saveLocation={props.onUpdateLocation} />
                            )
                        }
                    </Customizer>
                </Stack>
            </Card.Item>
        </Card>
    );
}

export { ListItem }