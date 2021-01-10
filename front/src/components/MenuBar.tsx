import React from 'react';
import { useBoolean } from '@uifabric/react-hooks';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { Customizer } from 'office-ui-fabric-react/lib/Utilities';
import { AddLocation } from "../components/Location/AddLocation";
import { ZoomToCoordinate } from '../components/ZoomToCoordinate';
import { INewLocation, ICoordinate } from "../api/location";
import { Text, Stack } from 'office-ui-fabric-react';

import { IImageProps, ImageFit, Image } from 'office-ui-fabric-react/lib/Image';
import gridImage from "../images/samplegrid.png";

import { useId } from '@uifabric/react-hooks';
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  Modal,
} from 'office-ui-fabric-react';

interface IMenuBarProps 
{
    saveNewLocation: ((newLocation: INewLocation) => void);
    onZoomClick: ((coordinate: ICoordinate) => void);
}

const mapImageProps: IImageProps = { src: gridImage, alt: "Map numbers", imageFit: ImageFit.center }

export const MenuBar: React.FC<IMenuBarProps> = (props:IMenuBarProps) => {

    const [isAddLocationOpen, { setTrue: openAddLocationPanel, setFalse: dismissAddLocationPanel }] = useBoolean(false);
    const [isZoomToCoordianteOpen, { setTrue: openZoomToCoordinatePanel, setFalse: dismissZoomToCoordinatePanel }] = useBoolean(false);
    const [isMapModalOpen, { setTrue: showMapModal, setFalse: hideMapModal }] = useBoolean(false);

    const _items: ICommandBarItemProps[] = [
        {
          key: 'addLocation',
          text: 'Add Location',
          iconProps: { iconName: 'Add' },
          onClick: () => openAddLocationPanel()
        },
        {
          key: 'zoom',
          text: 'Zoom to Coordinate',
          iconProps: { iconName: 'Zoom' },
          onClick: () => openZoomToCoordinatePanel()
        }
      ];

      const _farItems: ICommandBarItemProps[] = [
        {
          key: 'mapImage',
          ariaLabel: 'Map Image',
          iconOnly: true,
          iconProps: { iconName: 'Info' },
          onClick: () => showMapModal(),
        },
      ];

    const modalId = useId("MapNumberingExplainedModal");

    return (
      <div>
        <CommandBar
            items={_items}
            farItems={_farItems}
            ariaLabel="Use left and right arrow keys to navigate between commands"
        />
        <Modal
            titleAriaId={modalId}
            isOpen={isMapModalOpen}
            onDismiss={hideMapModal}
            isBlocking={false}>
            <div className={contentStyles.header}>
                <Stack>
                    <Text block variant="xxLarge">Map Numbering Explained</Text>
                    <Image src={gridImage} alt="Map Numbering" />
                </Stack>
            </div>
        </Modal>
        <Customizer>
            {
                isAddLocationOpen && (
                    <AddLocation 
                        isOpen={isAddLocationOpen} 
                        openPanel={openAddLocationPanel}
                        dismissPanel={dismissAddLocationPanel}
                        saveNewLocation={props.saveNewLocation}
                        />
                )
            }
        </Customizer>
        <Customizer>
            {
                isZoomToCoordianteOpen && (
                    <ZoomToCoordinate 
                        onZoomClick={props.onZoomClick} 
                        isOpen={isZoomToCoordianteOpen}
                        dismissPanel={dismissZoomToCoordinatePanel}
                        openPanel={openZoomToCoordinatePanel} />
                )
            }
        </Customizer>
      </div>
    );
};

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
  },
  header: [
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 24px',
    },
  ],
  body: {
    flex: '4 4 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
});
const toggleStyles = { root: { marginBottom: '20px' } };
const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};