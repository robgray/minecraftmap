import { createContext, useContext } from "react"
import { MapModel } from "../api/client";

export type MapsContextType = {
  maps: MapModel[];
  setMaps: (maps: MapModel[]) => void;
}

export const MapsContext = createContext<MapModel[]>([]);
export const useMaps = () => useContext(MapsContext);