import Guid from "./guid";
import { CoordinateModel } from "./client";

interface INewLocation {
    name: string;
    typeId: Guid;
    coordinate: CoordinateModel;
    hasAnvil: boolean;
    hasBed: boolean;
    hasPortal: boolean;
    hasFurnace: boolean;
    hasEnderChest: boolean;
    hasEnchantmentTable: boolean;
    notes: string;
}

export {INewLocation };