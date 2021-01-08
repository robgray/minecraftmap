import { Text } from 'office-ui-fabric-react';
import { ICoordinate } from "../../api/location";

interface ICoordinateLabelProps {
    coordinate: ICoordinate
}

const CoordinateLabel: React.FC<ICoordinateLabelProps> = (props: ICoordinateLabelProps) => {
    return (
        <Text block variant="tiny">
            {props.coordinate.x},{props.coordinate.z},{props.coordinate.y}
        </Text>
    );
}

export { CoordinateLabel };