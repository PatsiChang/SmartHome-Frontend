import { useState } from "react";
import useRecipeData, { ReceipeData } from "../hooks/useRecipeData";
import { RandomRecipeProps } from "./page";


const RandomRecipe = ({ randomRecipeVisibility, setRandomRecipeVisibility }: RandomRecipeProps) => {
    const { currentRandomRecipe, getRandomRecipe, setCurrentRandomRecipe } = useRecipeData();
    const [decided, setDecided] = useState<boolean>(false);

    // const firstRandomRecipe = getRandomRecipe();

    const getRandomRecipeFuntion = () => {
        getRandomRecipe({});
    }
    const handleRecipeIcons = () => {
        const imgURL = currentRandomRecipe?.imgURL;
        if (imgURL != null || imgURL != undefined) {
            return `http://localhost:8080/${imgURL}.jpg`;
        } else {
            return `http://localhost:8080/recipeIconAlt.jpg`;
        }
    }
    const closeRecipeGenerator = () => {
        setRandomRecipeVisibility(false);
        setDecided(false);
    }
    const generateRandomRecipeBody = () => {
        return decided ? (
            <div>
                <div style={{ width: "100%", height: "200px", overflow: "scroll" }}>
                    {currentRandomRecipe?.steps.map((step, index) => {
                        return (
                            <div key={index}>{step}</div>
                        )
                    })}
                </div>
                <div className="btn btn-dark" onClick={closeRecipeGenerator}>close</div>
            </div>
        ) : <>
            <div id="randomRecipeWrongDecisionContainer">
                <div id="randomRecipeDecisionContainer">
                    <button className="btn btn-dark" onClick={wrongRecipeGenerated}>X</button>
                    <button className="btn btn-dark" onClick={() => setDecided(true)}>✓</button>
                </div>
                <div className="btn btn-dark" onClick={closeRecipeGenerator}>close</div>
            </div></>
    }
    const wrongRecipeGenerated = () => {
        getRandomRecipeFuntion();
    }
    return randomRecipeVisibility ? (
        <main className="row justify-content-center" style={{ width: "700px"}} >
            <div className="row justify-content-center"  style={{backgroundColor: 'var(--darkColor)', color:"var(--lighterColor)" }}>Random Recipe</div>
            <div className="card" style={{ padding: "2%",  height:"250px", width: "700px", maxHeight: "250px", backgroundColor: 'var(--darkColor)', overflow: "hidden", color: "var(--lighterColor)", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <div style={{ overflow: "hidden" }}>
                    <img src={handleRecipeIcons()} alt={'recipeIcon'}  style={{minHeight: "100%",  maxHeight: "100%", width: "100%", objectFit: "cover" }} />
                </div>
                {/* <h5 className="card-title">{currentRandomRecipe?.recipeName}</h5> */}
                <p className="card-text" style={{ margin: "0% 0% 0% 2%", maxHeight: "100%", overflowY: "auto", scrollbarColor: "black lightgray" }}>
                    {currentRandomRecipe?.ingredient.map((ingredients, index) => {
                        return (
                            <li id="randomRecipeIngredient" key={index}>
                                {ingredients.ingredientName + " "}
                                {ingredients.ingredientAmount}
                            </li>
                        )
                    })}
                </p>
            </div>
            <div style={{  backgroundColor: 'var(--darkColor)', color: "var(--lighterColor)", height:"250px", width: "700px", maxHeight: "250px"}}>
                {generateRandomRecipeBody()}
            </div>
        </main>

    ) : <></>;
}

export default RandomRecipe;