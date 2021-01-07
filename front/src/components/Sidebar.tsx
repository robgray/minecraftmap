import { AddLocation } from './Location/AddLocation';
import LocationsList from './LocationList/LocationsList'
import { ILocation, ICoordinate } from "../api/location";
import { INewLocation } from "../api/location";
import Guid from "../api/guid";
import { ZoomToCoordinate } from './ZoomToCoordinate';

interface ISidebarProps
{
    locations: ILocation[];
    addLocation: ((newLocation: INewLocation) => void);
    deleteLocation: ((id: Guid) => void);
    onLocationClicked: ((location: ILocation) => void);
    onZoomClick: ((coordinate: ICoordinate) => void);
}

const Sidebar : React.FC<ISidebarProps> = (props: ISidebarProps) => {
    return (
      <>
        <AddLocation saveNewLocation={props.addLocation} />
        <ZoomToCoordinate onZoomClick={props.onZoomClick} />
        <LocationsList 
            locations={props.locations} 
            onDelete={props.deleteLocation} 
            onLocationClicked={props.onLocationClicked}
            />
      </>
    );
  }
  
  export default Sidebar;