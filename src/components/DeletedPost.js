import React from 'react'
import { Link } from 'react-router-dom'
import DocumentSmallCard from './DocumentSmallCard'
import './Post.css'

export default function DeletedPost({ postData }) {
  return (
    <div>
      <div className="container  mb-2">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-7">
            <div className="card">
              <div className="d-flex justify-content-between p-2 px-3">
                <div className="d-flex flex-row align-items-center">
                  <img src={(postData.profileImageId !== null && postData.profileImageId !== undefined) ? process.env.REACT_APP_BASE_URL + "/api/post/local/storage/download/image/" + postData.profileImageId : "https://robohash.org/" + postData.userId} width="50" className="rounded-circle" alt='Profile' />
                  <div className="d-flex flex-column ml-2"> <Link to={"/user/" + postData.universityId + "/profile"} id="Link"><span className="font-weight-bold">{postData.fullName}</span> </Link></div>
                </div>
                <div className="d-flex flex-row mt-1 ellipsis">
                  <small className="mr-2 px-2">{postData.creationDate}</small>
                </div>
              </div>
              <div className="p-2">
                <h5 id='title'>{postData.title}</h5>
                <small className="text-justify" dangerouslySetInnerHTML={{__html: postData.description}}></small>
              </div>
              {postData.imageResponses.map(image => <img src={process.env.REACT_APP_BASE_URL + "/api/post/local/storage/download/image/" + image.id} className="img-fluid" alt={image.imageName} key={image.id} />)}
              {postData.documentResponses.map(doc => <DocumentSmallCard document={doc} key={doc.id} />)}
              <div className="p-2">
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-row icons d-flex align-items-center">
                    <h5 className="bi bi-hand-thumbs-up px-2" >{postData.noOfLikes}</h5>
                    <h5 className="bi bi-hand-thumbs-down px-3"><p hidden></p></h5>
                  </div>
                  <div className="d-flex flex-row muted-color"><h5 className="bi bi-chat-left-text px-3"> {postData.noOfComments}</h5>
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
