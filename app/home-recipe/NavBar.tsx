import Link from 'next/link';
import './homeRecipe.css';

const HomeRecipeNavBar = () => {
    return (
       <nav className="navBar">
        {/* <h1>My Recipes</h1> */}
        <div className="links">
            <li className="pageContent">
                <Link href="/page">Home</Link>
            </li>
            <li className="pageContent">
                <Link href="/page">My recipe</Link>
            </li>
            <li className="pageContent">
                <Link href="">My Grocery</Link>
            </li>
        </div>
       </nav>
    );
}

export default HomeRecipeNavBar;