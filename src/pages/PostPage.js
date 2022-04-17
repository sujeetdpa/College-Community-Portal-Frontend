import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';
import Comment from '../components/Comment';
import './PostPage.css'

export default function PostPage() {
  let params = useParams();
  const [post, setPost] = useState({ imageIds: [], documentIds: [] });
  const [noOfLikes, setNoOfLikes] = useState(post.noOfLikes);
  const [noOfComments, setNoOfComments] = useState(post.noOfComments);
  const [comments, setComments] = useState([]);
  const [commentPageNo, setCommentPageNo] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const newCommentData = {
    title: '',
    description: '',
    postId: post.id,
    userId: ''
  }

  //API call to fetch post data
  useEffect(() => {
    console.log("POST id:" + params.postId);
    const authHeader = "Bearer " + localStorage.getItem("access_token");
    const options = {
      method: 'GET',
      headers: {
        'Authorization': authHeader
      }
    }
    fetch("http://localhost:8080/api/post/" + params.postId, options)
      .then(res => {
        if (!res.ok) {
          throw res.json();
        }
        res.json().then(data => {
          console.log(data);
          setNoOfLikes(data.noOfLikes);
          setNoOfComments(data.noOfComments);
          setPost(data);
        })
      }).catch(err => {
        err.then(data => {
          console.log(data);
          alert(data.message);
        })
      })
  }, [])
  //API call to fetch comments
  useEffect(() => {
    const authHeader = "Bearer " + localStorage.getItem("access_token");
    const commentRequest = {
      postId: post.id,
      pageNo: commentPageNo,
      maxItem: '4'
    }
    const options = {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentRequest)
    }
    fetch("http://localhost:8080/api/post/" + params.postId + "/comments", options)
      .then(res => {
        res.json().then(data => {
          console.log(data);
          setTotalPages(data.totalPages)
          setComments(data.commentResponseViews);
        })
      })
  }, [commentPageNo])

  const handleLikePost = () => {
    const authHeader = "Bearer " + localStorage.getItem("access_token");
    const options = {
      method: 'POST',
      headers: {
        'Authorization': authHeader
      },
    }
    const response = fetch("http://localhost:8080/api/post/" + post.id + "/like/" + post.userId, options);
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
    const response = fetch("http://localhost:8080/api/post/" + post.id + "/dislike/" + post.userId, options);
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
  const handleCreateComment = () => {
    const authHeader = "Bearer " + localStorage.getItem("access_token");
    const options = {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCommentData)
    }
    const response = fetch("http://localhost:8080/api/post/comment/new", options);
    response.then(res => {
      if (!res.ok) {
        throw res.json();
      }
      res.json().then(data => {
        console.log(data);
        document.getElementById("commentInput").value = '';
      })
    }).catch(err => {
      err.then(data => {
        console.log(data);
        alert(data.message);
      })
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
                  <div className="d-flex flex-column ml-2"> <span className="font-weight-bold">{post.fullName}</span> <small className="text-primary">Collegues</small> </div>
                </div>
                <div className="d-flex flex-row mt-1 ellipsis"> <small className="mr-2">{post.creationDate}</small> <i className="fa fa-ellipsis-h"></i> </div>
              </div>
              <div className="p-2">
                <h5>{post.title}</h5>
                <p className="text-justify">{post.description}</p>
              </div>
              {post.imageIds.length > 0 ? <img src={"http://localhost:8080/api/post/local/storage/download/image/" + post.imageIds[0]} className="img-fluid" alt='dsvv' /> : ""}
              <div className="p-2">
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-row icons d-flex align-items-center">
                    <h5 className="bi bi-hand-thumbs-up px-2" onClick={handleLikePost}>{noOfLikes}</h5>
                    <h5 className="bi bi-hand-thumbs-down px-3" onClick={handleDislikePost}></h5>
                  </div>
                  <div className="d-flex flex-row ">
                    <h5 className="bi bi-chat-left-text px-3"> {noOfComments}</h5>
                  </div>
                  <hr />
                </div>
              </div>
              <div className="comments">
                <div className="comment-input pb-3">
                  <form>
                    <input type="text" className="form-control" id='commentInput' required placeholder='Write comment here.' onChange={e => { newCommentData.description = e.target.value }} />
                    <div className="fonts">
                      <button className='btn-outline-primary rounded-circle' >
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-sendbtn " viewBox="0 0 16 16" onSubmit={handleCreateComment}>
                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                      </svg>
                      </button>
                    </div>
                  </form>
                </div>
                <div>
                  <InfiniteScroll
                    dataLength={comments.length} //This is important field to render the next data
                    next={() => setCommentPageNo(commentPageNo + 1)}
                    hasMore={(comments.length !==0) && (totalPages-1)!==commentPageNo}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                      <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                      </p>
                    }
                  >
                    {comments.map(comment => <Comment commentData={comment} key={comment.id} />)}
                  </InfiniteScroll>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
