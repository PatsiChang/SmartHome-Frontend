import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import RegisterRecipe from '../home-recipe/RegisterRecipe'

export type GetRecipeType = {
  recipeList: Array<ReceipeData>
  setRecipeList: Dispatch<SetStateAction<Array<ReceipeData>>>
};

export type ReceipeData = {
  recipeID?: string
  recipeName: string
  type: string
  ingredient: any
  steps: string
  imgURL?: string
};
export type FormData = {

}

export enum ACTION {
  get = "GET",
  post = "POST",
  put = "PUT",
  delete = "DELETE",
} 

type Props = {
  action: ACTION;
  recipeName? : string;
}


const useRecipeData = ({ action, recipeName }: Props) => {
  
  const [recipeList, setRecipeList] = useState<Array<ReceipeData>>([]);

  const fetchData = ({ action,  recipeName }: Props) => {
    try {
      if(action === ACTION.get) {
        fetch(process.env.NEXT_PUBLIC_API_URL + "/recipe", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        })
        .then((response) => response.json())
        .then((data) => {
          console.log("Afterfetching data: " + JSON.stringify(data))
          setRecipeList(data)
        });
      }else if(action === ACTION.delete) {
        fetch(process.env.NEXT_PUBLIC_API_URL + "/recipe", {
          method: 'DELETE',
          body: JSON.stringify(recipeName)
        })
        .then((data) => {
          console.log(JSON.stringify(data) + "deleted ")
        });
      }else if(action === ACTION.put) {
        fetch(process.env.NEXT_PUBLIC_API_URL + "/recipe", {
          method: 'PUT',
          body: 'formData'
        })
      }
  
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  console.log("useRecipeData recipeList", recipeList)
  useEffect(() => {
    console.log("useRecipeData useEffect recipeList", recipeList);

    fetchData({ action, recipeName });
  }, [action]);

  return { recipeList, fetchData }

}

  export default useRecipeData;
