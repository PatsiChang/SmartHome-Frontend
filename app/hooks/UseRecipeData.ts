import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Form } from '../home-recipe/RegisterRecipe';
import { Ingredient } from '../home-recipe/IngredientList';


export type GetRecipeType = {
  recipeList: Array<ReceipeData>
  setRecipeList: Dispatch<SetStateAction<Array<ReceipeData>>>
};

export type ReceipeData = {
  recipeID?: string;
  recipeName: string;
  type: string;
  ingredient: Map<string, string>;
  steps: string;
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
}


const useRecipeData = ({ recipeName, form } : Props = {}) => {
  
  const [recipeList, setRecipeList] = useState<Array<ReceipeData>>([]);

  const fetchData = (action: ACTION) => ({ recipeName, form }: Props) => {
    try {
      // const plainFormData: { [key: string]: FormDataEntryValue } = {};
      // formData.forEach((value: FormDataEntryValue, key: string) => {
      //   plainFormData[key] = value;
      // });
      
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
        })
      }else if(action === ACTION.delete) {
        fetch(process.env.NEXT_PUBLIC_API_URL + "/recipe", {
          method: 'DELETE',
          body: recipeName
        })
        .then((data) => {
          console.log(JSON.stringify(data) + "deleted ")
        })
      }else if(action === ACTION.post) {
        console.log("FrontEnd Posted")
        console.log("Fetch API BODY: ", form)
        fetch(process.env.NEXT_PUBLIC_API_URL + "/recipe", {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(form),
        })
      }
  
    } catch (error) {
      console.error('Error:', error);
      setRecipeList([]);
    }
  };

  const postData = fetchData(ACTION.post);
  const getData = fetchData(ACTION.get);
  const updateData = fetchData(ACTION.get);
  const deleteData = fetchData(ACTION.get);
  
  console.log("useRecipeData recipeList", recipeList)
  console.log("useRecipeData {recipeName, formData }", { recipeName, form })
  useEffect(() => {
    console.log("useRecipeData useEffect recipeList", recipeList);
    getData({recipeName, form });
  }, []);

  return { recipeList, fetchData, postData, getData, updateData, deleteData }

}

  export default useRecipeData;
