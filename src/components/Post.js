import React from 'react'
import './Post.css'

export default function Post({postData}) {
  const getImage=(imageId)=>{
    async function fetchImage(){
      const authHeader="Bearer "+localStorage.getItem("access_token");
      const options={
        method: 'GET',
        headers:{
            'Authorization': authHeader
        }
      }
      const response=await fetch("http://localhost:8080/api/post/local/storage/download/image/"+imageId,options);
      const blo= await response.blob();
      reader.readAsDataURL(blo);
    }
    const reader=new FileReader();
    let image;
    reader.onloadend = () => {
      const base64data = reader.result; 
      image=base64data;               
      console.log(base64data);
    }
    return image;
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
              {postData.imageIds.length>0 ? <img src={getImage(postData.imageIds[0])} className="img-fluid" alt='dsvv'/>:""}
              <div className="p-2">
                <hr/>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-row icons d-flex align-items-center">
                      <i className="fa-regular fa-thumbs-up"> </i> {postData.noOfLikes}
                      <i className="fa-regular fa-thumbs-down"></i> 
                      </div>
                    <div className="d-flex flex-row muted-color"> <span>{postData.noOfComments} Comments</span>
                  </div>
                <hr/>
                <div className="comments">
                  <div className="d-flex flex-row mb-2"> <img src="https://i.imgur.com/9AZ2QX1.jpg" width="40" className="rounded-image" alt='dv' />
                    <div className="d-flex flex-column ml-2"> <span className="name">Daniel Frozer</span> <small className="comment-text">I like this alot! thanks alot</small>
                      <div className="d-flex flex-row align-items-center status"> <small>Like</small> <small>Reply</small> <small>Translate</small> <small>18 mins</small> </div>
                    </div>
                  </div>
                  <div className="d-flex flex-row mb-2"> <img src="https://i.imgur.com/1YrCKa1.jpg" width="40" className="rounded-image" alt='ds' />
                    <div className="d-flex flex-column ml-2"> <span className="name">Elizabeth goodmen</span> <small className="comment-text">Thanks for sharing!</small>
                      <div className="d-flex flex-row align-items-center status"> <small>Like</small> <small>Reply</small> <small>Translate</small> <small>8 mins</small> </div>
                    </div>
                  </div>
                  <div className="comment-input"> <input type="text" className="form-control" />
                    <div className="fonts"> <i className="fa fa-camera"></i> </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
