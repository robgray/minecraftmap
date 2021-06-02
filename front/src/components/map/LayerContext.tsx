import React, { useState } from 'react';
import { LatLng } from 'leaflet';

const LayerContext:any = React.createContext({});

const LayerContextProvider = ({ children }: any) => {

    const [point, setPoint] = useState<LatLng>(new LatLng(0,0));

    const defaultValue = {
        point,
        setPoint
    }

    return (
        <LayerContext.Provider value={defaultValue}>
            {children}
        </LayerContext.Provider>
    )
}

export { LayerContext, LayerContextProvider };