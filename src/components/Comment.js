import React from 'react'
import './Comment.css'

export default function Comment({ commentData }) {
  return (
    <>
      <div className="d-flex flex-row mb-2"> <img src="https://i.imgur.com/9AZ2QX1.jpg" width="40" className="rounded-image" />
        <div className="d-flex flex-column ml-2"> <span className="name">{commentData.fullName}</span> <small className="comment-text">{commentData.description}</small>
          <div className="d-flex flex-row align-items-center status">
            <small>{commentData.commentDate}</small>
          </div>
        </div>
      </div>
    </>
  )
}
