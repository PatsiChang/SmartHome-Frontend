import Image from 'next/image';
import './homeRecipe.css';
import HomeRecipeNavBar from './NavBar';
import sashimiDemo from '../IMG/sashimiDemo.jpg';
import UploadForm from './UploadForm';
import ProgressBar from './ProgressBar';



function HomeRecipe() {
  // const SashimiImgDemo = require("../IMG/sashimiDemo.jpg");
    // TS Code
  return (
    // HTML Code
    <main>
       <div className='homeRecipe'>
        <div><HomeRecipeNavBar /></div>
        <div className='recipeDisplayBanner'><Image id="sashimiDemo" src={sashimiDemo} alt="Sashimi"/></div>
        
      </div>
      <div className='middleRow'> 
        <div id='addRecipe'> Add New Recipe </div>
      </div>

      <div><UploadForm /></div>




      {/* <div className='gridContainer'> 
        <div className='grid-item'>1</div>
        <div className='grid-item'>2</div>
        <div className='grid-item'>3</div>
        <div className='grid-item'>4</div>
        <div className='grid-item'>5</div>
        <div className='grid-item'>6</div>
      </div> */}
     
    </main>
  
  )
}

export default HomeRecipe;
