'use client'
import { Dispatch, SetStateAction, useState } from "react"
import HomeRecipeNavBar from "../home-recipe/NavBar"
import CreateNewGroceryItem from "./CreateNewGroceryItem"
import './grocery.css'
import GoodToBuy from "./GoodToBuy"
import useRecipeData from "../hooks/useRecipeData"

// export type Grocery = {
//     groceryName : string,
//     count : number,
//     groceryImg : string,
// }
export type CreateNewGroceryFormProps = {
    visibility: boolean;
    setVisibility: Dispatch<SetStateAction<boolean>>
  };

const GroceryHome = () => {
    
    const [visibility, setVisibility] = useState<boolean>(false);

    const openNewGroceryFrom = () => {
        setVisibility(true);
    }
    return(
        <div className="body">
            <div><HomeRecipeNavBar /></div>
            <br></br>
            <div id="subNav">
                <div>Grocery List</div>
                <div>Grocery Shops</div>
            </div>
            <div style={{ width: "100vw" }}><CreateNewGroceryItem visibility = {visibility} setVisibility = {setVisibility}/></div>

             <div id="GroceryMainPageBody">
                {/* Good To buy, Must Buy, Stock */}
                <div className="GrocerytoByList">
                    <div id="goodToBuyLabel">
                        <label>Good To Buy </label> 
                        <button onClick={openNewGroceryFrom} className="addGroceryBtn"> + </button>
                    </div>
                    <div id="GoodToBuy"> 
                        <div>< GoodToBuy/></div>
                    </div>
                </div>
        
                <div className="GrocerytoByList">
                    <div id="goodToBuyLabel">
                        <label>Must Buy </label> 
                        <button onClick={openNewGroceryFrom} className="addGroceryBtn"> + </button>
                    </div>
                    <div id="GoodToBuy"> 
                        <div>< GoodToBuy/></div>
                    </div>
                </div>
                <div className="GrocerytoByList">
                    <div id="goodToBuyLabel">
                        <label>Home Stock</label> 
                        <button onClick={openNewGroceryFrom} className="addGroceryBtn"> + </button>
                    </div>
                    <div id="GoodToBuy"> 
                        <div>< GoodToBuy/></div>
                    </div>

                </div>
             </div>

        </div>
    )
}

export default GroceryHome;