import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from '../components/Post';
import UserSidebar from '../components/UserSidebar';

export default function MyPostPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [postPageNo, setPostPageNo] = useState({
        pageNo: 0
    });
    const [totalPages, setTotalPages] = useState(0);
    const [totalNumberOfItems, setTotalNumberOfItems] = useState(0);
    const [posts, setPosts] = useState([]);
    const [loggedInUser] = useState(JSON.parse(localStorage.getItem("logged_in_user")));

    function changePageNo() {
        setPosts([]);
        setTotalPages(0);
        setPostPageNo({ pageNo: 0 });
    }
    useEffect(() => {
        if (loggedInUser.universityId !== params.universityId) {
            alert("You dont't have the required permissions");
            navigate("/user/" + params.universityId + "/profile");
        }
        const authHeader = "Bearer " + localStorage.getItem("access_token");
        const postRequest = {
            pageNo: postPageNo.pageNo,
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
        fetch(process.env.REACT_APP_BASE_URL + "/api/user/post", options)
            .then(res => {
                if (!res.ok) {
                    throw res.json();
                }
                res.json().then(data => {
                    setTotalPages(data.totalPages);
                    setTotalNumberOfItems(data.totalNumberOfItems);
                    setPosts([...posts, ...data.postResponseViews])
                })
            }).catch(err => {
                err.then(data => {
                    alert(data.message);
                })
            })
    }, [postPageNo])
    return (
        <div>
            <Navbar />
            <div className="d-flex container pt-2" >
                <UserSidebar universityId={params.universityId} />
                <div>
                    <div className="container-fluid">
                        <h1 className="mt-4">{totalNumberOfItems} Posts</h1>
                        <div className="d-flex">
                            <InfiniteScroll
                                dataLength={posts.length} //This is important field to render the next data
                                next={() => setPostPageNo({ pageNo: postPageNo.pageNo + 1 })}
                                hasMore={(posts.length !== 0) && (totalPages - 1) !== postPageNo.pageNo}
                                loader={<h4>Loading...</h4>}
                                endMessage={
                                    <p style={{ textAlign: 'center' }}>
                                        <b>Yay! You have seen it all</b>
                                    </p>
                                }
                            >
                                {posts.map(post => <Post postData={post} key={post.id} changePage={changePageNo} />)}
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
