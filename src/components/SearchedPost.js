import React from 'react'
import { Link } from 'react-router-dom'
import './SearchedPost.css'

export default function SearchedPost({ postData }) {
    return (
        <div className="d-flex flex-column mb-2" >
            <div className="name"><Link to={"/post/"+postData.id} >{postData.title}</Link></div>
            <div className="d-flex flex-column ml-2">
                <Link to={"/user/"+postData.username.split("@")[0]+"/profile"}>
                <img src={(postData.profileImageId !== null && postData.profileImageId !== undefined) ? "http://localhost:8080/api/post/local/storage/download/image/" + postData.profileImageId : "https://robohash.org/" + postData.userId} width="30" className="rounded-circle" alt='Profile' />
                <div >
                    <small className="comment-text">{postData.fullName}</small>
                </div>
                </Link>
            </div>
            <hr/>
        </div>
    )
}
