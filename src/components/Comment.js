import React from 'react'
import './Comment.css'

export default function Comment({ commentData }) {
  return (
    <>
      <div className="d-flex flex-row mb-2">
        <img src={(commentData.profileImageId !== null && commentData.profileImageId !== undefined) ? "http://localhost:8080/api/post/local/storage/download/image/" + commentData.profileImageId : "https://robohash.org/" + commentData.userId} width="40" className="rounded-circle" alt='Profile' />
        <div className="d-flex justify-content-between">
            <div className="d-flex flex-column ml-2">
           <span className="name">{commentData.fullName}</span> 
           <small className="comment-text">{commentData.description}</small>
           </div>
          <div className="d-flex flex-row mt-1 ellipsis">
            <small className="mr-2 px-2 ">{commentData.commentDate}</small>
            <small>
              <a class="bi bi-list " href="#" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Delete</a></li>
              </ul>
            </small>
          </div>
        </div>
      </div>
      <hr/>
    </>
  )
}
