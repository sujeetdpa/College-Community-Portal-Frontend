import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Navbar from '../components/Navbar';
import Post from '../components/Post'
import lodash from 'lodash'

export default function Feeds() {
    const [posts, setPosts] = useState([]);
    const [postPageNo, setPostPageNo] = useState({
        pageNo:0
    });
    const [totalPages, setTotalPages] = useState(0);
    const [createPostData, setCreatePostData] = useState({
        title: "",
        description: "",
        images: [],
        documents: []
    })
    const [uploadedImgs, setUploadedImgs] = useState([]);
    const [uploadedDocs, setUploadedDocs] = useState([]);
    function changePageNo(){
        setPosts([]);
        setTotalPages(0);
        setPostPageNo({pageNo:0});
    }
    useEffect(() => {
        const authHeader = "Bearer " + localStorage.getItem("access_token");
        const postRequest = {
            pageNo: postPageNo.pageNo,
            maxItem: '5',
            sortBy: 'creationDate'
        }
        const options = {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postRequest)
        }
        fetch("http://localhost:8080/api/post/all", options)
            .then(res => {
                res.json().then(data => {
                    console.log(data.postResponseViews);
                    setTotalPages(data.totalPages);
                    setPosts([...posts, ...data.postResponseViews])
                })
            })
    }, [postPageNo])
    const handleImageUpload = (e) => {
        const images = e.target.files;
        console.log("Images");
        console.log(images);
        if (images.length > 0) {
            const authHeader = "Bearer " + localStorage.getItem("access_token");
            let formData = new FormData();
            lodash.forEach(images, file => {
                formData.append("images", file)
            })
            const options = {
                method: 'POST',
                headers: {
                    'Authorization': authHeader
                },
                body: formData
            }
            const response = fetch("http://localhost:8080/api/post/local/storage/upload/image", options);
            response.then(res => {
                res.json().then(data => {
                    console.log(data);
                    setUploadedImgs(data);
                })
            })
        }
    }
    const handleDocumentUpload = (e) => {
        const docs = e.target.files;
        if (docs.length > 0) {
            const authHeader = "Bearer " + localStorage.getItem("access_token");
            const docsData = new FormData();
            lodash.forEach(docs, file => {
                docsData.append("documents", file);
            })
            const options = {
                method: 'POST',
                headers: {
                    'Authorization': authHeader
                },
                body: docsData
            }
            const response = fetch("http://localhost:8080/api/post/local/storage/upload/document", options);
            response.then(res => {
                res.json().then(data => {
                    console.log(data);
                    setUploadedDocs(data);
                })
            })
        }
    }
    const handleCreatePost = () => {
        if (uploadedImgs.length > 0) {
            createPostData.images = uploadedImgs;
        }
        if (uploadedDocs.length > 0) {
            createPostData.documents = uploadedDocs;
        }
        const authHeader = "Bearer " + localStorage.getItem("access_token");
        const options = {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(createPostData)
        }
        const response = fetch("http://localhost:8080/api/post/new", options);
        response.then(res => {
            if (!res.ok) {
                throw res.json();
            }
            res.json().then(data => {
                console.log(data);
                alert("Post successfully created");
                changePageNo();
            })
        }).catch(err => {
            err.then(data => {
                console.log(data);
                alert(data.message);
            })
        })

    }
    return (
        <>
            <Navbar />
            <div className='d-flex flex-row container'>
                <div className='mt-2 position-fixed'>
                    <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#exampleModal">
                        Create Post
                    </button>
                </div >
                <div className='flex-fill mt-2'>
                    <InfiniteScroll
                        dataLength={posts.length} //This is important field to render the next data
                        next={() => setPostPageNo({pageNo: postPageNo.pageNo+1})}
                        hasMore={(totalPages - 1) !== postPageNo.pageNo}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {posts.map(post => <Post postData={post} key={post.id} changePage={changePageNo} />)}
                    </InfiniteScroll>
                </div>
            </div >
            <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Create Post</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form className=''>
                                        <div className="form-group row mb-2">
                                            <label className="col-md-4 col-form-label text-md-right">Title</label>
                                            <div className="col-md-6">
                                                <input type="text" id="title" className="form-control" onChange={e => { createPostData.title = e.target.value }} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-4 col-form-label text-md-right">Description</label>
                                            <div className="col-md-6">
                                                <textarea type="text" id="description" className="form-control" cols='50' rows='8' onChange={e => { createPostData.description = e.target.value }} />
                                            </div>
                                        </div>
                                        <div className="modal-body d-felx flex-row">
                                            <div className="form-group row d-flex">
                                                <div className="col-md-6">
                                                    <small className="mr-2">
                                                        <label for="apply" className='' ><input type="file" name="" id='apply' accept="image/*" onChange={e => handleImageUpload(e)} multiple /><i class="bi bi-images mx-2"></i>Upload Image</label>
                                                    </small>
                                                    <span className='container-fluid'>
                                                        {
                                                            uploadedImgs.map(id => <img src={"http://localhost:8080/api/post/local/storage/download/image/" + id} width="50" key={id} className="px-1" />)
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="form-group row d-flex">
                                                <div className="col-md-6">
                                                    <small className="mr-2">
                                                        <label for="apply1" className='' ><input type="file" name="" id='apply1' onChange={e => handleDocumentUpload(e)} multiple /><i class="bi bi-file-earmark-arrow-up mx-2"></i>Upload Document</label>
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="reset" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary" onClick={handleCreatePost}>Post</button>
                                        </div>
                                    </form>
                                </div>


                            </div>
                        </div>
                    </div >
        </>

    )
}
