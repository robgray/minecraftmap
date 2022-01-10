import { useEffect, useState, useCallback } from 'react';
import { LocationsContext } from "../contexts/LocationsContext";
import { LocationModel } from "../api/client";
import { ILocationFilter } from "../components/LocationList/LocationFilter";
import { useApi } from '../hooks/useApi';
import config from "../config.json";
import { INewLocation } from '../api/location';
import { NewLocationRequest, UpdateLocationRequest } from '../api/client';
import { useRealms } from "../contexts/RealmsContext";
import Guid from '../api/guid';

export interface ILocationsProviderProps {
  filter?: ILocationFilter,
  children: any
}

export const LocationsProvider = ({filter, children}: ILocationsProviderProps) => {

  const api = useApi();
  const [allLocations, setAllLocations] = useState<LocationModel[]>([]);
  const [currentFilter, setCurrentFilter] = useState<ILocationFilter|undefined>(filter);

  const { currentRealm } = useRealms();

  useEffect(() => {
    const fetchData = async () => {
      
      if (currentRealm) {
        const realm = await api.getRealm(currentRealm.id);
        setAllLocations(realm.locations||[]);    
      }
    }

    fetchData();
  }, [currentRealm])

  const addLocation = (location: INewLocation) => {  
    const postData = async (newLocation: NewLocationRequest) => {
      const realm = await api.addLocation(currentRealm.id, newLocation);
      setAllLocations(realm.locations||[]);
    }

    const newDataObj: NewLocationRequest = {
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

  const updateLocation = (locationId: Guid, location: UpdateLocationRequest) => {

    const postData = async (locationId: Guid, location: UpdateLocationRequest) => {
      const realm = await api.updateLocation(currentRealm.id, locationId, location);
      setAllLocations(realm.locations||[]);
    }

    postData(locationId, location);
  }

  const deleteLocation = (id: Guid) => {

    const deleteData = async (locationId: Guid) => {
      const realm = await api.deleteLocation(currentRealm.id, locationId);
      setAllLocations(realm.locations||[]);
    }

    deleteData(id);
  }

  const filteredLocations = useCallback(() : LocationModel[] => {
    console.log('start filtered', allLocations);
  
    if (!currentFilter) {
      console.log('no filter', allLocations)
      return [...allLocations];
    }

    let tempLocations = [...allLocations];
    tempLocations = tempLocations.filter(location => {
                      
          if (currentFilter.hasAnvil && !location.hasAnvil)
              return false;
          if (currentFilter.hasBed && !location.hasBed)
              return false;
          if (currentFilter.hasEnchantmentTable && !location.hasEnchantmentTable)
              return false;
          if (currentFilter.hasEnderChest && !location.hasEnderChest)
              return false;
          if (currentFilter.hasFurnace && !location.hasFurnace)
              return false;
          if (currentFilter.hasPortal && !location.hasPortal)
              return false;
          if (currentFilter.typeId && (location.typeId !== currentFilter.typeId))
            return false;
            
          return true;
      });

      console.log('filter', tempLocations);
      return tempLocations;
  }, [allLocations, currentFilter]);

  return (
    <LocationsContext.Provider value={{ 
      locations: filteredLocations(), 
      filter: currentFilter, 
      setFilter: setCurrentFilter,
      addLocation,
      deleteLocation,
      updateLocation
    }}>
      {children}
    </LocationsContext.Provider>
  )
}