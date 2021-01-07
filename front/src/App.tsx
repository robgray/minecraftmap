import './App.css';
import 'office-ui-fabric-react/dist/css/fabric.css';
import Map from './components/MinecraftMap';
import React, { useState } from "react";
import { initializeIcons, Stack } from '@fluentui/react';
import { realm } from './api/testData';
import Sidebar from "./components/Sidebar";
import { ILocation, INewLocation, ICoordinate } from "./api/location";
import Guid from "./api/guid";

initializeIcons();

const App: React.FC = () => {
  
  const [locations, setLocations] = useState(realm.locations);
  const [center, setCenter] = useState<ICoordinate | undefined>(undefined);

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
    console.log("new location", location);

    // Send new location request to server
    // Get new map Id back

    const tempLocations = [...locations];

    // newLocation will come back from the server.
    const newLocation: ILocation = {
      id: "123123123123123",
      map: 0,
      ...location
    }

    tempLocations.push(newLocation);

    setLocations(tempLocations);

    console.log("locations", locations);
  }

  const deleteLocation = (id: Guid) => {
    const tempLocations = [...locations];
    let locIndex = -1
    tempLocations.find((loc, index) => {
      if (loc.id === id) {
        locIndex = index;
        return true;
      }
      return false;
    });
    if (locIndex > -1) {
      tempLocations.splice(locIndex, 1);
    }
  
    setLocations(tempLocations);
    console.log("deleted location", locations);
  }

  const centerAtLocation = (location: ILocation) => {
    centerAtCoordinate(location.coordinate);
  }

  const centerAtCoordinate = (coordinate: ICoordinate) => {
    console.log("zoom to coord", coordinate);
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
