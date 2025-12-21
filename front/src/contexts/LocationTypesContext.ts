import { createContext, useContext } from "react";
import { LocationTypeModel } from "../api/client";

export type LocationTypesContextType = {
  locationTypes: LocationTypeModel[];
  setLocationTypes: (locationTypes: LocationTypeModel[]) => void;
}

export const LocationTypesContext = createContext<LocationTypesContextType | undefined>(undefined);

export const useLocationTypes = () => {
    const context = useContext(LocationTypesContext);
    if (context === undefined) {
        throw new Error('useLocationTypes must be used within a LocationTypesProvider');
    }
    return context;
};