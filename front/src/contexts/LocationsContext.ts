import { createContext, useContext } from "react"
import { LocationModel, UpdateLocationRequest } from "../api/client";
import { ILocationFilter } from "../components/LocationList/LocationFilter";
import { INewLocation } from "../api/location";
import Guid from "../api/guid";

export type LocationsContextType = {
  locations: LocationModel[];
  filter: ILocationFilter|undefined;
  setFilter: (filter: ILocationFilter|undefined) => void;
  deleteLocation: (id: Guid) => void;
  updateLocation: (locationId: Guid, location: UpdateLocationRequest) => void;
  addLocation: (location: INewLocation) => void;
}

const defaultContextSettings = {
  locations: [], 
  filter: undefined,
  setFilter: () => console.warn('filter undefined'),
  deleteLocation: () => console.warn('delete location undefined'),
  updateLocation: (id: Guid, _location: UpdateLocationRequest) => console.warn('update location undefined'),
  addLocation: () => console.warn('add location undefined')
}

export const LocationsContext = createContext<LocationsContextType>(defaultContextSettings);

export const useLocations = () => useContext(LocationsContext);