import { useState, useEffect } from 'react';
import { MapsContext } from "../contexts/MapsContext";
import { MapModel } from "../api/client";
import { useApi } from '../hooks/useApi';

export interface IMapsProviderProps 
{
  children: any;
}

export const MapsProvider = ({children}: IMapsProviderProps) => {

  const [currentMaps, setCurrentMaps] = useState<MapModel[]>([]);
  const api = useApi();

  useEffect(() => {
    const fetchData = async () => {
      const maps = await api.getMaps(7);
      setCurrentMaps(maps);
    }
  
    fetchData();

  }, [])

  return (
    <MapsContext.Provider value={currentMaps}>
      {children}
    </MapsContext.Provider>
  )
}
