'use client'
import Image from 'next/image';
import './homeRecipe.css';
import HomeRecipeNavBar from './NavBar';
import sashimiDemo from '../IMG/sashimiDemo.jpg';
import ImageGrid from './ImageGrid';
import RegisterRecipe from './RegisterRecipe';
import { Dispatch, SetStateAction, useState } from 'react';
import HandleRecipe from './HandleRecipes';
import ImgSlider from './ImgSlider';
import useRecipeData from '../hooks/UseRecipeData';
// import RecipeDetails from './RecipeDetails';

export type HomeRecipeState = {
  propsTrigger: boolean;
  setPropsTrigger: Dispatch<SetStateAction<boolean>>
};

function HomeRecipe() {

  const { getRandomRecipe }  = useRecipeData();
  const[propsTrigger, setPropsTrigger] = useState(false);
  const toggleRegisterNewRecipe = () => {
    setPropsTrigger(true)
  }
  const generateRandomRecipe = () => {
    getRandomRecipe({});
    console.log( getRandomRecipe({}))
  }

  return (
    <main>
      <div className='homeRecipe'>
        <div><HomeRecipeNavBar /></div>
        <div className='recipeDisplayBanner'><Image id="sashimiDemo" src={sashimiDemo} alt="Sashimi"/></div>
      </div>
      <div className='middleRow'> 
        <div id='addRecipe'> My Recipe </div>
      </div>
      <div className='createNewRecipe'>
        <div><button className='createNewRecipeBtn' onClick={toggleRegisterNewRecipe}>Register New Recipe +</button></div>
        <div><button onClick={generateRandomRecipe}>+ Generate Recipe</button></div>
      </div>
      <div><RegisterRecipe propsTrigger={propsTrigger} setPropsTrigger={setPropsTrigger} /></div>
      <div><HandleRecipe /></div>
      <div className='imgSliderContainer'><ImgSlider /></div>
      {/* <div><ImageGrid /></div> */}
    </main>
  
  )
}

export default HomeRecipe;
