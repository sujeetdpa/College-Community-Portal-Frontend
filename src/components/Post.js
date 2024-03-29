import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { decodeToken } from 'react-jwt';
import './Post.css'
import DocumentSmallCard from './DocumentSmallCard';

export default function Post({ postData, changePage }) {
  const [noOfLikes, setNoOfLikes] = useState(postData.noOfLikes);
  const token = decodeToken(localStorage.getItem("access_token"));
  const [loggedInUser, setLoggedInUser] = useState({});
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
    const response = fetch(process.env.REACT_APP_BASE_URL + "/api/post/" + postData.id + "/like", options);
    response.then(res => {
      if (!res.ok) {
        throw res.json();
      }
      res.json().then(data => {
        alert(data.message);
        setNoOfLikes(data.noOfLikes);
      });
    }).catch(err => {
      err.then(data => {
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
    const response = fetch(process.env.REACT_APP_BASE_URL + "/api/post/" + postData.id + "/dislike", options);
    response.then(res => {
      if (!res.ok) {
        throw res.json();
      }
      res.json().then(data => {
        alert(data.message);
      });
    }).catch(err => {
      err.then(data => {
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
          alert(data.message);
          changePage();
        })
      }).catch(err => {
        err.then(data => {
          alert(data.message);
        })
      })
  }
  
  return (
    <div>
      <div className="container  mb-2">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-7">
            <div className="card">
              <div className="d-flex justify-content-between p-2 px-3">
                <div className="d-flex flex-row align-items-center">
                  <img src={(postData.profileImageId !== null && postData.profileImageId !== undefined) ? process.env.REACT_APP_BASE_URL + "/api/post/local/storage/download/image/" + postData.profileImageId : "https://robohash.org/" + postData.userId} width="50" className="rounded-circle" alt='Profile' />
                  <div className="d-flex flex-column ml-2"> <Link to={"/user/" + postData.universityId + "/profile"} id="Link"><span className="font-weight-bold">{postData.fullName}</span></Link></div>
                </div>
                <div className="d-flex flex-row mt-1 ellipsis">
                  <small className="mr-2 px-2">{postData.creationDate}</small>
                  <small>
                    <i className="bi bi-list btn-outline-primary btn-sm" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    </i>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><Link className="dropdown-item" to={"/post/" + postData.id}>View</Link></li>
                      {(postData.userId === loggedInUser.id) || token.Roles.includes("ROLE_ADMIN") ? <li><button className="dropdown-item" onClick={handleDeletePost}>Delete</button></li> : null}
                    </ul>
                  </small>
                </div>
              </div>
              <div className="p-1">
                <Link to={"/post/" + postData.id} id="Link"><h5>{postData.title}</h5></Link>
                <small className="text-justify" dangerouslySetInnerHTML={{__html: postData.description}}></small>
              </div >
              {(postData.imageResponses.length > 0 )? <img src={process.env.REACT_APP_BASE_URL + "/api/post/local/storage/download/image/" + postData.imageResponses[0].id} className="img-fluid" alt='dsvv' /> :
               (postData.documentResponses.length > 0 )? <DocumentSmallCard document={postData.documentResponses[0]} key={postData.documentResponses[0].id} />:""}
              {(postData.imageResponses.length < 1 && postData.documentResponses.length < 1 )? "" : <Link to={"/post/" + postData.id}><p>More...</p></Link>  }
          
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
