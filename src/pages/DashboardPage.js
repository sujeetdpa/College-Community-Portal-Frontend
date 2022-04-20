import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEffect,useState } from 'react';
import Navbar from '../components/Navbar'
import UserSidebar from '../components/UserSidebar';

export default function DashboardPage() {
  const params = useParams();
  const [dashboardData,setDashboardData] =useState();
  useEffect(()=>{
      
  },[])
  return (
    <div>
    <Navbar />
      <div className="d-flex container pt-2" id="wrapper">
      <UserSidebar universityId={params.universityId}/>
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <h1 className="mt-4">Dashboard.</h1>

          </div>
        </div>
      </div>
    </div>
  )
}
