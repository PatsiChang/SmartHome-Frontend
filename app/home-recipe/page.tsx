'use client'
import Image from 'next/image';
import './homeRecipe.css';
import HomeRecipeNavBar from './NavBar';
import sashimiDemo from '../IMG/sashimiDemo.jpg';
// import ImageGrid from './ImageGrid';
import RegisterRecipe, { RecipeTypes } from './RegisterRecipe';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import HandleRecipe from './HandleRecipes';
import ImgSlider from './ImgSlider';
import useRecipeData, { ReceipeData } from '../hooks/useRecipeData';
import RandomRecipe from './RandomRecipe';
// import RecipeDetails from './RecipeDetails';

export type HomeRecipeState = {
  propsTrigger: boolean;
  setPropsTrigger: Dispatch<SetStateAction<boolean>>
};

export type RandomRecipeProps = {
  randomRecipeVisibility: boolean,
  setRandomRecipeVisibility: Dispatch<SetStateAction<boolean>>,
}

export const emptyFormValue : ReceipeData = {
  recipeID: undefined,
  recipeName: "",
  type: RecipeTypes.BREAKFAST,
  ingredient: [{ id: '', ingredientName: '', ingredientAmount: '' }],
  steps: [""],
  imgURL: "",
}

function HomeRecipe() {

  const { getRandomRecipe }  = useRecipeData();
  const[propsTrigger, setPropsTrigger] = useState(false);
  const[randomRecipeVisibility, setRandomRecipeVisibility] = useState(false);
  const[existingFormValue, setExistingFormValue] = useState<ReceipeData>(emptyFormValue);


  const toggleRegisterNewRecipe = () => {
    setPropsTrigger(true)
  }
  const generateRandomRecipe = async () => {
    await getRandomRecipe({});
    setRandomRecipeVisibility(true)

  }
  useEffect(() => {
    if (existingFormValue?.recipeID!== undefined){
      setPropsTrigger(true);
    }
  }, [existingFormValue]);

  return (
    <main>
      <div className='homeRecipe'>
        <div><HomeRecipeNavBar /></div>
        <div className='recipeDisplayBanner'><Image id="sashimiDemo" src={sashimiDemo} alt="Sashimi"/></div>
      </div>
      <div className='middleRow'> 
        <div id='addRecipe'> My Recipes </div>
      </div>
      <div className='createNewRecipe'>
        <div><button className='createNewRecipeBtn' onClick={toggleRegisterNewRecipe}>Register New Recipe +</button></div> 
        <div><button onClick={generateRandomRecipe}>+ Generate Recipe</button></div>
      </div>
      <div><RandomRecipe randomRecipeVisibility={randomRecipeVisibility} setRandomRecipeVisibility={setRandomRecipeVisibility} /></div>
      <div><RegisterRecipe propsTrigger={propsTrigger} setPropsTrigger={setPropsTrigger} existingFormValue={existingFormValue} setExistingFormValue={setExistingFormValue}/></div>
      <div><HandleRecipe existingFormValue={existingFormValue} setExistingFormValue={setExistingFormValue}/></div>
      <div className='imgSliderContainer'><ImgSlider /></div>
      {/* <div><ImageGrid /></div> */}
    </main>
  
  )
}

export default HomeRecipe;
