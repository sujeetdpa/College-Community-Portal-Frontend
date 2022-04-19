import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Navbar from '../components/Navbar';
import Post from '../components/Post'

export default function Feeds() {
    const [posts, setPosts] = useState([]);
    const [pageNo, setPageNo] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [createPostData, setCreatePostData] = useState({
        title: "",
        description: "",
        images: [],
        documents: []
    })
    let uploadedImgs = [];
    let uploadedDocs = [];

    useEffect(() => {
        const authHeader = "Bearer " + localStorage.getItem("access_token");
        const postRequest = {
            pageNo: pageNo,
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
    }, [pageNo])
    const handleImageUpload = (e) => {
        const images = e.target.files;
        console.log("Images");
        console.log(images);
        if (images.length > 0) {
            const authHeader = "Bearer " + localStorage.getItem("access_token");
            let formData = new FormData();
            formData.append("images", images);
            console.log("form data:")
            console.log(formData.get("images"));
            const options = {
                method: 'POST',
                headers: {
                    'Authorization': authHeader
                },
                body: formData
            }
            const response = fetch("http://localhost:8080/api/post/local/storage/upload/image/new", options);
            response.then(res => {
                res.json().then(data => {
                    console.log(data);
                    uploadedImgs = data;
                })
            })
        }
    }
    const handleDocumentUpload = (e) => {
        const docs = e.target.files;
        if (docs.length > 0) {
            const authHeader = "Bearer " + localStorage.getItem("access_token");
            const docsData = new FormData();
            docsData.append("documents", docs);
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
                    uploadedDocs = data;
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
            <div className='d-flex flex-row '>
                <div className=' align-content-center mt-2'>
                    <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#exampleModal">
                        Create Post
                    </button>

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
                                    </form>
                                </div>
                                <div className="modal-body d-felx flex-row">
                                    <div className="form-group row">
                                        <div className="col-md-6">
                                            <div className="file btn btn-sm btn-primary bi bi-card-image">
                                                <input type="file" name="file" multiple className='bg-transparent' onChange={e => handleImageUpload(e)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-md-6">
                                            <div className="file btn btn-sm btn-primary bi bi-file-earmark-arrow-up">
                                                <input type="file" name="file" multiple className='bg-transparent' onChange={e => handleDocumentUpload(e)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button className='btn btn-primary btn-sm'>Upload</button>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={handleCreatePost}>Post</button>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
                <div className='flex-fill mt-2'>
                    <InfiniteScroll
                        dataLength={posts.length} //This is important field to render the next data
                        next={() => setPageNo(pageNo + 1)}
                        hasMore={(totalPages - 1) !== pageNo}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {posts.map(post => <Post postData={post} key={post.id} />)}
                    </InfiniteScroll>
                </div>
                <div className='align-content-end mt-2'>
                    <button className="btn btn-primary">Most Performances</button>
                </div>

            </div >
        </>

    )
}
