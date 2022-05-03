import React from 'react'
import { Link } from 'react-router-dom'
import './SearchedPost.css'

export default function SearchedPost({ postData }) {
    return (
        <div className="d-flex flex-column mb-2" >
            <div className="name d-flex flex-row justify-content-between">
                <Link to={"/post/" + postData.id} id="SLink">{postData.title}</Link>
                <small className="mr-2 px-2">{postData.creationDate}</small>
            </div>
            <div>
                <p>{postData.description} <Link to={"/post/" + postData.id} id="SLink">More...</Link></p>
            </div>
            <div className="d-flex flex-row ml-2">
                <img src={(postData.profileImageId !== null && postData.profileImageId !== undefined) ? process.env.REACT_APP_BASE_URL + "/api/post/local/storage/download/image/" + postData.profileImageId : "https://robohash.org/" + postData.userId} width="30" className="rounded-circle" alt='Profile' />
                <div >
                    <Link to={"/user/" + postData.username.split("@")[0] + "/profile"} id="SLink"><small className="comment-text">{postData.fullName}</small></Link>
                </div>
            </div>
            <hr className="my-2" />
        </div>
    )
}
