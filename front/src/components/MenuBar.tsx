import React from 'react';
import { useBoolean } from '@uifabric/react-hooks';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { Customizer } from 'office-ui-fabric-react/lib/Utilities';
import { AddLocation } from "../components/Location/AddLocation";
import { ZoomToCoordinate } from '../components/ZoomToCoordinate';
import { INewLocation, ICoordinate } from "../api/location";

interface IMenuBarProps 
{
    saveNewLocation: ((newLocation: INewLocation) => void);
    onZoomClick: ((coordinate: ICoordinate) => void);
}

export const MenuBar: React.FC<IMenuBarProps> = (props:IMenuBarProps) => {

    const [isAddLocationOpen, { setTrue: openAddLocationPanel, setFalse: dismissAddLocationPanel }] = useBoolean(false);
    const [isZoomToCoordianteOpen, { setTrue: openZoomToCoordinatePanel, setFalse: dismissZoomToCoordinatePanel }] = useBoolean(false);

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

    return (
      <div>
        <CommandBar
        items={_items}
        ariaLabel="Use left and right arrow keys to navigate between commands"
        />
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

  

  
  