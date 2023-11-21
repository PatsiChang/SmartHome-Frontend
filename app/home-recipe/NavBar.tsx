import './homeRecipe.css';

const HomeRecipeNavBar = () => {
    return (
       <nav className="navBar">
        {/* <h1>My Recipes</h1> */}
        <div className="links">
            <li className="pageContent"><a href="">Home</a></li>
            <li className="pageContent"><a href="">HomeRecipe</a></li>
            <li className="pageContent"><a href="">Grocery</a></li>
        </div>
       </nav>
    );
}

export default HomeRecipeNavBar;