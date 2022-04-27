import React, { useEffect, useState } from 'react'
import DashboardCard from '../components/DashboardCard'
import Navbar from '../components/Navbar'

export default function AdminDashboardPage() {
  const [dashboardData,setDashboardData] =useState({});
  useEffect(()=>{
    const authHeader = "Bearer " + localStorage.getItem("access_token");
    const options = {
      method: 'GET',
      headers: {
        'Authorization': authHeader
      },
    }
    fetch("http://localhost:8080/api/admin/dashboard", options)
    .then(res=>{
      if(!res.ok){
        throw res.json();
      }
      res.json().then(data=>{
        console.log(data);
        setDashboardData(data);
      })
    }).catch(err=>{
      err.then(data=>{
        console.log(data);
        alert(data.message);
      })
    })
  })
  return (
    <div>
      <Navbar/>
      <div  className='container'>
          <div className="container-fluid">
            <h1 className="mt-4">Dashboard.</h1>
            <div className='d-flex'>
              <DashboardCard header={"Total Posts "} data={dashboardData.numberOfPosts}/>
              <DashboardCard header={"Total Deleted Posts "} data={dashboardData.numberOfDeletedPost}/>
              <DashboardCard header={"Total Images "} data={dashboardData.numberOfImages}/>
              <DashboardCard header={"Total Documents "} data={dashboardData.numberOfDocuments}/>
              <DashboardCard header={"Total Likes"} data={dashboardData.numberOfLikes}/>
              <DashboardCard header={"Total Users "} data={dashboardData.numberOfUsers}/>
              <DashboardCard header={"Total Admins "} data={dashboardData.numberOfAdmins}/>
              <DashboardCard header={"Total Dislikes"} data={dashboardData.numberOfDislikes}/>
              <DashboardCard header={"Total Comments"} data={dashboardData.numberOfComments}/>
              <DashboardCard header={"Total Deleted Comments"} data={dashboardData.numberOfDeletedComment}/>
              </div>
          </div>
        </div>
    </div>
  )
}

