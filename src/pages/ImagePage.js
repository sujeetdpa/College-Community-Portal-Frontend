import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function ImagePage() {
  const params = useParams();
  const [pageNo, setPageNo] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalNumberOfItems, setTotalNumberOfItems] = useState(0);
  const [imageIds,setImageIds]=useState([]);

  useEffect(()=>{
    console.log("Page no: "+pageNo);
        const authHeader = "Bearer " + localStorage.getItem("access_token");
        const imageRequest = {
            pageNo: pageNo,
            maxItems: '10'
        }
        const options = {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(imageRequest)
        }
        fetch("http://localhost:8080/api/user/images", options)
        .then(res=>{
          res.json().then(data=>{
            console.log(data);
            setTotalNumberOfItems(data.totalNumberOfItems);
            setTotalPages(data.totalPages);
            setImageIds([...imageIds,...data.imageIds]);
          })
        })
  },[pageNo])

  return (
    <div>
      <Navbar />
      <div className="d-flex container pt-2" id="wrapper">
        <div className="border-end bg-white" id="sidebar-wrapper">
          <div className="list-group list-group-flush">
          <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/" + params.universityId + "/myPosts"}>My Posts</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/" + params.universityId + "/dashboard"}>Dashboard</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/" + params.universityId + "/statistics"}>Statistics</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/" + params.universityId + "/profile"}>Profile</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/" + params.universityId + "/images"}>Images</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/" + params.universityId + "/documents"}>Documents</Link>
          </div>
        </div>
        <div id="page-content-wrapper" className='container px-2'>
          <div className=''>
            <h1 className="mt-4">{totalNumberOfItems} Images</h1>
            <div className="row align-items-start" id='scroll'>
              <InfiniteScroll
                dataLength={imageIds.length} //This is important field to render the next data
                next={() => setPageNo(pageNo + 1)}
                hasMore={(imageIds.length !==0)&&(totalPages - 1) !== pageNo}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scroll"
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                {imageIds.map(id => <div className='col'><img src={'http://localhost:8080/api/post/local/storage/download/image/'+id } key={id} height="100" width="100"/></div>)}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
