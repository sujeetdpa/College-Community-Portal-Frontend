import React from 'react'
import {useEffect} from 'react'
import {useNavigate} from "react-router-dom"

export default function Protected(props) {
    let Cmp=props.Cmp;
    const navigate=useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("access_token")===null || localStorage.getItem("access_token")===undefined || localStorage.getItem("logged_in_user")===null){
            navigate("/login");
            alert("Please Login.")
        }
    },[])
  return (
    <div>
        <Cmp/>
    </div>
  )
}
