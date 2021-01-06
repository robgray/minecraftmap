import Guid from "./api/guid";

interface IUpdateLocation {
  id: Guid;
  name: string;
  typeId: Guid;
  notes: string | null;
}

export default IUpdateLocation;