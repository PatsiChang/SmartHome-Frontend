import { useState } from "react";
import useRecipeData, { ReceipeData } from "../hooks/useRecipeData";
import { RandomRecipeProps } from "./page";

 
const RandomRecipe = ({randomRecipeVisibility, setRandomRecipeVisibility}: RandomRecipeProps) => {
    const { currentRandomRecipe, getRandomRecipe, setCurrentRandomRecipe }  = useRecipeData();
    const [ decided, setDecided ] = useState<boolean>(false);


 
    // const firstRandomRecipe = getRandomRecipe();

    const getRandomRecipeFuntion = () => {
        getRandomRecipe({});
    }
    const handleRecipeIcons = () => {
        const imgURL = currentRandomRecipe?.imgURL;
        if (imgURL != null || imgURL != undefined){
            return `http://localhost:8080/${imgURL}.jpg`;
        }else{
            return `http://localhost:8080/recipeIconAlt.jpg`;
        }
    }
    const closeRecipeGenerator = () => {
        setRandomRecipeVisibility(false);
        setDecided(false);
    }
    const generateRandomRecipeBody = () => {
        return decided? (
            <div id="randomRecipeOverlay">
                <div id="randomRecipeOverlaySteps">
                    { currentRandomRecipe?.steps.map((step, index)=>{
                        return(
                            <li key={ index }>
                                {step}
                            </li>
                        )
                    })}
                </div>
                <div id="randomRecipeCloseBtn" onClick={closeRecipeGenerator}>close</div>
            </div>
        ):  <><div id="randomRecipeWrongDecisionContainer">
                <div id="randomRecipeDecisionContainer">
                    <button id="randomRecipeDecisionBtn" onClick={wrongRecipeGenerated}>X</button>
                    <button id="randomRecipeDecisionBtn"  onClick={()=>setDecided(true)}>✓</button>
                </div>
            <div id="randomRecipeCloseBtn" onClick={closeRecipeGenerator}>close</div>

            </div></>
    }
    const wrongRecipeGenerated = () => {
        getRandomRecipeFuntion(); 
    }
    return randomRecipeVisibility? (  
        <div id="randomRecipeContainer">
            <div id="randomRecipeFlexContainer">
                <div>Recipe Generator</div>
                <div id="randomRecipeImg">
                    <img id="randomRecipeImage" src={handleRecipeIcons()} alt={'recipeIcon'}  width="200px"/>
                    {currentRandomRecipe?.ingredient.map((ingredients, index)=>{
                        return(
                            <li id="randomRecipeIngredient" key={ index }>
                                {ingredients.ingredientName + " "} 
                                {ingredients.ingredientAmount}
                                
                            </li>
                        )
                    })}
                </div>
                <span>{currentRandomRecipe?.recipeName}</span>
                {generateRandomRecipeBody()}
            </div>
        </div>
    ): <></>;
}
 
export default RandomRecipe;