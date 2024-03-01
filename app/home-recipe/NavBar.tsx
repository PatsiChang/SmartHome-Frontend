import Link from 'next/link';
import './homeRecipe.css';
import personalInfo from '../IMG/personalInfo.png';
import Image from 'next/image';



const HomeRecipeNavBar = () => {
    return (
       <nav className="navBar">
        <div className="links">
            <li className="pageContent">
                <Link href="/home-recipe">Home</Link>
            </li>
            <li className="pageContent">
                <Link href="/home-recipe">My recipe</Link>
            </li>
            <li className="pageContent">
                <Link href="/grocery">My Grocery</Link>
            </li>
            <li id="personalIconTab"> 
                <Link href="/personalInfo">
                    <Image id="personalIcon" src={personalInfo} alt="icon" />
                </Link>
            </li>
        </div>
       </nav>
    );
}

export default HomeRecipeNavBar;