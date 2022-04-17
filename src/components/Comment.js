import React from 'react'
import './Comment.css'

export default function Comment({ commentData }) {
  return (
    <>
      <div className="d-flex flex-row mb-2"> 
      <img src={(commentData.profileImageId!==null && commentData.profileImageId!== undefined) ? "http://localhost:8080/api/post/local/storage/download/image/" + commentData.profileImageId : "https://robohash.org/"+commentData.userId} width="50" className="rounded-circle" alt='Profile' />
        <div className="d-flex flex-column ml-2"> <span className="name">{commentData.fullName}</span> <small className="comment-text">{commentData.description}</small>
          <div className="d-flex flex-row align-items-center status">
            <small>{commentData.commentDate}</small>
          </div>
        </div>
      </div>
    </>
  )
}
