import Guid from "./guid";

interface ILocation {
    id?: Guid;
    name: string;
    typeId: Guid;
    notes?: string | null;
    coordinate: ICoordinate
}

interface ICoordinate {
    Y: number,
    Z: number,
    X: number
}

export { ILocation, ICoordinate };