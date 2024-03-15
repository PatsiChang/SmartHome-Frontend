'use client'
import personalInfo from '../IMG/personalInfo.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import '../home-recipe/homeRecipe.css'

const HomeRecipeNavBar = () => {
    const router = useRouter();
    const directToRecipeHome = (link: string) => {
        router.push(link);
    }
    return (
        <nav className="navbar bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid d-flex justify-content-between align-items-center ">
                <div>
                    <a className="navbar-brand me-5" onClick={() => directToRecipeHome('./home-recipe')}>Smart Home</a>
                    <a className="navbar-item me-4" onClick={() => directToRecipeHome("/home-recipe")}>Recipes</a>
                    <a className="navbar-item me-4" onClick={() => directToRecipeHome("/grocery")}>Groceries</a>
                    <a className="navbar-item me-4" onClick={() => directToRecipeHome("/social-media")}>Social</a>

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