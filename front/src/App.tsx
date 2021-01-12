import './App.css';
import 'office-ui-fabric-react/dist/css/fabric.css';
import Map from './components/MinecraftMap';
import React, { useEffect, useState } from "react";
import { initializeIcons, IStackStyles, Stack } from '@fluentui/react';
import { ILocation, INewLocation, ICoordinate } from "./api/location";
import { ApiClient, INewLocationRequest, IUpdateLocationRequest } from "./api/apiClient";
import LocationsList from './components/LocationList/LocationsList';
import { ILocationFilter } from "./components/LocationList/LocationFilter";
import { MenuBar } from "./components/MenuBar";

import Guid from "./api/guid";

ApiClient.settings.initialize();
ApiClient.methods.getLocationTypes();
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

  const addLocation = (location: INewLocation) => {

    const postData = async (newLocation: INewLocationRequest) => {
      const realm = await ApiClient.methods.saveLocation(ApiClient.settings.RealmKey, newLocation);
      if (realm && realm.locations && realm.locations.length > 0) {
        setLocations(realm.locations);
      } else {
        setLocations([] as ILocation[]);
      }
    }
    const newDataObj: INewLocationRequest = {
      name: location.name,
      x: location.coordinate.x,
      y: location.coordinate.y,
      z: location.coordinate.z,
      locationTypeId: location.typeId,
      hasAnvil: location.hasAnvil,
      hasBed: location.hasBed,
      hasEnchantmentTable: location.hasEnchantmentTable,
      hasFurnace: location.hasFurnace,
      hasEnderChest: location.hasEnderChest,
      hasPortal: location.hasPortal,
      notes: location.notes
    }

    postData(newDataObj);
  }

  const updateLocation = (location: IUpdateLocationRequest) => {

    const postData = async (location: IUpdateLocationRequest) => {
      const realm = await ApiClient.methods.updateLocation(ApiClient.settings.RealmKey, location);
      if (realm && realm.locations && realm.locations.length > 0) {
        setLocations(realm.locations);
      } else {
        setLocations([] as ILocation[]);
      }
    }

    postData(location);
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

  const gotoLocation = (location: ILocation) => {
    centerAtCoordinate(location.coordinate);
  }

  const centerAtCoordinate = (coordinate: ICoordinate) => {
    setCenter(coordinate);
  }

  const filterMapLocations = (filter: ILocationFilter) => {
    // Get all locations again.
    let tempLocations = [...ApiClient.data.realm?.locations ?? []];
      tempLocations = tempLocations.filter(location => {
                      
          if (filter.hasAnvil && !location.hasAnvil)
              return false;
          if (filter.hasBed && !location.hasBed)
              return false;
          if (filter.hasEnchantmentTable && !location.hasEnchantmentTable)
              return false;
          if (filter.hasEnderChest && !location.hasEnderChest)
              return false;
          if (filter.hasFurnace && !location.hasFurnace)
              return false;
          if (filter.hasPortal && !location.hasPortal)
              return false;
          if (filter.typeId && (location.typeId !== filter.typeId))
            return false;
            
          return true;
      });

      setLocations(tempLocations);
  }

  return (
      <Stack styles={appStackStyles}>
          <MenuBar 
            saveNewLocation={addLocation} 
            onZoomClick={centerAtCoordinate} />
        <Stack horizontal styles={mainStackStyles}>
          <Stack.Item styles={sidebarItemStyles}>
            <LocationsList 
                locations={locations} 
                onDelete={deleteLocation} 
                onLocationClicked={gotoLocation}
                onUpdateLocation={updateLocation}
                onFilter={filterMapLocations}
                />
          </Stack.Item>
          <Stack.Item styles={mapStackItemStyles}>
            <Map locations={locations} center={center}  />
          </Stack.Item>
        </Stack>  
      </Stack>
  );
}   

export default App;
