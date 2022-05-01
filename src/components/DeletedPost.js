import React from 'react'
import { Link } from 'react-router-dom'
import DocumentSmallCard from './DocumentSmallCard'
import './Post.css'

export default function DeletedPost({ postData }) {
  const fetchDoc = (docId) => {
    const options = {
      method: 'GET'
    }
    fetch(process.env.REACT_APP_BASE_URL + "/api/post/local/storage/download/document/" + docId, options)
      .then(res => {
        res.blob().then(data => {
          const file = new File([data], "test1", { type: data.type });
          console.log(file);
          const fileUrl = URL.createObjectURL(file);
          window.open(fileUrl, "_blank");

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
                  <div className="d-flex flex-column ml-2"> <Link to={"/user/" + postData.universityId + "/profile"} id="Link"><span className="font-weight-bold">{postData.fullName}</span> </Link><small className="text-primary">Collegues</small> </div>
                </div>
                <div className="d-flex flex-row mt-1 ellipsis">
                  <small className="mr-2 px-2">{postData.creationDate}</small>
                </div>
              </div>
              <div className="p-2">
                <h5 id='title'>{postData.title}</h5>
                <p className="text-justify">{postData.description}</p>
              </div>
              {postData.imageIds.map(id => <img src={process.env.REACT_APP_BASE_URL + "/api/post/local/storage/download/image/" + id} className="img-fluid" alt='Data' key={id} />)}
              {(postData.documentResponses !==undefined)? postData.documentResponses.map(doc=><div onClick={() => fetchDoc(doc.id)} role="button" className='mb-2'><DocumentSmallCard fileName={doc.fileName} key={doc.id} /></div>):null}
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
