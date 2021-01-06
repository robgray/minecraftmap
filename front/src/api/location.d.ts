import { NullLiteral } from "typescript";
import Guid from "./guid";

interface ILocation {
    id: Guid;
    name: string;
    typeId: Guid;
    notes?: string | null;
    coordinate: ICoordinate;
    map: number;
}

interface ICoordinate {
    Y: number,
    Z: number,
    X: number
}

interface INewLocation {
    name: string;
    typeId: Guid;
    coordinate: ICoordinate;
}

export { ILocation, ICoordinate, INewLocation };