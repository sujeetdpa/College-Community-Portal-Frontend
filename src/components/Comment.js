import React from 'react'
import { useState } from 'react';
import { decodeToken } from 'react-jwt';
import { Link } from 'react-router-dom';
import './Comment.css'

export default function Comment({ commentData, changePageNo }) {
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("logged_in_user")));
  const decodeData = decodeToken(localStorage.getItem("access_token"))
  const handleCommentDelete = () => {
    const authHeader = "Bearer " + localStorage.getItem("access_token");
    const options = {
      method: 'DELETE',
      headers: {
        'Authorization': authHeader
      }
    }
    fetch(process.env.REACT_APP_BASE_URL + "/api/post/comment/delete/" + commentData.id, options)
      .then(res => {
        if (!res.ok) {
          throw res.json();
        }
        res.json().then(data => {
          alert(data.message);
          changePageNo();
        })
      }).catch(err => {
        err.then(data => {
          alert(data.message);
        })
      })
  }
  return (
    <>
      <div className="d-flex flex-column">
        <div className="d-flex flex-row justify-content-between">
          <div className='d-flex flex-row'>
            <img src={(commentData.profileImageId !== null && commentData.profileImageId !== undefined) ? process.env.REACT_APP_BASE_URL + "/api/post/local/storage/download/image/" + commentData.profileImageId : "https://robohash.org/" + commentData.userId} width="30" className="rounded-circle" alt='Profile' />
            <Link to={"/user/" + commentData.universityId + "/profile"} id="Link"><span >{commentData.fullName}</span> </Link>
          </div>
          <div className='d-flex flex-row '>
            <small className="mr-2 px-2">{commentData.commentDate}</small>
            <small>
              <i className="bi bi-list btn-outline-primary btn-sm " id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              </i>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {(loggedInUser.id === commentData.userId) || decodeData.Roles.includes("ROLE_ADMIN") ? <li><button className="dropdown-item" onClick={handleCommentDelete}>Delete</button></li> : null}
              </ul>
            </small>
          </div>
        </div>
        <div className="">
          <small className="comment-text">{commentData.description}</small>
        </div>
      </div>
      <hr className="my-2" />
    </>
  )
}
