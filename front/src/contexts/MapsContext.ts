import { createContext, useContext } from "react"
import { MapModel } from "../api/client";

export type MapsContextType = {
  maps: MapModel[];
  setMaps: (maps: MapModel[]) => void;
}

export const MapsContext = createContext<MapModel[] | undefined>(undefined);

export const useMaps = () => {
    const context = useContext(MapsContext);
    if (context === undefined) {
        throw new Error('useMaps must be used within a MapsProvider');
    }
    return context;
};