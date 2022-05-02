import React from 'react'
import {useEffect,useState} from 'react'
import {useNavigate} from "react-router-dom"
import { useJwt,decodeToken,isExpired} from "react-jwt";

export default function Protected(props) {
    let Cmp=props.Cmp;
    const decodeData=decodeToken(localStorage.getItem("access_token"))
    const isTokenExpired=isExpired(localStorage.getItem("access_token"));
    const navigate=useNavigate();
    const [flag,setFlag]=useState(false);
    useEffect(()=>{
      console.log("Deoded token: ",decodeData)
      console.log("IsExpired ",isTokenExpired);
        if(localStorage.getItem("access_token")===null || localStorage.getItem("access_token")===undefined || localStorage.getItem("logged_in_user")===null){
            navigate("/login");
            alert("Please Login.")
        }
        else if(isTokenExpired){
          localStorage.clear();
          navigate("/login");
          alert("Token expired please login again.");
        }
        setFlag(true);
    },[])
  return (
    <div>
        {flag?<Cmp/>:null}
    </div>
  )
}
