import { EditLocation, EditLocationMode } from './EditLocation/EditLocation';
import LocationsList from './LocationList/LocationsList'
import { ILocation } from "../api/location";

interface ISidebarProps
{
    locations: ILocation[],
    addLocation: Function,
    updateLocation: Function,
    deleteLocation: Function,
}

const Sidebar : React.FC<ISidebarProps> = (props: ISidebarProps) => {
    return (
      <>
        <EditLocation saveNewLocation={props.addLocation} updateLocation={props.updateLocation} mode={EditLocationMode.New} />
        <LocationsList locations={props.locations} onDelete={props.deleteLocation} />
      </>
    );
  }
  
  export default Sidebar;