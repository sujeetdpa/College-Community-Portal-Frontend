import React from 'react'

export default function SearchedPost({postData}) {
    return (
        <div className="d-flex flex-row mb-2">
            <img src={(postData.profileImageId !== null && postData.profileImageId !== undefined) ? "http://localhost:8080/api/post/local/storage/download/image/" + postData.profileImageId : "https://robohash.org/" + postData.userId} width="50" className="rounded-circle" alt='Profile' />
            <div className="d-flex flex-column ml-2"> <span className="name">{postData.fullName}</span> <small className="comment-text">{postData.title}</small>
            </div>
        </div>
    )
}
