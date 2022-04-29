import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { decodeToken } from 'react-jwt';
import './Post.css'

export default function Post({ postData, changePage }) {
  const [noOfLikes, setNoOfLikes] = useState(postData.noOfLikes);
  const decodeData = decodeToken(localStorage.getItem("access_token"))
  const [loggedInUser, setLoggedInUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(JSON.parse(localStorage.getItem("logged_in_user")));
  }, [])
  const handleLikePost = () => {
    const authHeader = "Bearer " + localStorage.getItem("access_token");
    const options = {
      method: 'POST',
      headers: {
        'Authorization': authHeader
      },
    }
    const response = fetch(process.env.REACT_APP_BASE_URL + "/api/post/" + postData.id + "/like/" + postData.userId, options);
    response.then(res => {
      if (!res.ok) {
        throw res.json();
      }
      res.json().then(data => {
        alert(data.message);
        setNoOfLikes(data.noOfLikes);
        console.log(data);
      });
    }).catch(err => {
      err.then(data => {
        console.log(data);
        alert(data.message);
      })
    })
  }
  const handleDislikePost = () => {
    const authHeader = "Bearer " + localStorage.getItem("access_token");
    const options = {
      method: 'POST',
      headers: {
        'Authorization': authHeader
      },
    }
    const response = fetch(process.env.REACT_APP_BASE_URL + "/api/post/" + postData.id + "/dislike/" + postData.userId, options);
    response.then(res => {
      if (!res.ok) {
        throw res.json();
      }
      res.json().then(data => {
        console.log(data);
        alert(data.message);
      });
    }).catch(err => {
      err.then(data => {
        console.log(data);
        alert(data.message);
      })
    })
  }
  const handleDeletePost = () => {
    const authHeader = "Bearer " + localStorage.getItem("access_token");
    const options = {
      method: 'DELETE',
      headers: {
        'Authorization': authHeader
      }
    }
    fetch(process.env.REACT_APP_BASE_URL + "/api/post/delete/" + postData.id, options)
      .then(res => {
        if (!res.ok) {
          throw res.json();
        }
        res.json().then(data => {
          console.log(data);
          alert(data.message);
          changePage();
        })
      }).catch(err => {
        err.then(data => {
          console.log();
          alert(data.message);
        })
      })
  }
  return (
    <div>
      <div className="container  mb-2">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="d-flex justify-content-between p-2 px-3">
                <div className="d-flex flex-row align-items-center">
                  <img src={(postData.profileImageId !== null && postData.profileImageId !== undefined) ? process.env.REACT_APP_BASE_URL + "/api/post/local/storage/download/image/" + postData.profileImageId : "https://robohash.org/" + postData.userId} width="50" className="rounded-circle" alt='Profile' />
                  <div className="d-flex flex-column ml-2"> <Link to={"/user/" + postData.universityId + "/profile"} id="Link"><span className="font-weight-bold">{postData.fullName}</span></Link> <small className="text-primary">Collegues</small> </div>
                </div>
                <div className="d-flex flex-row mt-1 ellipsis">
                  <small className="mr-2 px-2">{postData.creationDate}</small>
                  <small>
                    <a className="bi bi-list " href="#" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><Link className="dropdown-item" to={"/post/" + postData.id}>View</Link></li>
                      {(postData.userId === loggedInUser.id) || decodeData.Roles.includes("ROLE_ADMIN") ? <li><button className="dropdown-item" onClick={handleDeletePost}>Delete</button></li> : null}
                    </ul>
                  </small>
                </div>
              </div>
              <div className="p-2">
                <Link to={"/post/" + postData.id} id="Link"><h5>{postData.title}</h5></Link>
                <p className="text-justify">{postData.description}</p>
              </div>
              {postData.imageIds.length > 0 ? <img src={process.env.REACT_APP_BASE_URL + "/api/post/local/storage/download/image/" + postData.imageIds[0]} className="img-fluid" alt='dsvv' /> : ""}
              {postData.imageIds.length > 1 ? <Link to={"/post/" + postData.id}><p>More...</p></Link> : ""}
              <div className="p-2">
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-row icons d-flex align-items-center">
                    <h5 className="bi bi-hand-thumbs-up px-2" onClick={handleLikePost}>{noOfLikes}</h5>
                    <h5 className="bi bi-hand-thumbs-down px-3" onClick={handleDislikePost}><p hidden></p></h5>
                  </div>
                  <div className="d-flex flex-row muted-color"><Link to={"/post/" + postData.id}><h5 className="bi bi-chat-left-text px-3"> {postData.noOfComments}</h5></Link>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
