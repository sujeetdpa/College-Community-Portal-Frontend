
const baseUrl="http://localhost:8080";

export function login(username,password){
    let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "username" : username,
          "password" : password
      })
      }
      let response=fetch(baseUrl+"/auth/login",options);
      response.then((res)=>{
        res.json().then(data=>{
          console.log(data);
          localStorage.setItem("access_token",data.access_token);
          localStorage.setItem("refresh_token",data.refresh_token);
        })
      })
    
}
export function register(registerRequest){
  const data={
    firstName:registerRequest.firstName,
    lastName:registerRequest.lastName,
    username:registerRequest.username,
    password:registerRequest.password,
    gender:registerRequest.gender,
    dob:registerRequest.dob,
    mobileNo:registerRequest.mobileNo
  }
  console.log(data);
  let options={
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(data)
  }
  console.log(options);
  const response=fetch(baseUrl+"/auth/signup",options);
  response.then(res=>{
    res.json().then(responseData=>{
      console.log(responseData);  //write code here
      return responseData;
    })
  }).catch(err=>{
    console.log(err);
  })
}

export default {login,register}