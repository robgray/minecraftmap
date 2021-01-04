import EditLocation from './EditLocation/EditLocation';
import LocationsList from './LocationList/LocationsList'
import { IRealm } from "../api/realm";

interface ISidebarProps
{
    data: IRealm
}

const Sidebar : React.FC<ISidebarProps> = (props: ISidebarProps) => {
    return (
      <>
        <EditLocation saveNewLocation={() => console.log("save")} updateLocation={() => console.log("edit")} mode={"edit"} />
        <LocationsList locations={props.data.locations} />
      </>
    );
  }
  
  export default Sidebar;