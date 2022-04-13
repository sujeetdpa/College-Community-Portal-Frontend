import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import './Post.css'

export default function Post({ postData }) {
  const [noOfLikes, setNoOfLikes] = useState(postData.noOfLikes);

  const handleLikePost = () => {
    const authHeader = "Bearer " + localStorage.getItem("access_token");
    const options = {
      method: 'POST',
      headers: {
        'Authorization': authHeader
      },
    }
    const response =fetch("http://localhost:8080/api/post/"+postData.id+"/like/"+postData.userId, options);
    response.then(res=>{
      res.json().then(data=>{
        alert(data.message);
        setNoOfLikes(data.noOfLikes);
        console.log(data);
      });
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
    const response =fetch("http://localhost:8080/api/post/"+postData.id+"/dislike/"+postData.userId, options);
    response.then(res=>{
      res.json().then(data=>{
        console.log(data);
        alert(data.message);
      });
    })
  }
  return (
    <div>
      <div className="container mt-5 mb-5">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="d-flex justify-content-between p-2 px-3">
                <div className="d-flex flex-row align-items-center"> <img src="https://i.imgur.com/UXdKE3o.jpg" width="50" className="rounded-circle" alt='dvvs' />
                  <div className="d-flex flex-column ml-2"> <span className="font-weight-bold">{postData.fullName}</span> <small className="text-primary">Collegues</small> </div>
                </div>
                <div className="d-flex flex-row mt-1 ellipsis"> <small className="mr-2">{postData.creationDate}</small> <i className="fa fa-ellipsis-h"></i> </div>
              </div>
              <div className="p-2">
                <h5>{postData.title}</h5>
                <p className="text-justify">{postData.description}</p>
              </div>
              {postData.imageIds.length > 0 ? <img src={"http://localhost:8080/api/post/local/storage/download/image/" + postData.imageIds[0]} className="img-fluid" alt='dsvv' /> : ""}
              {postData.imageIds.length > 1 ? <Link to={"/post/" + postData.id}><p>More...</p></Link> : ""}
              <div className="p-2">
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-row icons d-flex align-items-center">
                    <h4 className="bi bi-hand-thumbs-up px-2" onClick={handleLikePost}>{noOfLikes}</h4>
                    <h4 className="bi bi-hand-thumbs-down px-3" onClick={handleDislikePost}></h4>
                  </div>
                  <div className="d-flex flex-row muted-color"><Link to={"/post/" + postData.id}><h4 className="bi bi-chat-left-text px-3"> {postData.noOfComments}</h4></Link>
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
