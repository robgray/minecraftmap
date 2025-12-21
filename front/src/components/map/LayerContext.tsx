import React, { useState, ReactNode, useMemo } from 'react';
import { LatLng } from 'leaflet';

interface ILayerContext {
    point: LatLng;
    setPoint: (point: LatLng) => void;
}

const LayerContext = React.createContext<ILayerContext | undefined>(undefined);

interface ILayerContextProviderProps {
    children: ReactNode;
}

const LayerContextProvider = ({ children }: ILayerContextProviderProps) => {

    const [point, setPoint] = useState<LatLng>(new LatLng(0,0));

    const value = useMemo(() => ({
        point,
        setPoint
    }), [point]);

    return (
        <LayerContext.Provider value={value}>
            {children}
        </LayerContext.Provider>
    )
}

const useLayer = () => {
    const context = React.useContext(LayerContext);
    if (context === undefined) {
        throw new Error('useLayer must be used within a LayerContextProvider');
    }
    return context;
};

export { LayerContext, LayerContextProvider, useLayer };