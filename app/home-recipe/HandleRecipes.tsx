import { useState } from "react";
import useRecipeData, { ACTION, GetRecipeType } from "../hooks/UseRecipeData";


type DeleteRecipeBtnOnClickHandler = (recipeID: string) => React.MouseEventHandler<HTMLButtonElement>

const HandleRecipe = () => {

    const { recipeList, deleteData } = useRecipeData();

    const deleteRecipeBtnOnClickHandler: DeleteRecipeBtnOnClickHandler = (recipeID) => (event) => {
        deleteData({recipeIDTMP: recipeID});
        window.location.reload();
    }

    const handleRecipeIcons = (recipeID : string | undefined) => {
        if (recipeID != null || recipeID != undefined){
            return `http://localhost:8080/${recipeID}.jpg`;
        }else{
            return `http://localhost:8080/recipeIconAlt.jpg`;
        }
    }

    return (
        <div className="recipeList">
            {recipeList.map((recipe) => (
                <div className="recipePreview" key = {recipe.recipeID}>
                <div>
                    <img src={handleRecipeIcons(recipe.imgURL)} alt={'recipeIcon'}  width="150px"/>
                </div>    
                <div>
                    {/* <img src={recipe.imgURL} width="200px"/> */}
                    <h2>Recipe Name: &nbsp;&nbsp;{ recipe.recipeName }</h2>

                    {/* { typeof recipe.ingredient === 'object' &&
                        Object.entries(recipe.ingredient).map(([key, value])=>(
                        <div key={key}>
                            <div> Ingredient: {key} </div>
                        </div>
                    ))} */}
                    
                    <h3>Recipe Type: &nbsp;&nbsp;{ recipe.type }</h3>
                    <p>Steps: &nbsp;&nbsp;{ recipe.steps }</p>
                </div>
                <div className="deleteRecipe">
                    <button className="deleteRecipeBtn" onClick={deleteRecipeBtnOnClickHandler(recipe.recipeID as string)}>
                        X
                    </button>
                </div>
                </div>
            ))}
      
        </div>

    );
}
 
export default HandleRecipe;