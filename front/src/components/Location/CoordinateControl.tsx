import { IStackTokens, TextField, Stack } from 'office-ui-fabric-react';
import { ICoordinate } from "../../api/location";

interface ICoordinatesProps {
    X: string;
    Z: string;
    Y: string;
}

const CoordinateControl: React.FC<ICoordinatesProps> = (props: ICoordinatesProps) => {

    const stackTokens: Partial<IStackTokens> = { childrenGap: 5 };

    return (
        <Stack tokens={stackTokens} horizontal>
            <TextField required label={"Y"} value={props.X} />
            <TextField required label={"Z"} value={props.Y} />
            <TextField required label={"X"} value={props.Z} />
        </Stack>
    );
}

export { CoordinateControl };
