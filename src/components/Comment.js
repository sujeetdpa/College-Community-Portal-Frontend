import React from 'react'
import { useState } from 'react';
import { decodeToken } from 'react-jwt';
import { Link } from 'react-router-dom';
import './Comment.css'

export default function Comment({ commentData,changePageNo }) {
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("logged_in_user")));
  const decodeData=decodeToken(localStorage.getItem("access_token"))
  const handleCommentDelete=()=>{
    const authHeader = "Bearer " + localStorage.getItem("access_token");
    const options = {
      method: 'DELETE',
      headers: {
        'Authorization': authHeader
      }
    }
    fetch("http://localhost:8080/api/post/comment/delete/" + commentData.id, options)
    .then(res=>{
      if(!res.ok){
        throw res.json();
      }
      res.json().then(data=>{
        console.log(data);
        alert(data.message);
        changePageNo();
      })
    }).catch(err=>{
      err.then(data=>{
        console.log(data);
        alert(data.message);
      })
    })
  }
  return (
    <>
      <div className="d-flex flex-row mb-2">
        <img src={(commentData.profileImageId !== null && commentData.profileImageId !== undefined) ? "http://localhost:8080/api/post/local/storage/download/image/" + commentData.profileImageId : "https://robohash.org/" + commentData.userId} width="40" className="rounded-circle" alt='Profile' />
        <div className="d-flex justify-content-between">
            <div className="d-flex flex-column ml-2">
           <Link to={"/user/"+commentData.universityId+"/profile"} id="Link"><span className="name">{commentData.fullName}</span> </Link>
           <small className="comment-text">{commentData.description}</small>
           </div>
          <div className="d-flex flex-row mt-1 ellipsis">
            <small className="mr-2 px-2 ">{commentData.commentDate}</small>
            <small>
              <a class="bi bi-list " href="#" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                {(loggedInUser.id===commentData.userId)|| decodeData.Roles.includes("ROLE_ADMIN")? <li><button class="dropdown-item" onClick={handleCommentDelete}>Delete</button></li>:null}
              </ul>
            </small>
          </div>
        </div>
      </div>
      <hr/>
    </>
  )
}
