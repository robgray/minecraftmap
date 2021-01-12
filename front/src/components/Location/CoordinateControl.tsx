import { IStackTokens, TextField, Stack } from 'office-ui-fabric-react';
import { useState } from 'react';
import { isNamedExportBindings } from 'typescript';
import { ICoordinate } from "../../api/location";

interface ICoordinatesProps {
    x: string | undefined;
    z: string | undefined;
    y: string | undefined;
    onChange: ((obj: any) => void);
}

const CoordinateControl: React.FC<ICoordinatesProps> = (props: ICoordinatesProps) => {

    const stackTokens: Partial<IStackTokens> = { childrenGap: 5 };

    const [ x, setX ] = useState(props.x);
    const [ y, setY ] = useState(props.y);
    const [ z, setZ ] = useState(props.z);

    const updateChangedX = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
        event.stopPropagation();
        
        setX(newValue);

        props.onChange({ x: newValue, z, y });
    }

    const updateChangedY = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
        event.stopPropagation();
    
        setY(newValue);      

        props.onChange({ x, y, newValue });
    }

    const updateChangedZ = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
        event.stopPropagation();
        
        setZ(newValue);

        props.onChange({ x, newValue, y });
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
