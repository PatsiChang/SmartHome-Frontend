'use client'
import './homeRecipe.css';
import HomeRecipeNavBar from '../navbar/page';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import HandleRecipe from './HandleRecipes';
import ImgSlider from './ImgSlider';
// import RandomRecipe from './RandomRecipe';
import { DataContext, ImgDataContext } from '../providers';
import { ReceipeData, RecipeTypes } from '../types/recipeTypes';
import RegisterRecipe from './RegisterRecipe';

export type HomeRecipeState = {
  propsTrigger: boolean;
  setPropsTrigger: Dispatch<SetStateAction<boolean>>
};

export type RandomRecipeProps = {
  randomRecipeVisibility: boolean,
  setRandomRecipeVisibility: Dispatch<SetStateAction<boolean>>,
}

export const emptyFormValue: ReceipeData = {
  recipeID: undefined,
  recipeName: "",
  type: RecipeTypes.BREAKFAST,
  ingredient: [{ id: '', ingredientName: '', ingredientAmount: '' }],
  steps: [""],
  imgURL: "",
}

function HomeRecipe() {

  const dataContext = useContext(DataContext);
  if (!dataContext) { return null; }
  const { recipeList, postRecipeData, getRecipeData, deleteRecipeData } = dataContext;

  const imgDataContext = useContext(ImgDataContext);
  if (!imgDataContext) { return null; }
  const { uploadRecipeIcon } = imgDataContext;

  const [propsTrigger, setPropsTrigger] = useState(false);
  const [randomRecipeVisibility, setRandomRecipeVisibility] = useState(false);
  const [existingFormValue, setExistingFormValue] = useState<ReceipeData>(emptyFormValue);

  const uploadNewRecipe = async (form: ReceipeData) => {
    await postRecipeData(form);
    getRecipeData(null);
  }
  const deleteRecipe = async (recipe: ReceipeData) => {
    await deleteRecipeData(recipe);
    getRecipeData(null);
  }
  const toggleRegisterNewRecipe = () => {
    setPropsTrigger(true)
  }
  const generateRandomRecipe = async () => {
    // await getRandomRecipe({});
    setRandomRecipeVisibility(true)
  }
  useEffect(() => {
    if (existingFormValue?.recipeID !== undefined) {
      setPropsTrigger(true);
    }
  }, [existingFormValue]);

  return (
    <main>
      <div className='homeRecipe'>
        <div><HomeRecipeNavBar /></div>
      </div>
      <div><ImgSlider /></div>
      <div className='createNewRecipe'>
        <div><button className="btn btn-dark" onClick={toggleRegisterNewRecipe}>Register Recipe +</button></div>
        <div><button className="btn btn-dark" onClick={generateRandomRecipe}>+ Generate Recipe</button></div>
      </div>
      {/* <div className="position-fixed top-50 start-50 translate-middle" style={{ zIndex: "9999" }}>
        <RandomRecipe randomRecipeVisibility={randomRecipeVisibility}
          setRandomRecipeVisibility={setRandomRecipeVisibility} />
      </div> */}
      <div><RegisterRecipe uploadNewRecipe={uploadNewRecipe} propsTrigger={propsTrigger} setPropsTrigger={setPropsTrigger}
        uploadRecipeIcon={uploadRecipeIcon}
        existingFormValue={existingFormValue} setExistingFormValue={setExistingFormValue} />
      </div>
      <div><HandleRecipe recipeList={recipeList} existingFormValue={existingFormValue} deleteRecipe={deleteRecipe}
        setExistingFormValue={setExistingFormValue} /></div>
    </main>

  )
}

export default HomeRecipe;
