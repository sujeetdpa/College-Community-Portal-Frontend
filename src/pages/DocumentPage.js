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
          setTotalNumberOfItems(data.totalNumberOfItems);
          setTotalPages(data.totalPages);
          setDocuments([...documents, ...data.documentResponses]);
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
                  <h1 className="mt-4">{totalNumberOfItems} Documents</h1>
                  <div className="modal-body d-flex" id='scroll'>
                    <InfiniteScroll
                      dataLength={documents.length} //This is important field to render the next data
                      next={() => setPageNo(pageNo + 1)}
                      hasMore={(documents.length !== 0) && (totalPages - 1) !== pageNo}
                      loader={<h4>Loading...</h4>}
                      endMessage={
                        <p style={{ textAlign: 'center' }}>
                          <b>Yay! You have seen it all</b>
                        </p>
                      }
                    >
                      {documents.map(doc => <DocumentSmallCard document={doc} key={doc.id} />)}
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
