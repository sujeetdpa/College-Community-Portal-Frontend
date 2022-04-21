import React, { useEffect, useState } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';
import Comment from '../components/Comment';
import './PostPage.css'
import Navbar from '../components/Navbar';

export default function PostPage() {
  let params = useParams();
  const navigate=useNavigate();
  const [loggedInUser, setLoggedInUser] = useState({});
  const [post, setPost] = useState({ imageIds: [], documentIds: [] });
  const [noOfLikes, setNoOfLikes] = useState(post.noOfLikes);
  const [noOfComments, setNoOfComments] = useState(post.noOfComments);
  const [comments, setComments] = useState([]);
  const [commentPageNo, setCommentPageNo] = useState({
    pageNo: 0
  });
  const [totalPages, setTotalPages] = useState(0);

  const [createCommentData, setCreateCommentData] = useState({
    title: '',
    description: '',
    postId: post.id,
    userId: ''
  });

  //API call to fetch post data
  useEffect(() => {
    setLoggedInUser(JSON.parse(localStorage.getItem("logged_in_user")));
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
          createCommentData.postId = data.id;
          setPost(data);
        })
      }).catch(err => {
        err.then(data => {
          console.log(data);
          alert(data.message);
        })
      })
  }, [params.postId])
  //API call to fetch comments
  useEffect(() => {
    const authHeader = "Bearer " + localStorage.getItem("access_token");
    const commentRequest = {
      postId: post.id,
      pageNo: commentPageNo.pageNo,
      maxItem: '5'
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
          setComments([...comments, ...data.commentResponseViews]);
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
  const handleCreateComment = (e) => {
    e.preventDefault();
    const authHeader = "Bearer " + localStorage.getItem("access_token");
    const options = {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createCommentData)
    }
    const response = fetch("http://localhost:8080/api/post/comment/new", options);
    response.then(res => {
      if (!res.ok) {
        throw res.json();
      }
      res.json().then(data => {
        console.log(data);
        setNoOfComments(noOfComments + 1);
        document.getElementById("commentInput").value = '';
        setComments([]);
        setCommentPageNo({ pageNo: 0 });
        setTotalPages(0);
      })
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
    fetch("http://localhost:8080/api/post/delete/" + post.id, options)
      .then(res => {
        if (!res.ok) {
          throw res.json();
        }
        res.json().then(data => {
          console.log(data);
          alert(data.message);
          navigate("/feeds");
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
      <Navbar />
      <div className="container mt-5 mb-5">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="d-flex justify-content-between p-2 px-3">
                <div className="d-flex flex-row align-items-center">
                  <img src={(post.profileImageId !== null && post.profileImageId !== undefined) ? "http://localhost:8080/api/post/local/storage/download/image/" + post.profileImageId : "https://robohash.org/" + post.userId} width="50" className="rounded-circle" alt='Profile' />
                  <div className="d-flex flex-column ml-2"> <span className="font-weight-bold">{post.fullName}</span> <small className="text-primary">Collegues</small> </div>
                </div>
                <div className="d-flex flex-row mt-1 ellipsis">
                  <small className="mr-2 px-2">{post.creationDate}</small>
                  <small>
                    <a class="bi bi-list " href="#" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><Link class="dropdown-item" to={"/post/" + post.id}>View</Link></li>
                      {post.userId === loggedInUser.id ? <li><button class="dropdown-item" onClick={handleDeletePost}>Delete</button></li> : null}
                    </ul>
                  </small>
                </div>
              </div>
              <div className="p-2">
                <h5>{post.title}</h5>
                <p className="text-justify">{post.description}</p>
              </div>
              {post.imageIds.map(id => <img src={"http://localhost:8080/api/post/local/storage/download/image/" + id} className="img-fluid" alt='Data' key={id} />)}
              {/* {post.imageIds.length > 0 ? <img src={"http://localhost:8080/api/post/local/storage/download/image/" + post.imageIds[0]} className="img-fluid" alt='dsvv' /> : ""} */}
              <div className="p-2">
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-row icons d-flex align-items-center">
                    <h5 className="bi bi-hand-thumbs-up px-2" onClick={handleLikePost}>{noOfLikes}</h5>
                    <h5 className="bi bi-hand-thumbs-down px-3" onClick={handleDislikePost}><p hidden></p></h5>
                  </div>
                  <div className="d-flex flex-row ">
                    <h5 className="bi bi-chat-left-text px-3" data-toggle="collapse" href="#commentBox" role="button"> {noOfComments}</h5>
                  </div>
                  <hr />
                </div>
              </div>
              <div className="comments collapse" id="commentBox">
                <div className="comment-input pb-3">
                  <form onSubmit={handleCreateComment}>
                    <div className="d-flex flex-row add-comment-section mt-4 mb-4">
                      <img src={(loggedInUser.profileImageId !== null && loggedInUser.profileImageId !== undefined) ? "http://localhost:8080/api/post/local/storage/download/image/" + loggedInUser.profileImageId : "https://robohash.org/" + loggedInUser.id} width="30" className="rounded-circle" alt='Profile' />
                      <input type="text" id='commentInput' className="form-control mr-3" placeholder="Add comment" onChange={e => { createCommentData.description = e.target.value }} />
                      <button className="btn-outline-primary rounded-circle" type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-sendbtn " viewBox="0 0 16 16">
                          <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
                <div>
                  <InfiniteScroll
                    dataLength={comments.length} //This is important field to render the next data
                    next={() => setCommentPageNo({ pageNo: commentPageNo.pageNo + 1 })}
                    hasMore={(comments.length !== 0) && ((totalPages - 1) !== commentPageNo.pageNo)}
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
