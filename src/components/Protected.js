import React from 'react'
import {useEffect,useState} from 'react'
import {useNavigate} from "react-router-dom"
import { useJwt,decodeToken} from "react-jwt";

export default function Protected(props) {
    let Cmp=props.Cmp;
    const { decodedToken, isExpired } = useJwt(localStorage.getItem("access_token"));
    const decodeData=decodeToken(localStorage.getItem("access_token"))
    const navigate=useNavigate();
    const [flag,setFlag]=useState(false);
    useEffect(()=>{
      console.log("Deoded token: ",decodeData)
      console.log("IsExpired ",isExpired);
        if(localStorage.getItem("access_token")===null || localStorage.getItem("access_token")===undefined || localStorage.getItem("logged_in_user")===null){
            navigate("/login");
            alert("Please Login.")
        }
        if(isExpired){
          navigate("/login");
          alert("Token expired please login again");
        }
        setFlag(true);
    },[])
  return (
    <div>
        {flag?<Cmp/>:null}
    </div>
  )
}
