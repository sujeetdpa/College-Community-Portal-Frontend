import React from 'react'
import { Link } from 'react-router-dom'
import './Comment.css'


export default function DeletedComment({ commentData }) {
  return (
    <>
      <div className="d-flex flex-column">
        <div className="d-flex flex-row justify-content-between">
          <div className='d-flex flex-row'>
            <img src={(commentData.profileImageId !== null && commentData.profileImageId !== undefined) ? process.env.REACT_APP_BASE_URL + "/api/post/local/storage/download/image/" + commentData.profileImageId : "https://robohash.org/" + commentData.userId} width="30" className="rounded-circle" alt='Profile' />
            <Link to={"/user/" + commentData.universityId + "/profile"} id="Link"><span className="name">{commentData.fullName}</span> </Link>
          </div>
          <small className="mr-2 px-2">{commentData.commentDate}</small>
        </div>
        <div className="ml-2">
          <small className="comment-text "> {commentData.description}</small>
        </div>
      </div>
      <hr className="my-2" />
    </>
  )
}
