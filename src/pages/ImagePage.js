import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import UserSidebar from '../components/UserSidebar';

export default function ImagePage() {
  const params = useParams();
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalNumberOfItems, setTotalNumberOfItems] = useState(0);
  const [images, setImages] = useState([]);

  const [loggedInUser] = useState(JSON.parse(localStorage.getItem("logged_in_user")));


  useEffect(() => {

    if (loggedInUser.universityId !== params.universityId) {
      alert("You dont't have the required permissions");
      navigate("/user/" + params.universityId + "/profile");
    }
    console.log("Page no: " + pageNo);
    const authHeader = "Bearer " + localStorage.getItem("access_token");
    const imageRequest = {
      pageNo: pageNo,
      maxItems: '20'
    }
    const options = {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(imageRequest)
    }
    fetch(process.env.REACT_APP_BASE_URL + "/api/user/images", options)
      .then(res => {
        if (!res.ok) {
          throw res.json();
        }
        res.json().then(data => {
          setTotalNumberOfItems(data.totalNumberOfItems);
          setTotalPages(data.totalPages);
          setImages([...images, ...data.imageResponses]);
        })
      }).catch(err => {
        err.then(data => {
          alert(data.message);
        })
      })
  }, [pageNo])

  return (
    <div>
      <Navbar />
      <div className="container d-flex flex-row">
        <UserSidebar universityId={params.universityId} />
        <div class="col-md-9">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <h1 className="mt-4">{totalNumberOfItems} Images</h1>
                  <div className="row align-items-start">
                    <InfiniteScroll
                      dataLength={images.length} //This is important field to render the next data
                      next={() => setPageNo(pageNo + 1)}
                      hasMore={(images.length !== 0) && (totalPages - 1) !== pageNo}
                      loader={<h4>Loading...</h4>}
                      endMessage={
                        <p style={{ textAlign: 'center' }}>
                          <b>Yay! You have seen it all</b>
                        </p>
                      }
                    >
                      {images.map(image => <img src={process.env.REACT_APP_BASE_URL + '/api/post/local/storage/download/image/' + image.id} key={image.id} height="150" width="150" className='py-1 px-1' alt={image.imageName} />)}
                    </InfiniteScroll>
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
