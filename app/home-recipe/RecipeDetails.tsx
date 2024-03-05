// import useRecipeData, { ReceipeData } from "../hooks/UseRecipeData";

import { ReceipeData } from "../hooks/useRecipeData";
import { CloseRecipeDetails } from "./HandleRecipes";

const RecipeDetails = ({recipe, closeRecipeDetails} : {recipe: ReceipeData | null; closeRecipeDetails: CloseRecipeDetails}) => {

    return recipe? (
        <div className="detailedRecipe">
            <div id="closeDetailedRecipeBtn" >
                <button onClick={closeRecipeDetails}> close </button>
            </div>
            <div key = {recipe.recipeID}>
                <div id="detailedRecipeUpperRow">
                    <div><img src={`http://localhost:8080/${recipe.recipeID}.jpg`} alt={'recipeIcon'} style={{width: "250px", height: "200px"}}/></div>
                    <div id="recipeDetailName">{ recipe.recipeName }</div>
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
                    <div className="ingredientName">
                        { recipe.steps.map((step, index)=>{
                        return(
                            <div key={ index }>
                                {step}
                            </div>
                        )
                    })}</div>
                </div>   
            </div>
        </div>
    ) : <></>;



}

export default RecipeDetails;