'use client'

import { createContext, useContext } from "react";
import React, { useState } from "react";
import useRecipeData from "./hooks/useRecipeData";
export const RecipeDataContext = createContext<null | ReturnType<typeof useRecipeData>>(null);

function RecipeDataProvider({ children } : { children: React.ReactNode }) {

    const recipeData = useRecipeData();

    return (
        <RecipeDataContext.Provider value={recipeData}>
            {children}
        </RecipeDataContext.Provider>
    );
}

export default RecipeDataProvider;
