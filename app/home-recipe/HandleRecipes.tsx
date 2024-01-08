import { useEffect, useState } from "react";
import useRecipeData, { ACTION, GetRecipeType, ReceipeData } from "../hooks/UseRecipeData";
import RecipeDetails from "./RecipeDetails";
// import RecipeDetails from "./RecipeDetails";

type DeleteRecipeBtnOnClickHandler = (recipeID: string) => React.MouseEventHandler<HTMLButtonElement>
type ShowdetailedRecipe = (recipe: ReceipeData) => React.MouseEventHandler<HTMLButtonElement>
export type CloseRecipeDetails = React.MouseEventHandler<HTMLButtonElement>

const HandleRecipe = () => {

    const { recipeList, deleteData } = useRecipeData();
    const[detailedRecipe, setDetailedRecipe] = useState<ReceipeData | null>(null);

    const deleteRecipeBtnOnClickHandler: DeleteRecipeBtnOnClickHandler = (recipeID) => (event) => {
        // event.stopPropagation();
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

    const showRecipeDetails: ShowdetailedRecipe = (recipe) => (e) => {
        setDetailedRecipe(recipe); 
    }

    const closeRecipeDetails: CloseRecipeDetails = (e) =>{
        e.stopPropagation();
        setDetailedRecipe(null);
    }

    return (
        <div className="recipeList">
            {recipeList.map((recipe, index) => (
                //Not recommended because of Event Bubbling: e.stopPropagation();
                <div className="recipePreview" key = {recipe.recipeID}>
                   
                    <div id="recipeIconFrontPage">
                        <img src={handleRecipeIcons(recipe.imgURL)} alt={'recipeIcon'}  width="150px"/>
                    </div>    
                    <div id="recipeNames">
                        <div>
                            <h2>{ recipe.recipeName }</h2>
                            <h3>{ recipe.type }</h3>
                        </div>
                    </div>
       
                    <button id="detailsBtn" onClick={showRecipeDetails(recipe)}>Details</button> 
                    <div id="recipeDetailsParent" >
                        {<RecipeDetails recipe={ detailedRecipe as ReceipeData } closeRecipeDetails={closeRecipeDetails}/>}
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