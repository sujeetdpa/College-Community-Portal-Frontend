import React from 'react'
import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import SearchedPost from './SearchedPost';

export default function Navbar() {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"));
    const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("logged_in_user")));
    const [searchTxt, setSearchTxt] = useState();

    const [searchPageNo, setSearchPageNo] = useState(0);
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
        console.log("Page no: "+searchPageNo);
        const authHeader = "Bearer " + localStorage.getItem("access_token");
        const searchRequest = {
            title: searchTxt,
            pageNo: searchPageNo,
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
    },[searchPageNo])
    const fetchSearchedPost = () => {
        
    }
    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("logged_in_user");
        setLoggedInUser(null);
        setAccessToken(null);
        navigate("/login");
    }
    const handleSearch = (e) => {
        e.preventDefault();
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
                                                <li><Link className="dropdown-item" to={"/user/profile/" + loggedInUser.username}>Account</Link></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><button className="btn btn-outline-secondary btn-sm dropdown-item" onClick={handleLogout}>Logout</button></li>
                                            </ul>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/feeds">Feeds</Link>
                                        </li>
                                    </>}
                            </ul>
                            <form className="d-flex" onSubmit={handleSearch}>
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={e => setSearchTxt(e.target.value)} />
                                <button className="btn btn-outline-success btn-sm" type="submit" data-toggle="modal" data-target="#exampleModalLong">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
            <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable" role="document" >
                    <div class="modal-content" >
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">{totalNumberOfItems}  Result Found..</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" id='scroll'>
                            <InfiniteScroll
                                dataLength={searchedPosts.length} //This is important field to render the next data
                                next={() => setSearchPageNo(searchPageNo+1)}
                                hasMore={(totalPages - 1) !== searchPageNo}
                                loader={<h4>Loading...</h4>}
                                scrollableTarget="scroll"
                                endMessage={
                                    <p style={{ textAlign: 'center' }}>
                                        <b>Yay! You have seen it all</b>
                                    </p>
                                }

                            >
                                {searchedPosts.map(searchedPost => <SearchedPost postData={searchedPost} key={searchedPost.id} />)}
                            </InfiniteScroll>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
