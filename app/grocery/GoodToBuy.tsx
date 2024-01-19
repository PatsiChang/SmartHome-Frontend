import UseGroceryData, { groceryRestfulType } from "../hooks/useGroceryData";
import './grocery.css'



const GoodToBuy = () => {
    const { goodToBuyGroceryList } = UseGroceryData();
    if (!goodToBuyGroceryList) {
        return null; // or return an empty array: return [];
      }
 
    return(
        <div className="goodToBuyList">
            {goodToBuyGroceryList.map((groceryItem, index) => (
                <div className="goodToBuyGrocery" key = {groceryItem.groceryItemName}>
                    <div>{groceryItem.groceryItemName}</div>
                </div>

             ))}
        </div>
    )

}

export default GoodToBuy;