import React from 'react'
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import DeletedPost from '../components/DeletedPost';
import Navbar from '../components/Navbar'

export default function RemovedPostPage() {
  const [deletedPosts, setDeletedPosts] = useState([]);
  const [postPageNo, setPostPageNo] = useState({
    pageNo: 0
  });
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const authHeader = "Bearer " + localStorage.getItem("access_token");
    const postRequest = {
      pageNo: postPageNo.pageNo,
      maxItem: '10',
      sortBy: 'creationDate'
    }
    const options = {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postRequest)
    }
    fetch(process.env.REACT_APP_BASE_URL + "/api/admin/deletedPosts", options)
      .then(res => {
        if(!res.ok){
          throw res.json();
        }
        res.json().then(data => {
          setTotalPages(data.totalPages);
          setDeletedPosts([...deletedPosts, ...data.postResponseViews])
        })
      }).catch(err=>{
        err.then(data=>{
          alert(data.message);
        })
      })
  }, [postPageNo])
  return (
    <div>
      <Navbar />
      <div>
        <div className='flex-fill mt-2'>
          <InfiniteScroll
            dataLength={deletedPosts.length} //This is important field to render the next data
            next={() => setPostPageNo({ pageNo: postPageNo.pageNo + 1 })}
            hasMore={(totalPages - 1) !== postPageNo.pageNo}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {deletedPosts.map(post => <DeletedPost postData={post} key={post.id} />)}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  )
}
