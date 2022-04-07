import React from 'react'
import {useEffect} from 'react'
import { Navigate } from 'react-router-dom';

export default function Protected(props) {
    let Cmp=props.Cmp;
    useEffect(()=>{
        if(!localStorage.getItem("access_token")){
            <Navigate to="/login"/>
        }
    },[])
  return (
    <div>
        <Cmp/>
    </div>
  )
}
