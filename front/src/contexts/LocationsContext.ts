import { createContext, useContext } from "react"
import { LocationModel, UpdateLocationRequest } from "../api/client";
import { ILocationFilter } from "../components/LocationList/LocationFilter";
import { INewLocation } from "../api/location";
import Guid from "../api/guid";

export type LocationsContextType = {
  locations: LocationModel[];
  filter: ILocationFilter | undefined;
  setFilter: (filter: ILocationFilter | undefined) => void;
  deleteLocation: (id: Guid) => void;
  updateLocation: (locationId: Guid, location: UpdateLocationRequest) => void;
  addLocation: (location: INewLocation) => void;
}

export const LocationsContext = createContext<LocationsContextType | undefined>(undefined);

export const useLocations = () => {
    const context = useContext(LocationsContext);
    if (context === undefined) {
        throw new Error('useLocations must be used within a LocationsProvider');
    }
    return context;
};