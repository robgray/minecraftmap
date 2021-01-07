import { IStackTokens, TextField, Stack } from 'office-ui-fabric-react';
import { useEffect, useState } from 'react';
import { ICoordinate } from "../../api/location";

interface ICoordinatesProps {
    X: string;
    Z: string;
    Y: string;
    onChange: (coordinate: ICoordinate) => void;
}

const CoordinateControl: React.FC<ICoordinatesProps> = (props: ICoordinatesProps) => {

    const stackTokens: Partial<IStackTokens> = { childrenGap: 5 };

    const [ x, setX ] = useState(props.X);
    const [ y, setY ] = useState(props.Y);
    const [ z, setZ ] = useState(props.Z);

    const updateChangedX = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
        event.stopPropagation();
        if (!newValue) return;
        setX(newValue);

        props.onChange({
            X: parseInt(newValue),
            Z: parseInt(z),
            Y: parseInt(y),
        });
    }

    const updateChangedY = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
        event.stopPropagation();
        if (!newValue) return;
        setY(newValue);

        props.onChange({
            X: parseInt(x),
            Z: parseInt(z),
            Y: parseInt(newValue),
        });
    }

    const updateChangedZ = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
        event.stopPropagation();
        if (!newValue) return;
        setZ(newValue);

        props.onChange({
            X: parseInt(x),
            Z: parseInt(newValue),
            Y: parseInt(y),
        });
    }

    return (
        <Stack tokens={stackTokens} horizontal>
            <TextField required label={"X"} value={x} onChange={updateChangedX} />
            <TextField required label={"Z"} value={z} onChange={updateChangedZ} />
            <TextField required label={"Y"} value={y} onChange={updateChangedY} />
        </Stack>
    );
}

export { CoordinateControl };
