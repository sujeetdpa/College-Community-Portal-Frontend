import React from 'react'
import { Link } from 'react-router-dom'

import './UserSidebar.css'

export default function UserSidebar({ universityId }) {
  return (
    <div>
      <div className="border-end bg-white" id="sidebar-wrapper">
        <div className="list-group list-group-flush">
          <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/" + universityId + "/profile"}><h5 className="bi bi-person "> Profile</h5> </Link>
          <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/" + universityId + "/myPosts"}><h5 className="bi bi-file-post"> My Posts</h5> </Link>
          <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/" + universityId + "/dashboard"}><h5 className="bi bi-speedometer "> Dashboard</h5> </Link>
          <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/" + universityId + "/changePassword"}><h5 className="bi bi-lock "> Change Password</h5> </Link>
          <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/" + universityId + "/images"}><h5 className="bi bi-image "> Images</h5> </Link>
          <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/" + universityId + "/documents"}><h5 className="bi bi-file-earmark"> Documents</h5> </Link>
        </div>
      </div>
    </div>
  )
}
