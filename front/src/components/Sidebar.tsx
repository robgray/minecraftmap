import { AddLocation } from './Location/AddLocation';
import LocationsList from './LocationList/LocationsList'
import { ILocation } from "../api/location";
import { ActionButton, IIconProps } from 'office-ui-fabric-react';
import { INewLocation } from "../api/location";

interface ISidebarProps
{
    locations: ILocation[],
    addLocation: ((newLocation: INewLocation) => void),
    deleteLocation: Function,
}

const Sidebar : React.FC<ISidebarProps> = (props: ISidebarProps) => {
    return (
      <>
        <AddLocation saveNewLocation={props.addLocation} />
        <LocationsList locations={props.locations} onDelete={props.deleteLocation} />
      </>
    );
  }
  
  export default Sidebar;