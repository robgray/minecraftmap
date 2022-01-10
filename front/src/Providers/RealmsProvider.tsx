import { useCallback, useEffect, useState } from 'react';
import { RealmsContext } from "../contexts/RealmsContext";
import { RealmOnlyModel } from "../api/client";
import { useApi } from "../hooks/useApi";
import Guid from '../api/guid';
import useLocalStorage from "../hooks/useLocalStorage";
import config from "../config.json";

export interface IRealmsProviderProps
{
  children: any;
}

export const RealmsProvider = ({children}: IRealmsProviderProps) => {

  const [realmId, setRealmId] = useLocalStorage("realmId", config.realmKey);
  const [allRealms, setAllRealms] = useState<RealmOnlyModel[]>([]);
  const [ id, setId ] = useState<Guid>(realmId);
  const api = useApi();

  useEffect(() => {
    const load = async () => {
      const returnedRealms = await api.getRealms();
      setAllRealms(returnedRealms);
    }

    load();
    
   }, []);

  const getCurrentRealm = useCallback(() => {
    return allRealms.filter(r => r.id.toUpperCase() === id.toUpperCase())[0]; 
  }, [id, allRealms]);

  const setCurrentRealmId = (realmId: Guid) => {

    setRealmId(realmId);
    setId(realmId);
  }

  return (
    <RealmsContext.Provider value={{ allRealms, currentRealm: getCurrentRealm(), setCurrentRealm: setCurrentRealmId}}>
      {children}
    </RealmsContext.Provider>
  )
}
