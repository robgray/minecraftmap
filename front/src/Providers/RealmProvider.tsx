import { useState } from 'react';
import { RealmContext } from "../contexts/RealmContext";
import { RealmModel } from "../api/client";

export interface IRealmProviderProps
{
  realm: RealmModel;
  children: any;
}

export const RealmProvider = ({realm, children}: IRealmProviderProps) => {

  const [currentRealm, setCurrentRealm] = useState<RealmModel>(realm);

  return (
    <RealmContext.Provider value={{ realm: currentRealm, setRealm: setCurrentRealm }}>
      {children}
    </RealmContext.Provider>
  )
}
