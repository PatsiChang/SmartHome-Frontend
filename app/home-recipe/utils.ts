// Add functions for global use
import { ReceipeData } from "../hooks/UseRecipeData";
import { Form } from "./RegisterRecipe";


// Validations for Recipe Registration
export const newRecipeValidation = ({form, recipeList}: {form: Form, recipeList: ReceipeData[]}) => {
    console.log("Inside util");
    const recipeNameExist = recipeList.some((recipe) => {
        console.log("Inside util function");
        // console.log(recipe.recipeName === form.recipeName);
        return recipe.recipeName === form.recipeName;
    })
    return recipeNameExist;
}