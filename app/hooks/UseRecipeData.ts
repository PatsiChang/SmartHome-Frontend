import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Form, RecipeTypes } from '../home-recipe/RegisterRecipe';
import { Ingredient } from '../home-recipe/IngredientList';

export type GetRecipeType = {
  recipeList: Array<ReceipeData>
  setRecipeList: Dispatch<SetStateAction<Array<ReceipeData>>>
};

export type ReceipeData = {
  recipeID?: string;
  recipeName: string;
  type: RecipeTypes;
  ingredient: Ingredient[];
  steps: string[];
  imgURL?: string;
};

export enum ACTION {
  get = "GET",
  post = "POST",
  put = "PUT",
  delete = "DELETE",
} 

type Props = {
  recipeName? : string;
  form? : Form
  recipeIcon? : File | Blob;
  recipeIDTMP?: string | null
}


const useRecipeData = ({ recipeIDTMP, recipeName, form } : Props = {}) => {
  
  const [recipeList, setRecipeList] = useState<Array<ReceipeData>>([]);
  const [currentRandomRecipe, setCurrentRandomRecipe] = useState<ReceipeData>();

  

  const fetchData = (action: ACTION, directory: string) => async ({ recipeName, form, recipeIDTMP, recipeIcon }: Props) => {

    try {
      const recipeID = recipeIDTMP as string;
      const formData = new FormData();
      formData.append("recipeID", recipeID as string);
      formData.append("recipeIcon", recipeIcon as Blob);

      if(action === ACTION.get) {
        await fetch(process.env.NEXT_PUBLIC_API_URL + directory, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        })
        .then((response) => response.json())
        .then((data) => {
          if(data !== null && data !== undefined && data !== ""){
            if(directory=="/recipe"){
              setRecipeList(data)
            }else if (directory==="/recipe/getRandomRecipe"){
              setCurrentRandomRecipe(data)
            }
           
           return data;
          }
        })
      }else if(action === ACTION.delete) {
        await fetch(process.env.NEXT_PUBLIC_API_URL + "/recipe", {
          method: 'DELETE',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(recipeID),
        })
        await getData({recipeName: "GetData"});
      }else if(action === ACTION.post) {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/recipe", {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(form)
          
        })
      const recipeID = await response.json();
      await getData({recipeName: "GetData"});
      return recipeID;

      }else if (action === ACTION.put) {
        if (!recipeID) throw new Error("No recipeID!");
        fetch(process.env.NEXT_PUBLIC_API_URL + "/recipe/addRecipeIcon", {
          method: 'PUT',
          body: formData,
        })

      }
  
    } catch (error) {
      console.error('Error:', error);
      setRecipeList([]);
    }
  };

  const postData = fetchData(ACTION.post, "");
  const getRandomRecipe = fetchData(ACTION.get, "/recipe/getRandomRecipe");
  const getData = fetchData(ACTION.get,"/recipe");
  const updateRecipeIcon = fetchData(ACTION.put,"");
  const updateData = fetchData(ACTION.put,"");
  const deleteData = fetchData(ACTION.delete,"");
  
  useEffect(() => {
    getData({recipeName: "GetData"});
    getRandomRecipe({});
  }, []);
  
  return { recipeList, currentRandomRecipe, setCurrentRandomRecipe, fetchData, postData, getData, updateData, deleteData, updateRecipeIcon, getRandomRecipe}

}

  export default useRecipeData;
