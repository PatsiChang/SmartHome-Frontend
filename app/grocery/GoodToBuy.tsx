import { useState } from "react";
import { GroceryItem } from "./CreateNewGroceryItem";



const GoodToBuy = () => {
    const[goodToBuyGroceryList, setgoodToBuyGroceryList] = useState<GroceryItem | null>(null);
    
}

export default GoodToBuy;