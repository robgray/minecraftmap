import { IRealm } from "./realm"
import { ILocationType } from "./locationType"

const realm: IRealm = {
    name: "Grayverse",
    respawnLocation: {
        Y: 0,
        Z: 0,
        X: 0
    },
    locations: [
        {
            id: "61947b7a-9a75-4699-aa84-c9f2e0970e28",
            name: "Home City",
            coordinate: {
                Y: -200,
                Z: 66, 
                X: 75
            },
            typeId: "b7e14e9c-25f5-4863-826e-c8cf8c4d6307",
            map: 8,
        },
        {
            id: "ec8aa85d-46ed-4111-b456-0cb962730ae8",
            name: "Mega City",
            coordinate: {
                Y: 400,
                Z: 66, 
                X: -190
            },
            typeId: "b7e14e9c-25f5-4863-826e-c8cf8c4d6307",
            map: 1,
        },
        {
            id: "88daaafe-0584-4f5c-90c9-a18ea3abc4ca",
            name: "Field Portal Alpha",
            coordinate: {
                Y: 400,
                Z: 66, 
                X: 190
            },
            typeId: "9f03e0df-7c55-43c7-b2bb-8cf56c6678f9",
            map: 1
        },
    ]
};

const locationTypes: ILocationType[] = [
    {
        id: "b7e14e9c-25f5-4863-826e-c8cf8c4d6307",
        name: "City"
    },
    {
        id: "9f03e0df-7c55-43c7-b2bb-8cf56c6678f9",
        name: "Portal"
    }
]

export { locationTypes, realm };