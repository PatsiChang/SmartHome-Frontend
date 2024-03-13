'use client'
import './homeRecipe.css';
import HomeRecipeNavBar from './NavBar';
import RegisterRecipe, { RecipeTypes } from './RegisterRecipe';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import HandleRecipe from './HandleRecipes';
import ImgSlider from './ImgSlider';
import useRecipeData, { ReceipeData } from '../hooks/useRecipeData';
import RandomRecipe from './RandomRecipe';

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

  const { getRandomRecipe } = useRecipeData();
  const [propsTrigger, setPropsTrigger] = useState(false);
  const [randomRecipeVisibility, setRandomRecipeVisibility] = useState(false);
  const [existingFormValue, setExistingFormValue] = useState<ReceipeData>(emptyFormValue);

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
      <div className="position-fixed top-50 start-50 translate-middle" style={{zIndex: "9999" }}>
        <RandomRecipe randomRecipeVisibility={randomRecipeVisibility}
          setRandomRecipeVisibility={setRandomRecipeVisibility} />
      </div>
      <div><RegisterRecipe propsTrigger={propsTrigger} setPropsTrigger={setPropsTrigger}
        existingFormValue={existingFormValue} setExistingFormValue={setExistingFormValue} />
      </div>
      <div><HandleRecipe existingFormValue={existingFormValue} setExistingFormValue={setExistingFormValue} /></div>
    </main>

  )
}

export default HomeRecipe;
