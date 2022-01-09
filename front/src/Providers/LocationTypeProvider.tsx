import { useState, useEffect } from 'react';
import { LocationTypesContext } from "../contexts/LocationTypesContext";
import { LocationTypeModel } from "../api/client";
import { useApi } from '../hooks/useApi';

export interface ILocationTypesProviderProps {
  children: any;
}

export const LocationTypesProvider = ({children}: ILocationTypesProviderProps) => {

  const [currentLocationTypes, setCurrentLocationTypes] = useState<LocationTypeModel[]>([]);
  const api = useApi();

  useEffect(() => {
    const load = async () => {
      const locationTypes = await api.getLocationTypes();
      setCurrentLocationTypes(locationTypes);
    }

    load();
    
   }, []);

  return (
    <LocationTypesContext.Provider value={{ locationTypes: currentLocationTypes, setLocationTypes: setCurrentLocationTypes }}>
      {children}
    </LocationTypesContext.Provider>
  )
}
