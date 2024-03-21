'use client'

import { createContext } from "react";
import React from "react";
import useLogInData from "./hooks/useLogInData";
import useSocialMediaData from "./hooks/useSocialMediaData";
import useImgData from "./hooks/useImgData";
import useData from "./hooks/useData";
export const DataContext = createContext<null | ReturnType<typeof useData>>(null);
export const LoginDataContext = createContext<null | ReturnType<typeof useLogInData>>(null);
export const SocialMediaDataContext = createContext<null | ReturnType<typeof useSocialMediaData>>(null);
export const ImgDataContext = createContext<null | ReturnType<typeof useImgData>>(null);


function DataProvider({ children }: { children: React.ReactNode }) {
    const data = useData();
    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );
}
function LoginDataProvider({ children }: { children: React.ReactNode }) {
    const loginData = useLogInData();
    return (
        <LoginDataContext.Provider value={loginData}>
            {children}
        </LoginDataContext.Provider>
    );
}
function SocialMediaDataProvider({ children }: { children: React.ReactNode }) {
    const socialMediaData = useSocialMediaData();
    return (
        <SocialMediaDataContext.Provider value={socialMediaData}>
            {children}
        </SocialMediaDataContext.Provider>
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

export { LoginDataProvider, SocialMediaDataProvider, ImgDataProvider, DataProvider };
