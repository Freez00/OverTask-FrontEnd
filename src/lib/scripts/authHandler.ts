import { backendURL } from "./variables";

export interface AuthResource{
    Email:string,
    Password:string,
    UserName: string,
}


export async function Login(model:AuthResource){

    const response = await fetch(`${backendURL}/authenticate/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(model)
      });
      
    return response;
}

export async function Register(model:AuthResource){
  const response = await fetch(`${backendURL}/authenticate/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(model)
  })
  return response;
}