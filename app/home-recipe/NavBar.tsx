import Link from 'next/link';
import './homeRecipe.css';
import personalInfo from '../IMG/personalInfo.png';
import Image from 'next/image';



const HomeRecipeNavBar = () => {
    return (
        <nav className="navbar bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid d-flex justify-content-between align-items-center ">
                <div>       
                    <a className="navbar-brand me-5" href="/home-recipe">Smart Home</a>
                    <a className="navbar-item me-4" href="/home-recipe">Recipes</a>
                    <a className="navbar-item me-4" href="/grocery">Groceries</a>
                    <a className="navbar-item me-4 disabled-link" href="/grocery">Login</a>
                </div>
                <a className="navbar-item" href="/personalInfo">
                    <Image id="personalIcon" src={personalInfo} alt="icon" />
                </a>
            </div>
        </nav>

    );
}

export default HomeRecipeNavBar;