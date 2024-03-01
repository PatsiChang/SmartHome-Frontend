
export enum LogInRestfulType {
    POST = "POST",
    PUT = "PUT",
    GET = "GET",
    DELETE = "DELETE",
}
type Props = {
    userId: string,
    passwordHashed: string,
}

const useLogInData  = () => {
    
    const fetchData = (logInRestfulType: LogInRestfulType) => 
    async({ userId, passwordHashed } : Props)=>{

      const formData = new FormData();
      formData.append("userId", userId as string);
      formData.append("passwordHashed", passwordHashed as string);

        // const formData: FormData = {
        //   userId: userId,
        //   passwordHashed: passwordHashed,
        // }

        try{
            if(logInRestfulType === LogInRestfulType.PUT ) {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL1 + "/login", {
                    method: 'PUT',
                    // headers: {
                    //   'Content-Type': 'application/json',
                    //   'Accept': 'application/json'
                    // },
                    body: formData
                  })
                  .then((response) => response.json())
                  if (response === "true"){
                    console.log("Front End successfully Get");
                  }else{
                    console.log("Returned false");
                  }
                  
              }
        }catch (error) {
          console.error('Error:', error);
        }
    }

  const postData = fetchData(LogInRestfulType.POST);
  const putData = fetchData(LogInRestfulType.PUT);
  return { postData, putData };

} 

export default useLogInData;