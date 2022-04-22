import React from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import { useEffect,useState } from 'react';
import Navbar from '../components/Navbar'
import UserSidebar from '../components/UserSidebar';
import DashboardCard from '../components/DashboardCard'

export default function DashboardPage() {
  const params = useParams();
  const [dashboardData,setDashboardData] =useState({});
  const navigate=useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("logged_in_user")));

  useEffect(()=>{
    if(loggedInUser.universityId!==params.universityId){
      alert("You dont't have the required permissions");
      navigate("/user/"+params.universityId+"/profile");
  }
    const authHeader = "Bearer " + localStorage.getItem("access_token");
    const options = {
      method: 'GET',
      headers: {
        'Authorization': authHeader
      },
    }
    fetch("http://localhost:8080/api/user/data/dashboard", options)
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
  },[])
  return (
    <div>
    <Navbar />
      <div className="d-flex container pt-2" id="wrapper">
      <UserSidebar universityId={params.universityId}/>
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <h1 className="mt-4">Dashboard.</h1>
              <DashboardCard header={"Total Posts "} data={dashboardData.numberOfPosts}/>
              <DashboardCard header={"Total Images "} data={dashboardData.numberOfImages}/>
              <DashboardCard header={"Total Documents "} data={dashboardData.numberOfDocuments}/>
              <DashboardCard header={"Likes Made"} data={dashboardData.numberOfLikesMade}/>
              <DashboardCard header={"Likes Achieved "} data={dashboardData.numberOfLikesAchieved}/>
              <DashboardCard header={"Dislikes Made "} data={dashboardData.numberOfDislikedMade}/>
              <DashboardCard header={"Dislikes Achieved"} data={dashboardData.numberOfDislikesAchieved}/>
              <DashboardCard header={"Comments Made"} data={dashboardData.numberOfCommentsMade}/>
              <DashboardCard header={"Comments Achieved"} data={dashboardData.numberOfCommentsAchieved}/>
          </div>
        </div>
      </div>
    </div>
  )
}
