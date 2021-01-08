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
    x: number,    
    z: number,
    y: number,
}

interface INewLocation {
    name: string;
    typeId: Guid;
    coordinate: ICoordinate;
}

export { ILocation, ICoordinate, INewLocation };