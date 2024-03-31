'use client'

import { createContext } from "react";
import React from "react";
import useImgData from "./hooks/useImgData";
import useData from "./hooks/useData";
export const DataContext = createContext<null | ReturnType<typeof useData>>(null);
export const ImgDataContext = createContext<null | ReturnType<typeof useImgData>>(null);


function DataProvider({ children }: { children: React.ReactNode }) {
    const data = useData();
    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );
}
function ImgDataProvider({ children }: { children: React.ReactNode }) {
    const ImgData = useImgData();
    return (
        <ImgDataContext.Provider value={ImgData}>
            {children}
        </ImgDataContext.Provider>
    );
}

export { ImgDataProvider, DataProvider };
