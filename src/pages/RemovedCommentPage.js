import React from 'react'
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import DeletedComment from '../components/DeletedComment';
import Navbar from '../components/Navbar';

export default function RemovedCommentPage() {
    const [comments, setComments] = useState([]);
    const [commentPageNo, setCommentPageNo] = useState({
        pageNo: 0
    });
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        const authHeader = "Bearer " + localStorage.getItem("access_token");
        const commentRequest = {
            pageNo: commentPageNo.pageNo,
            maxItem: '10'
        }
        const options = {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentRequest)
        }
        fetch(process.env.REACT_APP_BASE_URL + "/api/admin/deletedComments", options)
            .then(res => {
                if(!res.ok){
                    throw res.json();
                }
                res.json().then(data => {
                    setTotalPages(data.totalPages)
                    setComments([...comments, ...data.commentResponseViews]);
                })
            }).catch(err=>{
                err.then(data=>{
                    alert(data.message);
                })
            })
    }, [commentPageNo])
    return (
        <div>
            <Navbar />
            <div>
                <div className="container mt-5 mb-5">
                    <div className="row d-flex align-items-center justify-content-center">
                        <div className="col-md-6">
                            <div className="card mt-2">
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
                                    {comments.map(comment => <DeletedComment commentData={comment} key={comment.id} />)}
                                </InfiniteScroll>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
