// import useRecipeData, { ReceipeData } from "../hooks/UseRecipeData";

import { useEffect } from "react";
import useRecipeData, { ReceipeData } from "../hooks/UseRecipeData";
import { CloseRecipeDetails } from "./HandleRecipes";

const RecipeDetails = ({recipe, closeRecipeDetails} : {recipe: ReceipeData | null; closeRecipeDetails: CloseRecipeDetails}) => {

    return recipe? (
        <div className="detailedRecipe">
            <div id="closeDetailedRecipeBtn">
                <button onClick={closeRecipeDetails}> close </button>
            </div>
            <div key = {recipe.recipeID}>
                <div id="detailedRecipeUpperRow">
                    <img src={`http://localhost:8080/${recipe.recipeID}.jpg`} alt={'recipeIcon'}  width="300px"/>
                    <div>{ recipe.recipeName }</div>
                </div> 
                <div>
                    <div id="ingredientRow">
                        <div> Ingredient: 
                            <div className="ingredientName">
                                { recipe.ingredient.map(( ingredient, index )=>{
                                    return(
                                        <div key={ index }>
                                            <div> {ingredient.ingredientName} </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                       
                        <div> Amount: 
                            <div className="ingredientName">
                                { recipe.ingredient.map(( ingredient, index )=>{
                                    return(
                                        <div key={ index }>
                                            <div> {ingredient.ingredientAmount} </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div>Steps</div>
                    <p>{ recipe.steps.map((step)=>{
                        return(
                            <div>
                                {step}
                            </div>
                        )
                    })}</p>
                </div>   
            </div>
        </div>
    ) : <></>;



}

export default RecipeDetails;