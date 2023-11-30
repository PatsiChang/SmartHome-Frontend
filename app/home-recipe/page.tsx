import Image from 'next/image';
import './homeRecipe.css';
import HomeRecipeNavBar from './NavBar';
import sashimiDemo from '../IMG/sashimiDemo.jpg';
import addBtn from '../IMG/addBtn.png';
import UploadForm from './UploadForm';
import ImageGrid from './ImageGrid';
import RegisterRecipe from './RegisterRecipe';
// import ProgressBar from './ProgressBar';



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
      <div><RegisterRecipe  propsTrigger/></div>
      <div><ImageGrid /></div>
     
    </main>
  
  )
}

export default HomeRecipe;
