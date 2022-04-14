import React, { useEffect, useState } from 'react'
import Post from '../components/Post'

export default function Feeds() {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState([]);
    let images = [];
    let docs = [];
    let uploadedImages;
    let uploadedDocs;

    useEffect(() => {
        async function fetchPost() {
            const authHeader = "Bearer " + localStorage.getItem("access_token");
            const postRequest = {
                pageNo: '0',
                maxPostRequest: '10',
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
            const response = await fetch("http://localhost:8080/api/post/all", options);
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        }
        fetchPost().then(data => {
            setPosts(data.postResponseViews);
            console.log(data);
        }).catch(err => {
            err.then(data => {
                console.log(data);
                alert(data.message);
            })
        })
    }, [])
    useEffect(() => {
        async function fetchUser() {
            const authHeader = "Bearer " + localStorage.getItem("access_token");
            const postRequest = {
                pageNo: '1',
                maxPostRequest: '10'
            }
            const options = {
                method: 'GET',
                headers: {
                    'Authorization': authHeader
                },
            }
            const response = await fetch("http://localhost:8080/api/user", options);
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        }
        fetchUser().then(data => {
            setUser(data);
            console.log((data));
        }).catch(err => {
            err.then(data => {
                console.log(data);
                alert(data.message);
            })
        })
    }, []);
    
    const handleUpload = () => {
        const authHeader = "Bearer " + localStorage.getItem("access_token");
        console.log("images: "); console.log(images);
        console.log("docs: "); console.log(docs);

        if (images.length > 0) {
            const imageFormData = new FormData();
            imageFormData.append("images", images);
            let imageOptions = {
                method: 'POST',
                headers: {
                    'Authorization': authHeader,
                },
                body: imageFormData
            }
            const imgRes = fetch("http://localhost:8080/api/post/local/storage/upload/image", imageOptions);
            imgRes.then(res => {
                res.json().then(data => {
                    console.log(data);
                    uploadedImages = data;
                })
            })
        }
        if (docs.length > 0) {
            const docFormData = new FormData();
            docFormData.append("documents", docs);

            let docOptions = {
                method: 'POST',
                headers: {
                    'Authorization': authHeader,
                },
                body: docFormData
            }
            const imgRes = fetch("http://localhost:8080/api/post/local/storage/upload/document", docOptions);
            imgRes.then(res => {
                res.json().then(data => {
                    console.log(data);
                    uploadedDocs = data;
                })
            })
        }

    }
    return (
        <div className='d-flex flex-row '>
            <div className=' align-content-end'>
                <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#exampleModal">
                    Create Post
                </button>

                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                            <input type="text" id="title" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-4 col-form-label text-md-right">Description</label>
                                        <div className="col-md-6">
                                            <textarea type="text" id="description" className="form-control" cols='50' rows='8' />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-body d-felx flex-row">
                                <div className="form-group row">
                                    <div className="col-md-6">
                                        <div class="file btn btn-sm btn-primary bi bi-card-image">
                                            <input type="file" name="file" className='bg-transparent' onChange={e => { images = e.target.files }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-6">
                                        <div class="file btn btn-sm btn-primary bi bi-file-earmark-arrow-up">
                                            <input type="file" name="file" className='bg-transparent' onChange={e => { docs = e.target.files }} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button className='btn btn-primary btn-sm' onClick={handleUpload}>Upload</button>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Post</button>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
            <div className='flex-fill'>
                {posts.map(post => <Post postData={post} key={post.id} />)}
            </div>
            <div className='align-content-end'>
                <button className="btn btn-primary">Most Performances</button>
            </div>

        </div >

    )
}
