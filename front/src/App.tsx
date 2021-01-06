import './App.css';
import 'office-ui-fabric-react/dist/css/fabric.css';
import Map from './components/MinecraftMap';
import React, { useState } from "react";
import { initializeIcons, Stack } from '@fluentui/react';
import { realm } from './api/testData';
import Sidebar from "./components/Sidebar";
import { ILocation } from "./api/location";
import Guid from "./api/guid";

function App() {
  initializeIcons();

  const [locations, setLocations] = useState(realm.locations);
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

  const addLocation = (location: ILocation) => {
    alert("add location");
  }

  const updateLocation = (location: ILocation) => {
    alert("update location");
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

  return (
    <Stack horizontal>
      <Stack.Item styles={sidebarItemStyles} align="start">
        <Sidebar locations={locations} 
          addLocation={addLocation} 
          updateLocation={updateLocation}
          deleteLocation={deleteLocation} />
      </Stack.Item>
      <Stack.Item styles={mapStackItemStyles} align="end">
        <Map locations={locations}  />
      </Stack.Item>
    </Stack>
  );
}   

export default App;
