import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"));
    const [loggedInUser,setLoggedInUser] =useState(JSON.parse(localStorage.getItem("logged_in_user")));
    const navigate = useNavigate();
    useEffect(() => {
        setAccessToken(localStorage.getItem("access_token"));
        console.log("UserData: ",loggedInUser);
        setLoggedInUser(JSON.parse(localStorage.getItem("logged_in_user")));
    }, [accessToken,loggedInUser]);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("logged_in_user");
        setLoggedInUser(null);
        setAccessToken(null);
        navigate("/login");
    }
    return (
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
                                        <img src={(loggedInUser.profileImageId!==null && loggedInUser.profileImageId!== undefined) ? "http://localhost:8080/api/post/local/storage/download/image/" + loggedInUser.profileImageId : "https://robohash.org/"+loggedInUser.id} width="30" className="rounded-circle" alt='Profile' /> {loggedInUser.fullName}
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li><Link className="dropdown-item" to={"/user/profile/"+loggedInUser.username}>Account</Link></li>
                                            <li><hr className="dropdown-divider"/></li>
                                            <li><button className="btn btn-outline-secondary btn-sm dropdown-item" onClick={handleLogout}>Logout</button></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/feeds">Feeds</Link>
                                    </li>
                                </>}
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success btn-sm" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}
