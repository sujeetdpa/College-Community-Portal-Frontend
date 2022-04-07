import React, { useEffect, useState } from 'react'
import Post from '../components/Post'

export default function Feeds() {
    const [posts,setPosts]= useState([]);
    const [user,setUser]=useState([]);
    useEffect(()=>{
        async function fetchPost(){
            const authHeader="Bearer "+localStorage.getItem("access_token");
            const postRequest={
                pageNo :'1',
                maxPostRequest :'10'
            }
            const options={
                method: 'GET',
                headers:{
                    'Authorization': authHeader
                },
                body: JSON.stringify(postRequest)
            }
            const response=await fetch("http://localhost:8080/api/post/all",options);
            response.then(res=>{
                return res.json();
            })
        }
        fetchPost().then(data=>{
            console.log(data);
            setPosts(data.postResponseViews);
        })
    },posts)
    useEffect(()=>{
        async function fetchUser(){
            const authHeader="Bearer "+localStorage.getItem("access_token");
            const postRequest={
                pageNo :'1',
                maxPostRequest :'10'
            }
            const options={
                method: 'GET',
                headers:{
                    'Authorization': authHeader
                },
                //body: JSON.stringify(postRequest)
            }
            const response=await fetch("http://localhost:8080/api/user",options);
            response.then(res=>{
                return res.json();
            })
        }
        fetchUser().then(data=>{
            console.log(data);
            setUser(data);
        })
    },user)
  return (
    <div>
        <h4>Community Feeds</h4>
        {posts.map(post=> <Post postData={post}/>)}
    </div>
    
  )
}
