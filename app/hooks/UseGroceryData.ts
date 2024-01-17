import { GroceryItem } from "../grocery/CreateNewGroceryItem";


export enum groceryRestfulType {
    POST = "POST",
    PUT = "PUT",
    GET = "GET",
    DELETE = "DELETE",
}
type UseGroceryProps = {
    action : groceryRestfulType,
    groceryRegisterForm : GroceryItem,
}

const UseGroceryData = async ({ action, groceryRegisterForm } : UseGroceryProps) => {
    if(action === groceryRestfulType.GET) {
        await fetch(process.env.NEXT_PUBLIC_API_URL+ "/groceryItem", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        })
        .then((response) => response.json())
        .then((data) => {
          if(data !== null && data !== undefined && data !== "")
          console.log(data);
            // setRecipeList(data)
          return data;
        })
    }else if(action === groceryRestfulType.POST) {
        await fetch(process.env.NEXT_PUBLIC_API_URL + "/groceryItem", {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(groceryRegisterForm)
            // ...form,
            // ingredient: Array.from(form?.ingredient.entries())
          // }),
        })
    }

}

export default UseGroceryData;
  