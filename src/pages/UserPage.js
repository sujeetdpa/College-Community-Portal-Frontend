import React from 'react'
import {
  Link,
  useParams,
} from "react-router-dom";
import Navbar from '../components/Navbar';
import './UserPage.css';
import DashboardPage from './DashboardPage'
import StatisticsPage from './StatisticsPage'
import ProfilePage from './ProfilePage'
import ImagePage from './ImagePage'
import DocumentPage from './DocumentPage'


export default function UserPage() {

  const params = useParams();
  return (
    <div>
      <Navbar />
      <div className="d-flex container pt-2" id="wrapper">
        <div className="border-end bg-white" id="sidebar-wrapper">
          <div className="list-group list-group-flush">
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/"+params.universityId+"/myPosts"}>My Posts</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/"+params.universityId+"/dashboard"}>Dashboard</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/"+params.universityId+"/statistics"}>Statistics</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/"+params.universityId+"/profile"}>Profile</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/"+params.universityId+"/images"}>Images</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/"+params.universityId+"/documents"}>Documents</Link>
          </div>
        </div>
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <h1 className="mt-4">Simple Sidebar</h1>
            <div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
