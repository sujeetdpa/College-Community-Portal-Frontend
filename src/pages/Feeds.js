import React, { useEffect, useState } from 'react'
import Post from '../components/Post'

export default function Feeds() {
    const [posts,setPosts]= useState([]);
    const [user,setUser]=useState([]);

    useEffect(()=>{
        async function fetchPost(){
            const authHeader="Bearer "+localStorage.getItem("access_token");
            const postRequest={
                pageNo :'0',
                maxPostRequest :'10',
                sortBy : 'creationDate'
            }
            const options={
                method: 'POST',
                headers:{
                    'Authorization': authHeader,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postRequest)
            }
            const response=await fetch("http://localhost:8080/api/post/all",options);
            return response.json();
        }
        fetchPost().then(data=>{
            setPosts(data.postResponseViews);
            console.log(data);
        })
    },[])
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
            return response.json();
        }
        fetchUser().then(data=>{
            setUser(data);
            console.log((data));
        })
    },[])
  return (
    <div>
        <h4>Community Feeds</h4>
        {posts.map(post=> <Post postData={post} key={post.id}/>)}
        {/* <Post postData=""/> */}
    </div>
    
  )
}
