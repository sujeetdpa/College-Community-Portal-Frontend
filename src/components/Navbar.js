import React from 'react'
import { useState, useEffect } from 'react'
import { decodeToken } from 'react-jwt';
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"));
    const token = decodeToken(localStorage.getItem("access_token"))
    const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("logged_in_user")));
    const navigate = useNavigate();
    useEffect(() => {
        setAccessToken(localStorage.getItem("access_token"));
        console.log("UserData: ", loggedInUser);
        setLoggedInUser(JSON.parse(localStorage.getItem("logged_in_user")));
    }, []);
    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("logged_in_user");
        setLoggedInUser(null);
        setAccessToken(null);
        navigate("/login");
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
                                            <Link className="nav-link" to="/login"><h5 class="bi bi-box-arrow-in-right"> Login</h5></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/register"><h5 class="bi bi-person-plus"> Join</h5></Link>
                                        </li>
                                    </> :
                                    <>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <img src={(loggedInUser.profileImageId !== null && loggedInUser.profileImageId !== undefined) ? process.env.REACT_APP_BASE_URL + "/api/post/local/storage/download/image/" + loggedInUser.profileImageId : "https://robohash.org/" + loggedInUser.id} width="30" height="30" className="rounded-circle" alt='Profile' /> {loggedInUser.fullName}
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li><Link className="dropdown-item" to={"/user/" + loggedInUser.universityId + "/profile"}> <small class="bi bi-gear"></small> Account</Link></li>
                                                {token.Roles.includes("ROLE_ADMIN") ? <>
                                                    <li><Link className="dropdown-item" to={"/admin/dashboard"}> <small class="bi bi-speedometer2"></small> Admin Dashboard</Link></li>
                                                    <li><Link className="dropdown-item" to={"/admin/users"}><small class="bi bi-people"></small> Users</Link></li>
                                                    <li><Link className="dropdown-item" to={"/admin/add"}><small class="bi bi-person-plus"></small> Add Admin</Link></li>
                                                    <li><Link className="dropdown-item" to={"/admin/deletedPosts"}><small class="bi bi-archive"></small> Deleted Posts</Link></li>
                                                    <li><Link className="dropdown-item" to={"/admin/deletedComments"}><small class="bi bi-file-minus"></small> Deleted Comments</Link></li>
                                                </> : null}
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><button className="btn btn-outline-secondary btn-sm dropdown-item" onClick={handleLogout}><small class="bi bi-box-arrow-left"></small> Logout</button></li>
                                            </ul>
                                        </li>
                                        <li className="nav-item ">
                                            <Link className="nav-link" to="/feeds"><h5 className='bi bi-rss'> Feeds</h5></Link>
                                        </li>
                                    </>}
                            </ul>
                            <div className="d-flex" >
                                <Link to="/search" className='nav-link'><h5 className='bi bi-search'> Search</h5></Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            
        </>
    )
}
