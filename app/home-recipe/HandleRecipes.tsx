import { useEffect, useState } from "react";
import useRecipeData, { ACTION, GetRecipeType } from "../hooks/UseRecipeData";


type HandleRecipePropsList = {
    recipeList: GetRecipeType ['recipeList']
    setRecipeList: GetRecipeType ['setRecipeList']
    
}

type DeleteRecipeBtnOnClickHandler = (recipeName: string) => React.MouseEventHandler<HTMLButtonElement>

const HandleRecipe = () => {

    const { recipeList, getData, deleteData } = useRecipeData();
    console.log("HandleRecipe recipeList", recipeList)

    const deleteRecipeBtnOnClickHandler: DeleteRecipeBtnOnClickHandler = (recipeName) => (event) => {
        console.log(recipeName);
        deleteData({recipeName});
        getData({recipeName});
    }

    return (
        <div className="recipeList">
            {recipeList.map((recipe) => (
                <div className="recipePreview" key = {recipe.recipeID}>
                <div>
                    <h2>Recipe Name: { recipe.recipeName }</h2>
                    <h3>Recipe Type: { recipe.type }</h3>
                    {/* Todo: Loop through the ingredient map */}
                    <p>Steps: { recipe.steps }</p>
                </div>
                <div className="deleteRecipe">
                    <button className="deleteRecipeBtn" onClick={deleteRecipeBtnOnClickHandler(recipe.recipeName)}>
                        X
                    </button>
                </div>
                </div>
            ))}
      
        </div>

    );
}
 
export default HandleRecipe;