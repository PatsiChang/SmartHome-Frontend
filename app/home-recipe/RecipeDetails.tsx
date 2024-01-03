// import useRecipeData, { ReceipeData } from "../hooks/UseRecipeData";

import { ReceipeData } from "../hooks/UseRecipeData";

const RecipeDetails = ({recipe} : {recipe: ReceipeData | undefined}) => {
    

    // const { recipeList } = useRecipeData();

    return recipe? (
        <div className="detailedRecipe">
                <div key = {recipe.recipeID}>
                {/* <div>
                    <img src={handleRecipeIcons(recipe.imgURL)} alt={'recipeIcon'}  width="150px"/>
                </div>     */}
                <div>
                    {/* <img src={recipe.imgURL} width="200px"/> */}
                    <h2>Recipe Name: &nbsp;&nbsp;{ recipe.recipeName }</h2>
                    <div> Ingredient: </div>
                    { recipe.ingredient.map(( ingredient, index )=>{
                        return(
                            <div key={ index }>
                                <div> {ingredient.ingredientName} </div>
                            </div>
                        )
                    })
                    }
                    <h3>Recipe Type: &nbsp;&nbsp;{ recipe.type }</h3>
                    <p>Steps: &nbsp;&nbsp;{ recipe.steps }</p>
                </div>
                </div>
        </div>
    ) : <></>;

}

export default RecipeDetails;