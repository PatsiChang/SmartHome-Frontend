import { Dispatch, SetStateAction, useState } from "react";
import useRecipeData, { ReceipeData } from "../hooks/useRecipeData";
import RecipeDetails from "./RecipeDetails";
import { RecipeTypes } from "./RegisterRecipe";
import { getImages } from "./utils";
// import RecipeDetails from "./RecipeDetails";

type DeleteRecipeBtnOnClickHandler = (recipeID: string) => React.MouseEventHandler<HTMLButtonElement>
type ShowdetailedRecipe = (recipe: ReceipeData) => React.MouseEventHandler<HTMLButtonElement>
export type CloseRecipeDetails = React.MouseEventHandler<HTMLButtonElement>

export type HandleRecipeProps = {
    existingFormValue: ReceipeData,
    setExistingFormValue: Dispatch<SetStateAction<ReceipeData>>,
}

const HandleRecipe = ({ setExistingFormValue }: HandleRecipeProps) => {
    const { recipeList, deleteData } = useRecipeData();

    const [detailedRecipe, setDetailedRecipe] = useState<ReceipeData | null>(null);
    const [recipeTypeState, setRecipeTypeState] = useState<RecipeTypes>(RecipeTypes.DESSERT)

    const deleteRecipeBtnOnClickHandler: DeleteRecipeBtnOnClickHandler = (recipeID) => (event) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this recipe?");
        // event.stopPropagation();
        if (isConfirmed) {
            deleteData({ recipeIDTMP: recipeID });
            // window.location.reload();
        }
    }

    const handleRecipeIcons = (recipeID: string | undefined) => {
        return getImages(recipeID);
    }

    const showRecipeDetails: ShowdetailedRecipe = (recipe) => (e) => {
        setDetailedRecipe(recipe);
    }

    const closeRecipeDetails: CloseRecipeDetails = (e) => {
        e.stopPropagation();
        setDetailedRecipe(null);
    }
    const updateRecipeEditBtnFunction = (recipe: ReceipeData) => {
        setExistingFormValue(recipe);
        // e.stopPropagation();
    }
    const filterRecipe = (recipeType: RecipeTypes) => {
        setRecipeTypeState(recipeType);
    }
    return (
        <div className= {`row g-2 {$zindex-dropdown}`} >
            <div className="row justify-content-center" style={{ margin: "3% 0% 2% 0%" }}>
                <div className="col-auto">
                    <button type="button" onClick={() => filterRecipe(RecipeTypes.BREAKFAST)} 
                    className="btn btn-dark me-2">Breakfast</button>
                </div>
                <div className="col-auto">
                    <button type="button" onClick={() => filterRecipe(RecipeTypes.LUNCH)} 
                    className="btn btn-dark me-2">Lunch</button>
                </div>
                <div className="col-auto">
                    <button type="button" onClick={() => filterRecipe(RecipeTypes.DINNER)} 
                    className="btn btn-dark me-2">Dinner</button>
                </div>
                <div className="col-auto">
                    <button type="button" onClick={() => filterRecipe(RecipeTypes.DESSERT)} 
                    className="btn btn-dark me-2">Dessert</button>
                </div>
            </div>
            {recipeList.filter(recipe => recipe.type === recipeTypeState).map((recipe, index) => (
                <div className="col-sm-4 mb-3 mb-sm-0" key={recipe.recipeID}>
                    <div className="card" style={{ backgroundColor: 'var(--middleColor0)' }}>
                        <div className="card-body">
                            <div style={{width: "100%", height: "200px", overflow: "hidden", margin: "0% 0% 2% 0%"}}>
                                <img src={handleRecipeIcons(recipe.imgURL)} alt={'recipeIcon'} style={{width: "100%", height: "100%", objectFit: "cover"}} />
                            </div>
                            <h5 className="card-title">{recipe.recipeName}</h5>
                            <p className="card-text">{recipe.type}</p>
                            <br></br>
                            <div>
                                <button className="btn btn-dark me-2"
                                    onClick={() => updateRecipeEditBtnFunction(recipe)}>Edit</button>
                                <button className="btn btn-dark me-2"
                                    onClick={deleteRecipeBtnOnClickHandler(recipe.recipeID as string)}>Delete</button>
                                <button className="btn btn-dark me-2" onClick={showRecipeDetails(recipe)}>Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div id="recipeDetailsParent" >
                {<RecipeDetails recipe={detailedRecipe as ReceipeData} closeRecipeDetails={closeRecipeDetails} />}
            </div>
        </div>

    );
}

export default HandleRecipe;