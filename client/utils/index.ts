import { user } from "@nextui-org/react";
import { LoginProps, FilterProps } from "../types/index";

// export async function fetchCars(filters: FilterProps){
//   const {manufacturer, year, model, limit, fuel} = filters;
//     const headers = {
//             'X-RapidAPI-Key': 'KJwZZIJSFimshuivMSVGaiYzkRomp15f2vKjsnK4bKzuUzVLzA',
//             'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
//     }

//     const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel=${fuel}`,{
//     headers:headers,
//     });

//     const result = await response.json();

//     return result;
// }



  export const generateCarImageUrl = (car: LoginProps, angle? : string) => {
    const url = new URL('https://cdn.imagin.studio/getimage');

    const {username, email, password} = car;

    url.searchParams.append('customer','hrjavascript-mastery');

    url.searchParams.append('make',username);
    url.searchParams.append('make',email);
    url.searchParams.append('make',password);

    // url.searchParams.append('modelFamily', model.split(' ')[0]);
    // url.searchParams.append('zoomType', 'fullscreen');
    // url.searchParams.append('modelYear', `${year}`);
    // url.searchParams.append('angle', `${angle}`);
    
    return `${url}`;
  }

 export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(type, value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};