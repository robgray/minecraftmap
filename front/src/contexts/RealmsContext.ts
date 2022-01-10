import { createContext, useContext} from "react"
import { RealmOnlyModel } from "../api/client";
import Guid from "../api/guid";

export type RealmsContextType = {
  allRealms: RealmOnlyModel[];
  currentRealm: RealmOnlyModel;
  setCurrentRealm: (realmId: Guid) => void;
}

const defaultRealm = {
  id: "0",
  name: "#Error",
  seed: 0,
  respawnLocation: {
    x: 0,
    y: 0,
    z: 0
  }
}

export const RealmsContext = createContext<RealmsContextType>({ 
  allRealms: [], 
  currentRealm: defaultRealm, 
  setCurrentRealm: _ => console.warn("forgot to set realm change handler") 
});
export const useRealms = () => useContext(RealmsContext);