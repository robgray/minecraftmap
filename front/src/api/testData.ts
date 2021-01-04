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
            name: "Home City",
            coordinate: {
                Y: -200,
                Z: 66, 
                X: 75
            },
            typeId: "b7e14e9c-25f5-4863-826e-c8cf8c4d6307",
        },
        {
            name: "Mega City",
            coordinate: {
                Y: 400,
                Z: 66, 
                X: -190
            },
            typeId: "b7e14e9c-25f5-4863-826e-c8cf8c4d6307",
        },
        {
            name: "Field Portal Alpha",
            coordinate: {
                Y: 400,
                Z: 66, 
                X: 190
            },
            typeId: "9f03e0df-7c55-43c7-b2bb-8cf56c6678f9",
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