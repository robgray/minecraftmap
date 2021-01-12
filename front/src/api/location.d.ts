import Guid from "./guid";

interface ILocation {
    id: Guid;
    name: string;
    typeId: Guid;
    notes?: string | null;
    coordinate: ICoordinate;
    mapNumber: number;
    hasAnvil: boolean;
    hasBed: boolean;
    hasPortal: boolean;
    hasFurnace: boolean;
    hasEnderChest: boolean;
    hasEnchantmentTable: boolean;
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
    hasAnvil: boolean;
    hasBed: boolean;
    hasPortal: boolean;
    hasFurnace: boolean;
    hasEnderChest: boolean;
    hasEnchantmentTable: boolean;
    notes: string;
}

export { ILocation, ICoordinate, INewLocation };