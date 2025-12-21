import { LatLng, LatLngBounds, LatLngTuple } from 'leaflet';
import { CoordinateModel, MapBoundingBox } from '../api/client';

export const SHRINK_FACTOR = 100;

export const toLeafletLatLng = (coord: CoordinateModel): LatLng => {
    return new LatLng(-coord.y / SHRINK_FACTOR, coord.x / SHRINK_FACTOR);
};

export const toLeafletTuple = (coord: CoordinateModel): LatLngTuple => {
    return [-coord.y / SHRINK_FACTOR, coord.x / SHRINK_FACTOR];
};

export const getTranslatedBounds = (bounds: MapBoundingBox): LatLngBounds => {
    return new LatLngBounds(
        [-bounds.bottomRight.y / SHRINK_FACTOR, bounds.topLeft.x / SHRINK_FACTOR],
        [-bounds.topLeft.y / SHRINK_FACTOR, bounds.bottomRight.x / SHRINK_FACTOR]
    );
};

export const getBoundsFromLocations = (locs: LatLngTuple[]): LatLngBounds => {
    if (locs.length === 0) {
        return new LatLngBounds([0, 0], [0, 0]);
    }

    let smallestX = Number.MAX_SAFE_INTEGER;
    let smallestY = Number.MAX_SAFE_INTEGER;
    let largestX = Number.MIN_SAFE_INTEGER;
    let largestY = Number.MIN_SAFE_INTEGER;

    locs.forEach((point) => {
        if (point[0] < smallestX) smallestX = point[0];
        if (point[0] > largestX) largestX = point[0];

        if (point[1] < smallestY) smallestY = point[1];
        if (point[1] > largestY) largestY = point[1];
    });

    return new LatLngBounds(
        [smallestY, smallestX],
        [largestY, largestX]
    );
};
