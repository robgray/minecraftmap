import './App.css';
import 'office-ui-fabric-react/dist/css/fabric.css';
import Map from './components/map/MinecraftMap';
import React, { useState } from "react";
import { initializeIcons, IStackStyles, Stack } from '@fluentui/react';
import { 
  LocationModel,  
  CoordinateModel
 } from "./api/client";
import LocationsList from './components/LocationList/LocationsList';
import { MenuBar } from "./components/MenuBar";
import { LocationTypesProvider, MapsProvider, LocationsProvider, RealmsProvider } from "./Providers";
import useLocalStorage from "./hooks/useLocalStorage";
import config from "./config.json";

initializeIcons();

const App: React.FC = () => {
  
  const [center, setCenter] = useState<CoordinateModel | undefined>(undefined);
 
  const appStackStyles: IStackStyles = {
    root: {
      height: "100vh"
    }
  }

  const mainStackStyles = {
    root: {
      height: "calc(100vh - 44px)",
    }
  }

  const sidebarItemStyles = {
    root: {
      margin: 0,
      width: 340,
    }
  }

  const mapStackItemStyles = {
    root: {
      display: "flex",
      margin: 0,
      padding: 0,
      width: "100%"
    }
  }


  const gotoLocation = (location: LocationModel) => {
    centerAtCoordinate(location.coordinate||{x:0, y: 0, z:0});
  }

  const centerAtCoordinate = (coordinate: CoordinateModel) => {
    setCenter(coordinate);
  }

  return (
    <RealmsProvider>
      <LocationTypesProvider>
        <LocationsProvider>
          <MapsProvider>
            <Stack styles={appStackStyles}>
                <MenuBar onZoomClick={centerAtCoordinate} />
              <Stack horizontal styles={mainStackStyles}>
                <Stack.Item styles={sidebarItemStyles}>
                  <LocationsList onLocationClicked={gotoLocation} />
                </Stack.Item>
                <Stack.Item styles={mapStackItemStyles}>
                  <Map center={center} />
                </Stack.Item>
              </Stack>  
            </Stack>
          </MapsProvider>
        </LocationsProvider>
      </LocationTypesProvider>
    </RealmsProvider>
  );
}   

export default App;
