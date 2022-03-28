
const baseUrl="http://localhost:8080";
function login(username,password){
    let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: {
            "username" : username,
            "password" : password
        }
      }
      let response=fetch(baseUrl+"/login",options);
      response.then((res)=>{
        res.json()
      }).then(data=>{
          console.log(data);
      })
    
}
export default function UserApis(){
    return(<></>)
}