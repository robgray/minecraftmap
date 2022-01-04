import axios, {AxiosResponse } from "axios";

import { Client, NewRealmRequest, } from "./client";

const settings: {   
    baseUrl: "https://localhost:5001/api",
    getAccept: "application/json",
    postAccept: "apoplication/json",
    realmKey: "092f7445-2f4a-4f54-2119-08d89e568feb"
}

export const ApiClient  = 
{
    data: {
        locationTypes: null as LocationType[] | null,
        realm: null as Realm | null,
        maps: null as Map[] | null,
    },
    settings: {
        initialize() 
        {
            axios.defaults.baseURL = 
            axios.defaults.headers.get["Accept"] = "application/json";
            axios.defaults.headers.post["Accept"] = "application/json";
        },
        RealmKey: "AE924830-1DF0-4C32-9603-FE773BDF8508",
    },
    methods: {
        async getMaps(ringNumber: number): Promise<Map[] | null>
        {
            try {
                if (ApiClient.data.maps != null) 
                {
                    return ApiClient.data.maps;
                }
                const response = await axios.get<Map[]>(`/Map/${ringNumber}`);
                ApiClient.data.maps = response.data;
                return response.data;
            } 
            catch (error) 
            {
                console.log(error);
                return null;
            }
        }, 

        async getRealm(id: Guid): Promise<Realm | null>
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

        async updateLocation(realmId: Guid, location: IUpdateLocationRequest) : Promise<IRealm | null>
        {
            try 
            {
                const response = await axios.put<ILocation, AxiosResponse<ILocation>>(`/Realm/${realmId}/location/${location.id}`, location);
                if (ApiClient.data.realm != null) {
                    const tempLocations = [...ApiClient.data.realm.locations];
                    const locIndex = tempLocations.findIndex((loc) => loc.id === location.id);
                    if (locIndex > -1) {
                        tempLocations[locIndex] = response.data;
                        ApiClient.data.realm.locations = tempLocations;
                    }
                }
            
                return ApiClient.data.realm
            } 
            catch (error) 
            {
                console.log(error);
                return ApiClient.data.realm;
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