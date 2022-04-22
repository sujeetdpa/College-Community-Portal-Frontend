import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import SearchedPost from './SearchedPost';

export default function Navbar() {
    const didMount = useRef(false);

    const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"));
    const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("logged_in_user")));
    const [searchTxt, setSearchTxt] = useState();

    const [searchPageNo, setSearchPageNo] = useState({
        pageNo: null
    });
    const [totalPages, setTotalPages] = useState(0);
    const [totalNumberOfItems, setTotalNumberOfItems] = useState(0);
    const [searchedPosts, setSearchedPosts] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        setAccessToken(localStorage.getItem("access_token"));
        console.log("UserData: ", loggedInUser);
        setLoggedInUser(JSON.parse(localStorage.getItem("logged_in_user")));
    }, []);
    
    useEffect(()=>{
        if (didMount.current) fetchSearchedPost();
        else didMount.current = true;
    },[searchPageNo])

    const fetchSearchedPost = () => {
        if(localStorage.getItem("access_token")===null || localStorage.getItem("access_token")===undefined || localStorage.getItem("logged_in_user")===null){
            navigate("/login");
            alert("Please login.");
        }
        console.log("Page no: "+searchPageNo);
        const authHeader = "Bearer " + localStorage.getItem("access_token");
        const searchRequest = {
            title: searchTxt,
            pageNo: searchPageNo.pageNo,
            maxItems: '10'
        }
        const options = {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchRequest)
        }
        fetch("http://localhost:8080/api/post/search", options)
            .then(res => {
                if (!res.ok) {
                    throw res.json();
                }
                res.json().then(data => {
                    console.log(data);
                    setTotalPages(data.totalPages);
                    setTotalNumberOfItems(data.totalNumberOfItems);
                    setSearchedPosts([...searchedPosts, ...data.postSearchResponseViews]);
                })
            }).catch(err => {
                err.then(data => {
                    console.log(data);
                    alert(data.message);
                })
            })
    }
    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("logged_in_user");
        setLoggedInUser(null);
        setAccessToken(null);
        navigate("/login");
    }
    const handleSearch = () => {
        setSearchPageNo({pageNo:0});
        setTotalNumberOfItems(0);
        setTotalPages(0);
        setSearchedPosts([]);
    }
    return (
        <>
            <div className='mainNavbar'>
                <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link to="/" className="navbar-brand">College Community Portal</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {(accessToken === undefined || accessToken === null) ?
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/login"><button className="btn btn-outline-primary btn-sm">Login</button></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/register"><button className="btn btn-outline-primary btn-sm">Join</button></Link>
                                        </li>
                                    </> :
                                    <>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <img src={(loggedInUser.profileImageId !== null && loggedInUser.profileImageId !== undefined) ? "http://localhost:8080/api/post/local/storage/download/image/" + loggedInUser.profileImageId : "https://robohash.org/" + loggedInUser.id} width="30" className="rounded-circle" alt='Profile' /> {loggedInUser.fullName}
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li><Link className="dropdown-item" to={"/user/" + loggedInUser.universityId+"/profile"}>Account</Link></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><button className="btn btn-outline-secondary btn-sm dropdown-item" onClick={handleLogout}>Logout</button></li>
                                            </ul>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/feeds">Feeds</Link>
                                        </li>
                                    </>}
                            </ul>
                            <div className="d-flex" >
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={e => setSearchTxt(e.target.value)} />
                                <button className="btn btn-outline-success btn-sm" type="submit" data-toggle="modal" data-target="#exampleModalLong" onClick={handleSearch}>Search</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable" role="document" >
                    <div className="modal-content" >
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">{totalNumberOfItems}  Result Found..</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" id='scroll'>
                            <InfiniteScroll
                                dataLength={searchedPosts.length} //This is important field to render the next data
                                next={() => setSearchPageNo({pageNo: searchPageNo.pageNo+1})}
                                hasMore={(setSearchedPosts.length !==0) && (totalPages - 1) !== searchPageNo.pageNo}
                                loader={<h4>Loading...</h4>}
                                scrollableTarget="scroll"
                                endMessage={
                                    <p style={{ textAlign: 'center' }}>
                                        <b>Yay! You have seen it all</b>
                                    </p>
                                }

                            >
                                {searchedPosts.map(searchedPost => <SearchedPost postData={searchedPost} key={searchedPost.id}/>)}
                            </InfiniteScroll>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
