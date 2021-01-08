import { IStackTokens, TextField, Stack } from 'office-ui-fabric-react';
import { useState } from 'react';
import { ICoordinate } from "../../api/location";

interface ICoordinatesProps {
    x: string;
    z: string;
    y: string;
    onChange: (coordinate: ICoordinate) => void;
}

const CoordinateControl: React.FC<ICoordinatesProps> = (props: ICoordinatesProps) => {

    const stackTokens: Partial<IStackTokens> = { childrenGap: 5 };

    const [ x, setX ] = useState(props.x);
    const [ y, setY ] = useState(props.y);
    const [ z, setZ ] = useState(props.z);

    const updateChangedX = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
        event.stopPropagation();
        if (!newValue) return;
        setX(newValue);

        props.onChange({
            x: parseInt(newValue),
            z: parseInt(z),
            y: parseInt(y),
        });
    }

    const updateChangedY = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
        event.stopPropagation();
        if (!newValue) return;
        setY(newValue);

        props.onChange({
            x: parseInt(x),
            z: parseInt(z),
            y: parseInt(newValue),
        });
    }

    const updateChangedZ = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
        event.stopPropagation();
        if (!newValue) return;
        setZ(newValue);

        props.onChange({
            x: parseInt(x),
            z: parseInt(newValue),
            y: parseInt(y),
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
