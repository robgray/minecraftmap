import { createContext, useContext} from "react"
import { RealmModel } from "../api/client";

export type RealmContextType = {
  realm: RealmModel|null;
  setRealm: (realm: RealmModel) => void;
}

export const RealmContext = createContext<RealmContextType>({ realm: null, setRealm: realm => console.warn('realm provider not set')});
export const useRealm = () => useContext(RealmContext);