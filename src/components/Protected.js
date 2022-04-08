import React from 'react'
import {useEffect} from 'react'
import {useNavigate} from "react-router-dom"

export default function Protected(props) {
    let Cmp=props.Cmp;
    const navigate=useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("access_token")===null || localStorage.getItem("access_token")===undefined){
            navigate("/login");
        }
    },[])
  return (
    <div>
        <Cmp/>
    </div>
  )
}
