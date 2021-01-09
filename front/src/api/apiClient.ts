import axios, {AxiosResponse } from "axios";

import { IRealm } from "./realm";
import { ILocationType } from "./locationType";
import Guid from "./guid";

export interface INewLocationRequest {
    name: string;
    x: number;
    z: number;
    y: number;
    locationTypeId: Guid;
}

export const ApiClient  = 
{
    data: {
        locationTypes: null as ILocationType[] | null,
        realm: null as IRealm | null
    },
    settings: {
        initialize() 
        {
            axios.defaults.baseURL = "https://localhost:5001/api";
            axios.defaults.headers.get["Accept"] = "application/json";
            axios.defaults.headers.post["Accept"] = "application/json";
        },
        RealmKey: "092f7445-2f4a-4f54-2119-08d89e568feb",
    },
    methods: {
        async getRealm(id: Guid): Promise<IRealm | null>
        {
            try {
                if (ApiClient.data.realm != null) 
                {
                    return ApiClient.data.realm;
                }
                const response = await axios.get<IRealm>(`/Realm/${id}`);
                ApiClient.data.realm = response.data;
                return response.data;
            } 
            catch (error) 
            {
                console.log(error);
                return null;
            }
        },
    
        async getLocationTypes(): Promise<ILocationType[] | null>
        {
            try 
            {
                if (ApiClient.data.locationTypes != null) {
                    return ApiClient.data.locationTypes;
                }
                const response = await axios.get<ILocationType[]>("/LocationTypes");
                ApiClient.data.locationTypes = response.data;
                return response.data;
            } 
            catch (error) 
            {
                console.log(error);
                return null;
            }
        }, 

        async saveLocation(realmId: Guid, newLocation: INewLocationRequest) : Promise<IRealm | null>
        {
            try 
            {
                const response = await axios.post<INewLocationRequest, AxiosResponse<IRealm>>(`/Realm/${realmId}/location`, newLocation);
                ApiClient.data.realm = response.data;
            
                return response.data;
            } 
            catch (error) 
            {
                console.log(error);
                return null;
            }
        },

        async deleteLocation(realmId: Guid, locationId: Guid): Promise<IRealm | null>
        {
            try 
            {
                await axios.delete<IRealm>(`/Realm/${realmId}/location/${locationId}`);

                let locIndex = -1
                if (ApiClient.data.realm !== null) {
                    const tempLocations = [...ApiClient.data.realm.locations];

                    tempLocations.find((loc, index) => {
                        if (loc.id === locationId) {
                        locIndex = index;
                        return true;
                        }
                        return false;
                    });
                    
                    if (locIndex > -1) {
                        tempLocations.splice(locIndex, 1);
                        ApiClient.data.realm.locations = tempLocations;
                    }
                }

                return ApiClient.data.realm;
            } 
            catch (error) 
            {
                console.log(error);
                return ApiClient.data.realm;
            }
        }
    }
}