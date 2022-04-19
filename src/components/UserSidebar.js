import React from 'react'
import { Link } from 'react-router-dom'

export default function UserSidebar({universityId}) {
  return (
    <div>
        <div className="border-end bg-white" id="sidebar-wrapper">
          <div className="list-group list-group-flush">
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/" + universityId + "/profile"}>Profile</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/" + universityId + "/myPosts"}>My Posts</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/" + universityId + "/dashboard"}>Dashboard</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/" + universityId + "/statistics"}>Statistics</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/" + universityId + "/images"}>Images</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/" + universityId + "/documents"}>Documents</Link>
          </div>
        </div>
    </div>
  )
}
