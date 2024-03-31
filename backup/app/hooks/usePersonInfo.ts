export enum RegisterPersonType {
    POST = "POST",
    PUT = "PUT",
    GET = "GET",
    DELETE = "DELETE",
}
type RegisterPersonProps = {
    person: Person;
}
export type Person = {
  userId: string,
  name: string,
  email: string,
  logInPasswordHashed: string,
}

const useRegisterPersonData  = () => {
    
    const fetchData = ( registerPersonType : RegisterPersonType ) => 
    async({person} : RegisterPersonProps)=>{

        try{
            if(registerPersonType === RegisterPersonType.POST ) {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL1 + "/PersonInfo", {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'
                    },
                    body: JSON.stringify(person)
                  })
                  .then((response) => response.json())
             
                  if (response === true){
                    console.log("Front End successfully Post Person");
                  }else{
                    console.log("response",response);
                    console.log(typeof response)
                    console.log("Returned false");
                  }
                  
              }
        }catch (error) {
          console.error('Error:', error);
        }
    }


  const postData = fetchData(RegisterPersonType.POST);
  return { postData };

} 

export default useRegisterPersonData;