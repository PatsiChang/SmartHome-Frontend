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
// import RecipeDetails from './RecipeDetails';

export type HomeRecipeState = {
  propsTrigger: boolean;
  setPropsTrigger: Dispatch<SetStateAction<boolean>>
};

function HomeRecipe() {
  const[propsTrigger, setPropsTrigger] = useState(false);
  const toggleRegisterNewRecipe = () => {
    setPropsTrigger(true)
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
        <button className='createNewRecipeBtn' onClick={toggleRegisterNewRecipe}>Register New Recipe </button>
      </div>
      {/* <div id="recipeDetailsParent">
        <div><RecipeDetails recipe={ null } /></div>
      </div> */}
      <div><RegisterRecipe propsTrigger={propsTrigger} setPropsTrigger={setPropsTrigger} /></div>
      <div><HandleRecipe /></div>
      <div className='imgSliderContainer'><ImgSlider /></div>
      <div><ImageGrid /></div>
     
    </main>
  
  )
}

export default HomeRecipe;
