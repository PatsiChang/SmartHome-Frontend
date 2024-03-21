
import { ReceipeData, cardStyle } from "../types/recipeTypes";
import { CloseRecipeDetails } from "./HandleRecipes";

const RecipeDetails = ({ recipe, closeRecipeDetails }: { recipe: ReceipeData | null; closeRecipeDetails: CloseRecipeDetails }) => {
    const ingredientIndividual = (ingredientAttribute: string) => {
        return recipe ? (
            <div className="ingredientName">
                {recipe.ingredient.map((ingredient, index) => {
                    return (
                        <div key={index}>{ingredient[ingredientAttribute]}</div>
                    )
                })}
            </div>
        ) : <></>;
    }
    return recipe ? (
        <main className="row justify-content-center" style={{ width: "700px" }}>
            <div className="card" style={{ ...cardStyle }}>
                <div style={{ overflow: "hidden" }}>
                    <img src={`http://localhost:8080/${recipe.recipeID}.jpg`} alt={'recipeIcon'} style={{ minHeight: "100%", maxHeight: "100%", width: "100%", objectFit: "cover" }} />
                </div>
                {/* <h5 className="card-title">{currentRandomRecipe?.recipeName}</h5> */}
                <p className="card-text" style={{ margin: "0% 0% 0% 2%", maxHeight: "100%", overflowY: "auto", scrollbarColor: "black lightgray" }}>
                    <div id="ingredientRow">
                        <div> Ingredient: {ingredientIndividual("ingredientName")}</div>
                        <div> Amount: {ingredientIndividual("ingredientAmount")}</div>
                    </div>
                </p>
            </div>
            <div style={{ backgroundColor: 'var(--darkColor)', color: "var(--lighterColor)", height: "250px", width: "700px", maxHeight: "250px" }}>
                <div>Steps</div>
                <div className="ingredientName">
                    {recipe.steps.map((step, index) => {
                        return (
                            <div key={index}>{step}</div>
                        )
                    })}
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", backgroundColor: "var(--darkColor)", padding: "0% 1% 1% 1%" }}>
                <button className="btn btn-dark" onClick={closeRecipeDetails}>close</button>
            </div>
        </main>
    ) : <></>;

}

export default RecipeDetails;