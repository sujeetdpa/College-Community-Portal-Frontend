import React from 'react'
import { decodeToken, useJwt } from 'react-jwt';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminProtected(props) {
    let Cmp=props.Cmp;
    const { decodedToken, isExpired } = useJwt(localStorage.getItem("access_token"));
    const decodeData=decodeToken(localStorage.getItem("access_token"))
    const navigate=useNavigate();
    const [flag,setFlag]=useState(false);
    useEffect(()=>{
        if(localStorage.getItem("access_token")===null || localStorage.getItem("access_token")===undefined || localStorage.getItem("logged_in_user")===null){
            navigate("/login");
            alert("Please Login.")
        }
        if(isExpired){
          navigate("/login");
          alert("Token expired please login again");
          
        }
        if(!decodeData.Roles.includes("ROLE_ADMIN")){
            alert("You dont have the permission to access this page");
            navigate("/");
        }
        setFlag(true);
    },[])
  return (
    <div>
        {flag?<Cmp/>:null}
    </div>
  )
}
