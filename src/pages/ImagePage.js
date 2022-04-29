import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useParams,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import Navbar from '../components/Navbar';
import UserSidebar from '../components/UserSidebar';

export default function ImagePage() {
  const params = useParams();
  const navigate=useNavigate();
  const [pageNo, setPageNo] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalNumberOfItems, setTotalNumberOfItems] = useState(0);
  const [imageIds,setImageIds]=useState([]);

  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("logged_in_user")));
    

  useEffect(()=>{
   
    if(loggedInUser.universityId!==params.universityId){
      alert("You dont't have the required permissions");
      navigate("/user/"+params.universityId+"/profile");
  }
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
        fetch(process.env.REACT_APP_BASE_URL+"/api/user/images", options)
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
      <UserSidebar universityId={params.universityId}/>
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
                {imageIds.map(id => <div className='col'><img src={process.env.REACT_APP_BASE_URL+'/api/post/local/storage/download/image/'+id } key={id} height="100" width="100"/></div>)}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
