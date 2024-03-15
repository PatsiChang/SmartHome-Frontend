'use client'

import { createContext } from "react";
import React from "react";
import useRecipeData from "./hooks/useRecipeData";
import useLogInData from "./hooks/useLogInData";
import useSocialMediaData from "./hooks/useSocialMediaData";
export const RecipeDataContext = createContext<null | ReturnType<typeof useRecipeData>>(null);
export const LoginDataContext = createContext<null | ReturnType<typeof useLogInData>>(null);
export const SocialMediaDataContext = createContext<null | ReturnType<typeof useSocialMediaData>>(null);


function RecipeDataProvider({ children } : { children: React.ReactNode }) {

    const recipeData = useRecipeData();

    return (
        <RecipeDataContext.Provider value={recipeData}>
            {children}
        </RecipeDataContext.Provider>
    );
}
function LoginDataProvider({ children } : { children: React.ReactNode }) {

    const loginData = useLogInData();

    return (
        <LoginDataContext.Provider value={loginData}>
            {children}
        </LoginDataContext.Provider>
    );
}
function SocialMediaDataProvider({ children } : { children: React.ReactNode }) {

    const socialMediaData = useSocialMediaData();

    return (
        <SocialMediaDataContext.Provider value={socialMediaData}>
            {children}
        </SocialMediaDataContext.Provider>
    );
}

export { RecipeDataProvider, LoginDataProvider, SocialMediaDataProvider };
