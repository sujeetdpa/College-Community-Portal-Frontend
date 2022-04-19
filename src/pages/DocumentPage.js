import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEffect,useState } from 'react';
import Navbar from '../components/Navbar'
import InfiniteScroll from 'react-infinite-scroll-component';

export default function DocumentPage() {
  const params = useParams();
  const [pageNo, setPageNo] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalNumberOfItems, setTotalNumberOfItems] = useState(0);
  const [documentIds,setDocumentIds]=useState([]);

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
        fetch("http://localhost:8080/api/user/documents", options)
        .then(res=>{
          res.json().then(data=>{
            console.log(data);
            setTotalNumberOfItems(data.totalNumberOfItems);
            setTotalPages(data.totalPages);
            setDocumentIds([...documentIds,...data.documentIds]);
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
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/"+params.universityId+"/dashboard"}>Dashboard</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/"+params.universityId+"/statistics"}>Statistics</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/"+params.universityId+"/profile"}>Profile</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/"+params.universityId+"/images"}>Images</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/user/"+params.universityId+"/documents"}>Documents</Link>
          </div>
        </div>
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <h1 className="mt-4">Documents</h1>
            <div className="modal-body d-flex" id='scroll'>
              <InfiniteScroll
                dataLength={documentIds.length} //This is important field to render the next data
                next={() => setPageNo(pageNo + 1)}
                hasMore={(documentIds.length !==0)&&(totalPages - 1) !== pageNo}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scroll"
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                {documentIds.map(id => <div><iframe src={'http://localhost:8080/api/post/local/storage/download/document/'+id } key={id}></iframe></div>)}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
