import { Dispatch, SetStateAction, useState, useContext } from "react";
import useRecipeData, { ReceipeData } from "../hooks/useRecipeData";
import RecipeDetails from "./RecipeDetails";
import { RecipeTypes } from "./RegisterRecipe";
import { getImages } from "./utils";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import SmartHomeLogger from "../logger";
import { RecipeDataContext } from "../providers";

type DeleteRecipeBtnOnClickHandler = (recipe: ReceipeData) => React.MouseEventHandler<HTMLButtonElement>
type ShowdetailedRecipe = (recipe: ReceipeData) => React.MouseEventHandler<HTMLButtonElement>
export type CloseRecipeDetails = React.MouseEventHandler<HTMLButtonElement>

export type HandleRecipeProps = {
    recipeList: ReceipeData[],
    existingFormValue: ReceipeData,
    setExistingFormValue: Dispatch<SetStateAction<ReceipeData>>,
}

const HandleRecipe = ({ recipeList, setExistingFormValue }: HandleRecipeProps) => {

    // const { recipeList, getData, deleteData } = useRecipeData();
    const [detailedRecipe, setDetailedRecipe] = useState<ReceipeData | null>(null);
    const [recipeTypeState, setRecipeTypeState] = useState<RecipeTypes>(RecipeTypes.DESSERT)

    const RecipeCount = () => {
        return recipeList
            .filter(recipe => recipe.type === recipeTypeState)
            .length
    }
    const deleteRecipeBtnOnClickHandler: DeleteRecipeBtnOnClickHandler = (recipe) => (event) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this recipe?");
        // event.stopPropagation();
        if (isConfirmed && RecipeCount() >= 3) {
            // deleteData({ recipeIDTMP: recipe.recipeID });
            // window.location.reload();
        } else {
            SmartHomeLogger.log("At least 2 recipe needed")
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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        // initialSlide: 2,
    };

    //Return individual Recipe Card
    const recipeCardIndividual = (recipe: ReceipeData) => {
        return (
            <div className="card" style={{ backgroundColor: 'var(--middleColor0)' }}>
                <div className="card-body">
                    <div style={{ width: "100%", height: "200px", overflow: "hidden", margin: "0% 0% 2% 0%" }}>
                        <img src={handleRecipeIcons(recipe.imgURL)} alt={'recipeIcon'} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <h5 className="card-title">{recipe.recipeName}</h5>
                    <p className="card-text">{recipe.type}</p>
                    <br></br>
                    <div>
                        <button className="btn btn-dark me-2"
                            onClick={() => updateRecipeEditBtnFunction(recipe)}>Edit</button>
                        <button className="btn btn-dark me-2"
                            onClick={deleteRecipeBtnOnClickHandler(recipe)}>Delete</button>
                        <button className="btn btn-dark me-2" onClick={showRecipeDetails(recipe)}>Details</button>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <div className={`row g-2 {$zindex-dropdown}`} >
                {/* Return the recipe Types buttons */}
                <div className="row justify-content-center" style={{ margin: "3% 0% 2% 0%" }}>
                    {Object.values(RecipeTypes)
                        .map((recipeTypes, index) => {
                            return (
                                <div className="col-auto" key={index}>
                                    <button type="button" onClick={() => filterRecipe(recipeTypes)}
                                        className="btn btn-dark me-2">{recipeTypes}</button>
                                </div>
                            )
                        })}
                </div>
                <div className="slider-container">
                    <Slider {...settings}>
                        {recipeList
                            .filter(recipe => recipe.type === recipeTypeState)
                            .map((recipe, index) => {
                                return (
                                    <div key={index}>
                                        <h3>{recipeCardIndividual(recipe)}</h3>
                                    </div>
                                )
                            })}
                    </Slider>
                </div>

            </div>
            <div className="position-fixed top-50 start-50 translate-middle" style={{ zIndex: "9999" }} >
                {<RecipeDetails recipe={detailedRecipe as ReceipeData} closeRecipeDetails={closeRecipeDetails} />}
            </div>
        </div>

    );
}

export default HandleRecipe;