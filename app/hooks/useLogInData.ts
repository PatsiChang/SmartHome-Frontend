
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

        const logInParam = {
          userId: userId,
          passwordHashed: passwordHashed,
        }
        try{
            if(logInRestfulType === LogInRestfulType.POST ) {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL1 + "/login", {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'
                    },
                    body: JSON.stringify(logInParam)
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
  return { postData };

} 

export default useLogInData;