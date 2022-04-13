import React from 'react'
import { useParams } from 'react-router-dom'

export default function PostPage() {
    let params=useParams();
  return (
    <div>PostPage
        <h1>{params.postId}</h1>
    </div>
  )
}
