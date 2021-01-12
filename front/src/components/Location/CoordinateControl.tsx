import { IStackTokens, TextField, Stack } from 'office-ui-fabric-react';
import { useState } from 'react';

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

        props.onChange({ x: newValue, z: z, y: y });
    }

    const updateChangedY = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
        event.stopPropagation();
    
        setY(newValue);      

        props.onChange({ x: x, y: newValue, z: z});
    }

    const updateChangedZ = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
        event.stopPropagation();
        
        setZ(newValue);

        props.onChange({ x: x, z: newValue, y: y });
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
