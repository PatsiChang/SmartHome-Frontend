import RegisterRecipe from '../home-recipe/RegisterRecipe'

const handleGetRecipe = async (formData : FormData) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/recipe", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        
      })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
  
      if (response.ok) {
        console.log('Form data successfully retrieved!');
        console.log(response)
      } else {
        console.error('Failed to retrieve form data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  export default handleGetRecipe;
