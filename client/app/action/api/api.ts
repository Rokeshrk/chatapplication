
//  export const Registration = async (registrationData:object) => {
//   try {
//     console.log(registrationData);
    
//     const response = await fetch('/signup', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(registrationData),
//     });

//     if (response) {
//       const data = await response.json();
//       alert(data.message); 
//     } else {
//       const errorData = await response.json();
//       alert(errorData.message); 
//     }
//   } catch (error) {
//     console.error(error);
//     alert('Registration failed');
//   }
// };

import {initClient} from "@ts-rest/core";
import { contract} from "../../contract";

const client = initClient(contract,{
    baseUrl: "http://localhost:3001",
    baseHeaders:{},
});

async function Registration(registrationData){
    await client.signup({
        
    })
}