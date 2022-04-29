import React from 'react'
import { Link } from 'react-router-dom'
import './Comment.css'


export default function DeletedComment({ commentData }) {
  return (
    <>
      <div className="d-flex flex-row mb-2">
        <img src={(commentData.profileImageId !== null && commentData.profileImageId !== undefined) ? process.env.REACT_APP_BASE_URL + "/api/post/local/storage/download/image/" + commentData.profileImageId : "https://robohash.org/" + commentData.userId} width="40" className="rounded-circle" alt='Profile' />
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column ml-2">
            <Link to={"/user/" + commentData.universityId + "/profile"} id="Link"><span className="name">{commentData.fullName}</span> </Link>
            <small className="comment-text">{commentData.description}</small>
          </div>
          <div className="d-flex flex-row mt-1 ellipsis">
            <small className="mr-2 px-2 ">{commentData.commentDate}</small>
          </div>
        </div>
      </div>
      <hr />
    </>
  )
}
