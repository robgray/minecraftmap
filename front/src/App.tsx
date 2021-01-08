import './App.css';
import 'office-ui-fabric-react/dist/css/fabric.css';
import Map from './components/MinecraftMap';
import React, { useEffect, useState } from "react";
import { initializeIcons, Stack } from '@fluentui/react';
import Sidebar from "./components/Sidebar";
import { ILocation, INewLocation, ICoordinate } from "./api/location";
import { ApiClient, INewLocationRequest } from "./api/apiClient";
import Guid from "./api/guid";

ApiClient.settings.initialize();
initializeIcons();

const App: React.FC = () => {

  const [locations, setLocations] = useState([] as ILocation[]);
  const [center, setCenter] = useState<ICoordinate | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const realm = await ApiClient.methods.getRealm(ApiClient.settings.RealmKey);
      if (realm != null) {
        setLocations(realm.locations);
      }
    }

    fetchData();
  }, [])

  const sidebarItemStyles = {
    root: {
      padding: 5,
      width: 320
    }
  }

  const mapStackItemStyles = {
    root: {
      display: "flex",
      paddingLeft: 5,
      width: "100%"
    }
  }

  const addLocation = (location: INewLocation) => {

    const postData = async (newLocation: INewLocationRequest) => {
      const realm = await ApiClient.methods.saveLocation(ApiClient.settings.RealmKey, newLocation);
      if (realm && realm.locations && realm.locations.length > 0) {
        setLocations(realm.locations);
      } else {
        setLocations([] as ILocation[]);
      }
    }

    postData({
      name: location.name,
      x: location.coordinate.x,
      y: location.coordinate.y,
      z: location.coordinate.z,
      locationTypeId: location.typeId
    });

    console.log("locations", locations);
  }

  const deleteLocation = (id: Guid) => {

    const deleteData = async (locationId: Guid) => {
      const realm = await ApiClient.methods.deleteLocation(ApiClient.settings.RealmKey, locationId);
      if (realm) {
        setLocations(realm.locations);
      }
    }

    deleteData(id);
  }

  const centerAtLocation = (location: ILocation) => {
    centerAtCoordinate(location.coordinate);
  }

  const centerAtCoordinate = (coordinate: ICoordinate) => {
    setCenter(coordinate);
  }

  return (
    <Stack horizontal>
      <Stack.Item styles={sidebarItemStyles} align="start">
        <Sidebar locations={locations} 
          addLocation={addLocation} 
          deleteLocation={deleteLocation}
          onLocationClicked={centerAtLocation}
          onZoomClick={centerAtCoordinate}
           />
      </Stack.Item>
      <Stack.Item styles={mapStackItemStyles} align="end">
        <Map locations={locations} center={center}  />
      </Stack.Item>
    </Stack>
  );
}   

export default App;
