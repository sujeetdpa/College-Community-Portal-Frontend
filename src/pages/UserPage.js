import React from 'react'
import {
  Route,
  Link,
  useParams,
  Routes,
  Router
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
            <a className="list-group-item list-group-item-action list-group-item-light p-3" href="/user/profile/hello/dashboard">Dashboard</a>
            <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#">Statistics</a>
            <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#">Profile</a>
            <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#">Images</a>
            <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#">Documents</a>
          </div>
        </div>
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <h1 className="mt-4">Simple Sidebar</h1>
          
          </div>
        </div>
      </div>
    </div>
  )
}
