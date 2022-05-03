import React from 'react'
import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchedPost from '../components/SearchedPost';


export default function SearchPage() {
    const didMount = useRef(false);
    const [searchTxt, setSearchTxt] = useState();
    const [searchPageNo, setSearchPageNo] = useState({
        pageNo: 0
    });
    const [totalPages, setTotalPages] = useState(0);
    const [totalNumberOfItems, setTotalNumberOfItems] = useState(0);
    const [searchedPosts, setSearchedPosts] = useState([]);

    useEffect(() => {
        if (didMount.current) fetchSearchedPost();
        else didMount.current = true;
    }, [searchPageNo])

    function fetchSearchedPost() {
        console.log("Page no: " + searchPageNo);
        const authHeader = "Bearer " + localStorage.getItem("access_token");
        const searchRequest = {
            title: searchTxt,
            pageNo: searchPageNo.pageNo,
            maxItems: '15'
        }
        const options = {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchRequest)
        }
        fetch(process.env.REACT_APP_BASE_URL + "/api/post/search", options)
            .then(res => {
                if (!res.ok) {
                    throw res.json();
                }
                res.json().then(data => {
                    setTotalPages(data.totalPages);
                    setTotalNumberOfItems(data.totalNumberOfItems);
                    setSearchedPosts([...searchedPosts, ...data.postSearchResponseViews]);
                })
            }).catch(err => {
                err.then(data => {
                    alert(data.message);
                })
            })
    }
    const handleSearch = (e) => {
        e.preventDefault();
        setSearchedPosts([]);
        setTotalNumberOfItems(0);
        setTotalPages(0);
        setSearchPageNo({ pageNo: 0 })
        document.getElementById("exampleModalLongTitle").hidden = false;
    }
    return (
        <div>
            <Navbar />
            <div className='container '>
                <div className=''>
                    <form onSubmit={handleSearch}>
                        <div className="input-group">
                            <input type="search" className="form-control rounded" placeholder="Post Title.." aria-label="Search" aria-describedby="search-addon" onChange={e => { setSearchTxt(e.target.value) }} />
                            <button type="submit" className="btn btn-outline-primary">Search</button>
                        </div>
                    </form>
                    <h5 className="modal-title mb-2" id="exampleModalLongTitle" hidden={true}>{totalNumberOfItems}  Result Found..</h5>
                </div>
                <div className="container  mb-2">
                    <div className="row d-flex align-items-center justify-content-center">
                        <div className="col-md-7">
                            <div className="card"></div>
                            <InfiniteScroll
                                dataLength={searchedPosts.length} //This is important field to render the next data
                                next={() => setSearchPageNo({ pageNo: searchPageNo.pageNo + 1 })}
                                hasMore={(searchedPosts.length !== 0) && (totalPages - 1) !== searchPageNo.pageNo}
                                loader={<h4>Loading...</h4>}
                                endMessage={
                                    <p style={{ textAlign: 'center' }}>
                                        <b>Yay! You have seen it all</b>
                                    </p>
                                }
                            >
                                {searchedPosts.map(searchedPost => <SearchedPost postData={searchedPost} key={searchedPost.id} />)}
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
