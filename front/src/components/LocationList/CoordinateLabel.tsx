import { Text } from 'office-ui-fabric-react';
import { ICoordinate } from "../../api/location";

interface ICoordinateLabelProps {
    coordinate: ICoordinate
}

const coordStyle = {
    marginTop: 0
}

const CoordinateLabel: React.FC<ICoordinateLabelProps> = (props: ICoordinateLabelProps) => {
    return (
        <Text block variant="smallPlus" style={coordStyle}>
            {props.coordinate.x},{props.coordinate.z},{props.coordinate.y}
        </Text>
    );
}

export { CoordinateLabel };