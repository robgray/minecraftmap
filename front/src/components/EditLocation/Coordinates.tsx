import { IStackTokens, TextField, Stack } from 'office-ui-fabric-react';

const Coordinates: React.FC = () => {

    const stackTokens: Partial<IStackTokens> = { childrenGap: 5 };

    return (
        <Stack tokens={stackTokens} horizontal>
            <TextField label={"Y"} />
            <TextField label={"Z"} />
            <TextField label={"X"} />
        </Stack>
    );
}

export { Coordinates };
