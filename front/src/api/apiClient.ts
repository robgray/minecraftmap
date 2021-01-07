import React from "react";
import axios from "axios";

import { IRealm } from "./realm";
import { ILocationType } from "./locationType";
import { ILocation } from "./location";


export const ApiClient  = 
{
    data: {
        locationTypes: null as ILocationType[] | null,
        realm: null as IRealm | null
    },
    settings: {
        BaseUrl: "https://localhost:5001/api",
        RealmKey: "092f7445-2f4a-4f54-2119-08d89e568feb",
    },
    methods: {
        async getRealm(): Promise<IRealm | null>
        {
            try {
                if (ApiClient.data.realm != null) 
                {
                    return ApiClient.data.realm;
                }
                const response = await axios.get(`${ApiClient.settings.BaseUrl}/Map/${ApiClient.settings.RealmKey}`);
                ApiClient.data.realm = response.data;
                return response.data;
            } catch (error) {
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
                const response = await axios.get(`${ApiClient.settings.BaseUrl}/LocationTypes`);
                console.log(response);
                ApiClient.data.locationTypes = response.data;
                return response.data;
            } catch (error) {
                console.log(error);
                return null;
            }
        }
    }
}