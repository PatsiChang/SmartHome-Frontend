'use client'
import React, { useState, FormEventHandler, Dispatch, SetStateAction, ChangeEvent, useEffect } from "react";
import { HomeRecipeState, emptyFormValue } from "./page";
import IngredientList from "./IngredientList";
import StepsList from "./StepsList";
import { v4 as uuidv4 } from "uuid"
import { Ingredient, ReceipeData, RecipeTypes, Steps, UploadFormError, UploadFormFile } from "../types/recipeTypes";
import { getImages } from "./utils";

//Types
type RegisterRecipeProps = {
    uploadNewRecipe: (form: ReceipeData) => void,
    uploadRecipeIcon: (input: FormData) => Promise<string | null>,
    propsTrigger: HomeRecipeState['propsTrigger'],
    setPropsTrigger: HomeRecipeState["setPropsTrigger"],
    existingFormValue: ReceipeData,
    setExistingFormValue: Dispatch<SetStateAction<ReceipeData>>,
}

export type UploadFormState = UploadFormFile & UploadFormError;
export type onchangeEvent = React.ChangeEvent<HTMLInputElement>;

//Restrict File Types
const ImgTypes = ['image/png', 'image/jpeg']

const RegisterRecipe = ({ uploadNewRecipe, uploadRecipeIcon, propsTrigger, setPropsTrigger,
    existingFormValue }: RegisterRecipeProps) => {
    const [imgUrl, setImgUrl] = useState<string | undefined>();
    const [imgBytes, setImgBytes] = useState<File | null>(null);
    // const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [errorCode, setErrorCode] = useState<string | null>("");
    const [imgState, setImgState] = useState<string | null>("Add Recipe Icon");
    const [ingredientInput, setIngredientInput] = useState<Ingredient[]>([{ id: '', ingredientName: '', ingredientAmount: '' }]);
    const [stepsInput, setStepsInput] = useState<Steps[]>([{ id: '', step: '' }]);
    const [stepsInStringArray, setStepsInStringArray] = useState<string[]>();
    const [recipeFormData, setRecipeFormData] = useState<ReceipeData>(() => existingFormValue);

    useEffect(() => {
        setImgUrl(getImages(existingFormValue.imgURL))
        setRecipeFormData(existingFormValue)
        setIngredientInput(existingFormValue.ingredient)
        setStepsInStringArray(existingFormValue.steps)
    }, [existingFormValue])

    //Upload Recipe Image
    const changeHandler = (e: onchangeEvent) => {
        if (!e.target.files) return;
        let selected = e.target.files[0];
        if (selected && ImgTypes.includes(selected.type)) {
            setImgBytes(selected)
            setImgUrl(URL.createObjectURL(selected));
            setImgState("Change Icon");
            setError('');
        } else {
            setError('Not an image file (png or jpeg)');
        }
    }
    // useful library: lodash , yui for form
    const changeRecipeStepsToStepType = () => {
        if (stepsInStringArray !== undefined) {
            stepsInStringArray.map((step, idx) => {
                if (idx > 0) {
                    setStepsInput((previousInput) => [...previousInput, { id: uuidv4(), step: step }]);
                } else {
                    const newStepsInput = [...stepsInput];
                    newStepsInput[idx].id = uuidv4();
                    newStepsInput[idx].step = step;
                    setStepsInput(newStepsInput);
                }
            })
        }
    }
    useEffect(() => {
        changeRecipeStepsToStepType();
    }, [stepsInStringArray])

    const handleReipeNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRecipeFormData(prevState => {
            return {
                ...prevState,
                recipeName: e.target.value
            }
        })
    };
    const handleReipeTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setRecipeFormData(prevState => {
            return {
                ...prevState,
                type: e.target.value as RecipeTypes
            }
        })
    };
    const refreshForm = () => {
        setPropsTrigger(false);
        setRecipeFormData(emptyFormValue);
        setIngredientInput([{ id: '', ingredientName: '', ingredientAmount: '' }]);
        setStepsInput([{ id: '', step: '' }]);
        setStepsInStringArray([]);
        setImgUrl("")
    }
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        try {
            event.preventDefault();
            const imgURL = imgBytes as Blob;
            const formData = new FormData();
            formData.append("recipeIcon", imgURL as Blob);
            const imgId = await uploadRecipeIcon(formData);
            let stepsInStringArray: string[] = [];
            stepsInput.forEach((step) => stepsInStringArray.push(step.step));
            if (imgId !== null && imgId !== undefined) {
                const form: ReceipeData = {
                    ...recipeFormData,
                    ingredient: ingredientInput,
                    steps: stepsInStringArray,
                    imgURL: imgId,
                }
                uploadNewRecipe(form);
                refreshForm();
            }
        } catch (error) {
            console.error(error)
        }
    };

    return propsTrigger ? (
        <div className="registerRecipe">
            <div className="registerRecipeCloseBtn">
                <button className="close-btn" onClick={refreshForm}>close</button>
            </div>
            <form id="registerRecipePopUp" onSubmit={handleSubmit}>
                <label id="addRecipeIcons" >
                    <input type="file" name="recipeImg" onChange={changeHandler} />
                    <span id="addRecipeIcon" > {imgState} </span>
                </label>
                <div className="output">
                    {imgUrl && <img id="recipeImg" src={imgUrl}
                        style={{ width: "100%", height: "200px", overflow: "hidden", margin: "0% 0% 2% 0%" }} />}
                    {error && <div className="error">{error}</div>}
                </div>
                <div>
                    <label htmlFor="recipeName">Recipe Name: </label>
                    <input type="textfield" id="recipeName" name="recipeName" onChange={handleReipeNameChange} value={recipeFormData.recipeName} />
                </div>
                <span>Recipe Type: </span>
                <div id="radioBtn">
                    {Object.values(RecipeTypes).map((recipeType) => {
                        return (
                            <div>
                                <label htmlFor="breakfast">{recipeType} </label>
                                <input type="radio" id={recipeType} value={recipeType}
                                    checked={recipeFormData.type === recipeType}
                                    onChange={handleReipeTypeChange} />
                            </div>
                        )
                    })}
                </div>
                <div><IngredientList ingredientInput={ingredientInput} setIngredientInput={setIngredientInput}
                    setRecipeFormData={setRecipeFormData} /></div>
                <span>Recipe Steps: </span>
                <div><StepsList stepsInput={stepsInput} setStepsInput={setStepsInput}
                    stepsInStringArray={stepsInStringArray} /></div>
                <span id="responce"></span>
                <button type="submit" id="submitRecipe">Submit Recipe</button>
                <div id="errorCode">{errorCode}</div>
            </form>
        </div>
    ) : <></>;
}

export default RegisterRecipe;