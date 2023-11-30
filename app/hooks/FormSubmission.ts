import RegisterRecipe from '../home-recipe/RegisterRecipe'

const handleFormSubmit = async (formData : FormData) => {
    try {
        console.log("test success 1")
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/recipe", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Form data successfully submitted!');
      } else {
        console.error('Failed to submit form data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  export default handleFormSubmit;
