import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState,useEffect } from 'react';
import Navbar from '../components/Navbar'
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from '../components/Post';
import UserSidebar from '../components/UserSidebar';

export default function MyPostPage() {
    const params = useParams();
    const [pageNo, setPageNo] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalNumberOfItems, setTotalNumberOfItems] = useState(0);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const authHeader = "Bearer " + localStorage.getItem("access_token");
        const postRequest = {
            pageNo: pageNo,
            maxItem: '5',
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
        fetch("http://localhost:8080/api/user/post", options)
            .then(res => {
                if(!res.ok){
                    throw res.json();
                }
                res.json().then(data => {
                    console.log(data.postResponseViews);
                    setTotalPages(data.totalPages);
                    setTotalNumberOfItems(data.totalNumberOfItems);
                    setPosts([...posts, ...data.postResponseViews])
                })
            }).catch(err=>{
                err.then(data=>{
                    alert(data.message);
                })
            })
    }, [pageNo])
    return (
        <div>
            <Navbar />
            <div className="d-flex container pt-2" id="wrapper">
            <UserSidebar universityId={params.universityId}/>
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        <h1 className="mt-4">{totalNumberOfItems} Posts</h1>
                        <div className='d-flex flex-fill'>
                            <InfiniteScroll
                                dataLength={posts.length} //This is important field to render the next data
                                next={() => setPageNo(pageNo + 1)}
                                hasMore={(posts.length !==0 )&&(totalPages - 1) !== pageNo}
                                loader={<h4>Loading...</h4>}
                                endMessage={
                                    <p style={{ textAlign: 'center' }}>
                                        <b>Yay! You have seen it all</b>
                                    </p>
                                }
                            >
                                {posts.map(post => <Post postData={post} key={post.id} />)}
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}