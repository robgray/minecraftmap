import { createContext, useContext } from "react";
import { LocationTypeModel } from "../api/client";

export type LocationTypesContextType = {
  locationTypes: LocationTypeModel[];
  setLocationTypes: (locationTypes: LocationTypeModel[]) => void;
}

export const LocationTypesContext = createContext<LocationTypesContextType>({ 
  locationTypes: [],
  setLocationTypes: locationTypes => console.warn('no locationtype provider. make sure setup in app.tsx')
});

export const useLocationTypes = () => useContext(LocationTypesContext);