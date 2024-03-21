'use client'
import React, { useState, FormEventHandler, Dispatch, SetStateAction, ChangeEvent, useEffect } from "react";
import { HomeRecipeState, emptyFormValue } from "./page";
import ProgressBar from "./ProgressBar";
import { ReceipeData } from "../hooks/useRecipeData";
import IngredientList, { Ingredient } from "./IngredientList";
import StepsList, { Steps } from "./StepsList";
import { v4 as uuidv4 } from "uuid"

//Types
type RegisterRecipeProps = {
    token: string,
    postData: (token: string) => <T>(input: T) => Promise<ReceipeData[] | null>,
    getData: (token: string) => <T>(input: T) => Promise<ReceipeData[] | null>,
    uploadRecipeIcon: (input: FormData) => Promise<string | null>,
    propsTrigger: HomeRecipeState['propsTrigger'],
    setPropsTrigger: HomeRecipeState["setPropsTrigger"],
    existingFormValue: ReceipeData,
    setExistingFormValue: Dispatch<SetStateAction<ReceipeData>>,
}
export type UploadFormFile = {
    file: File,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
};
export type UploadFormError = {
    error: string,
    setError: React.Dispatch<React.SetStateAction<string | null>>
};
export type UploadFormState = UploadFormFile & UploadFormError;
export type onchangeEvent = React.ChangeEvent<HTMLInputElement>;

export type Form = {
    recipeName: string | null;
    type: RecipeTypes | null;
    ingredient: Ingredient[] | null;
    steps: string[] | null;
}
//Restrict File Types
const ImgTypes = ['image/png', 'image/jpeg']

export enum RecipeTypes {
    BREAKFAST = "BREAKFAST",
    LUNCH = "LUNCH",
    DINNER = "DINNER",
    DESSERT = "DESSERT",
}
const RegisterRecipe = ({ token, postData, getData, uploadRecipeIcon, propsTrigger, setPropsTrigger,
    existingFormValue }: RegisterRecipeProps) => {
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const [imgBytes, setImgBytes] = useState<File | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [errorCode, setErrorCode] = useState<string | null>("");
    const [imgState, setImgState] = useState<string | null>("Add Recipe Icon");
    const [ingredientInput, setIngredientInput] = useState<Ingredient[]>([{ id: '', ingredientName: '', ingredientAmount: '' }]);
    const [stepsInput, setStepsInput] = useState<Steps[]>([{ id: '', step: '' }]);
    const [stepsInStringArray, setStepsInStringArray] = useState<string[]>();
    const [recipeFormData, setRecipeFormData] = useState<ReceipeData>(() => existingFormValue);

    useEffect(() => {
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
            setFile(selected);
            setImgUrl(URL.createObjectURL(selected));
            setImgState("Change Icon");
            setError('');
        } else {
            setFile(null);
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
                await postData(token)(form);
                getData(token)(null);
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
                    {file && <ProgressBar file={file} setFile={setFile} />}
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