import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'
import InfiniteScroll from 'react-infinite-scroll-component';
import UserSidebar from '../components/UserSidebar';
import DocumentSmallCard from '../components/DocumentSmallCard';

export default function DocumentPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalNumberOfItems, setTotalNumberOfItems] = useState(0);
  const [documents, setDocuments] = useState([]);

  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("logged_in_user")));


  useEffect(() => {
    if (loggedInUser.universityId !== params.universityId) {
      alert("You dont't have the required permissions");
      navigate("/user/" + params.universityId + "/profile");
    }
    console.log("Page no: " + pageNo);
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
    fetch(process.env.REACT_APP_BASE_URL + "/api/user/documents", options)
      .then(res => {
        if (!res.ok) {
          throw res.json();
        }
        res.json().then(data => {
          console.log(data);
          setTotalNumberOfItems(data.totalNumberOfItems);
          setTotalPages(data.totalPages);
          setDocuments([...documents, ...data.documentResponses]);
        })
      }).catch(err => {
        err.then(data => {
          console.log(data);
          alert(data.message);
        })
      })
  }, [pageNo])

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
      <Navbar />
      <div className="d-flex container pt-2" id="wrapper">
        <UserSidebar universityId={params.universityId} />
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <h1 className="mt-4">{totalNumberOfItems} Documents</h1>
            <div className="modal-body d-flex" id='scroll'>
              <InfiniteScroll
                dataLength={documents.length} //This is important field to render the next data
                next={() => setPageNo(pageNo + 1)}
                hasMore={(documents.length !== 0) && (totalPages - 1) !== pageNo}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scroll"
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                {/* {documentIds.map(id => <h3 type="button" onClick={()=>{fetchDoc(id)}} key={id}>{"Document Id: "+id}</h3>)} */}
                {documents.map(doc => <div onClick={() => fetchDoc(doc.id)} role="button" className='mb-2'><DocumentSmallCard fileName={doc.fileName} key={doc.id} /></div>)}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
