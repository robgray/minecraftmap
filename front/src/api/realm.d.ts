import { ILocation, ICoordinate } from "./location";

interface IRealm {
    name: string;
    respawnLocation: ICoordinate;
    locations: ILocation[];
}