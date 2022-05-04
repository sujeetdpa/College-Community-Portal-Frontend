import React from 'react'
import { useState } from 'react'
import './UserSmallCard.css'

export default function UserSmallCard({ userData, changePage }) {
    const [user, setUser] = useState(userData);
    const handleBlockUser = () => {
        const authHeader = "Bearer " + localStorage.getItem("access_token");
        const options = {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
            },
        }
        fetch(process.env.REACT_APP_BASE_URL + "/api/admin/blockUser/" + userData.id, options)
            .then(res => {
                if (!res.ok) {
                    throw res.json();
                }
                res.json().then(data => {
                    setUser(data);
                    alert(data.fullName + " Blocked successfully");
                })
            }).catch(err => {
                err.then(data => {
                    alert(data.message);
                })
            })
    }
    const toggleRole = () => {
        const authHeader = "Bearer " + localStorage.getItem("access_token");
        const options = {
            method: 'GET',
            headers: {
                'Authorization': authHeader,
            },
        }
        fetch(process.env.REACT_APP_BASE_URL + "/api/admin/toggleRole/" + userData.id, options)
            .then(res => {
                if (!res.ok) {
                    throw res.json();
                }
                res.json().then(data => {
                    setUser(data);
                    alert(data.fullName + " role changed to " + data.role)
                })
            }).catch(err => {
                err.then(data => {
                    alert(data.message);
                })
            })
    }
    const handleDelete = () => {
        if (window.confirm("Confirm to delete "+userData.fullName)) {
            const authHeader = "Bearer " + localStorage.getItem("access_token");
            const options = {
                method: 'DELETE',
                headers: {
                    'Authorization': authHeader,
                },
            }
            fetch(process.env.REACT_APP_BASE_URL + "/api/admin/delete/user/" + userData.id, options)
                .then(res => {
                    if (!res.ok) {
                        throw res.json();
                    }
                    res.json().then(data => {
                        alert(data.message);
                        changePage();
                    })
                }).catch(err => {
                    err.then(data => {
                        alert(data.message);
                    })
                })
        }
    }
    const handleSendActivationLink = () => {
        const authHeader = "Bearer " + localStorage.getItem("access_token");
        const options = {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
            },
        }
        fetch(process.env.REACT_APP_BASE_URL + "/api/admin/send/activationLink/" + userData.id, options)
            .then(res => {
                if (!res.ok) {
                    throw res.json();
                }
                res.text().then(data => {
                    alert(data);
                })
            }).catch(err => {
                err.then(data => {
                    alert(data.message);
                })
            })
    }
    return (
        <tr>
            <td>{user.id}</td>
            <td><img src={(user.profileImageId !== null && user.profileImageId !== undefined) ? process.env.REACT_APP_BASE_URL + "/api/post/local/storage/download/image/" + user.profileImageId : "https://robohash.org/" + user.id} width="50" className="rounded-circle" alt='Profile' /></td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.username}</td>
            <td><p className={user.role.includes("ROLE_ADMIN") ? "badge bg-primary rounded-pill" : "badge bg-secondary rounded-pill"}>{user.role}</p></td>
            <td>{user.isActive ? <p className='badge bg-success rounded-pill'>Active</p> : <p className='badge bg-danger rounded-pill'>Not Active</p>}</td>
            <td>{user.isNotLocked ? <p className='badge bg-success rounded-pill'>Not Blocked</p> : <p className='badge bg-danger rounded-pill'>Blocked</p>}</td>
            <td><button className={user.isNotLocked ? "btn btn-outline-danger btn-sm" : "btn btn-outline-success btn-sm"} data-bs-toggle="modal" data-bs-target={"#cnfBlockModal" + user.id}>{user.isNotLocked ? "Block" : "Unblock"}</button></td>
            <td><button className='btn btn-outline-primary btn-sm bi bi-eye' data-bs-toggle="modal" data-bs-target={"#exampleModal" + user.id}></button></td>
            <td><button className='btn btn-outline-danger btn-sm bi bi-trash' onClick={handleDelete}></button></td>
            <div className="modal fade bd-example-modal-lg" id={"exampleModal" + user.id} tabIndex="-1" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <main className="my-form">
                                <div className="cotainer">
                                    <div className="row justify-content-center">
                                        <div className="col-md-8">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div name="my-form">
                                                        <div className="d-flex justify-content-between p-2 px-3">
                                                            <div className="d-flex flex-row align-items-center">
                                                                <img src={(userData.profileImageId !== null && user.profileImageId !== undefined) ? process.env.REACT_APP_BASE_URL + "/api/post/local/storage/download/image/" + user.profileImageId : "https://robohash.org/" + user.userId} width="100" className="rounded-circle" alt='Profile' />
                                                                <div className="d-flex flex-column ml-2"> <h3 className="font-weight-bold">{userData.fullName}</h3> <small className="text-primary">{userData.role}</small> </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </main >
                            <main className="my-form">
                                <div className="cotainer">
                                    <div className="row justify-content-center">
                                        <div className="col-md-8">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div name="my-form">
                                                        <div className="form-group row">
                                                            <label className="col-md-4 col-form-label text-md-right">First Name</label>
                                                            <div className="col-md-6">
                                                                <input type="text" id="firstName" className="form-control" value={user.firstName} disabled />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-md-4 col-form-label text-md-right">Last Name</label>
                                                            <div className="col-md-6">
                                                                <input type="text" id="lastName" className="form-control" value={user.lastName} disabled />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-md-4 col-form-label text-md-right">Gender</label>
                                                            <div className="col-md-6">
                                                                <input type="text" id="gender" className="form-control" value={user.gender} disabled />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-md-4 col-form-label text-md-right">Date of Birth</label>
                                                            <div className="col-md-6">
                                                                <input type="text" id="dob" className="form-control" value={user.dob} disabled />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-md-4 col-form-label text-md-right" >University Email/Username</label>
                                                            <div className="col-md-6">
                                                                <input type="email" id="email" className="form-control" value={user.username} disabled />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-md-4 col-form-label text-md-right" >University ID</label>
                                                            <div className="col-md-6">
                                                                <input type="email" id="universityId" className="form-control" value={user.universityId} disabled />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-md-4 col-form-label text-md-right" >Mobile Number</label>
                                                            <div className="col-md-6">
                                                                <input type="tel" id="phoneNumber" className="form-control" value={user.mobileNo} disabled />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-md-4 col-form-label text-md-right" >Join Date</label>
                                                            <div className="col-md-6">
                                                                <input type="text" id="joinDate" className="form-control" value={user.userCreationTimestamp} disabled />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-md-4 col-form-label text-md-right" >Last Login Timestamp</label>
                                                            <div className="col-md-6">
                                                                <input type="text" id="lastLogin" className="form-control" value={user.lastLoginTimestamp} disabled />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-md-4 col-form-label text-md-right" >Status</label>
                                                            <div className="col-md-6">
                                                                <label className={user.isActive ? " badge bg-success rounded-pill" : "badge bg-danger rounded-pill"}>{user.isActive ? "Active" : "Not Active"}</label>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-md-4 col-form-label text-md-right" >Account Status</label>
                                                            <div className="col-md-6">
                                                                <label className={user.isNotLocked ? "  badge bg-success rounded-pill" : "  badge bg-danger rounded-pill"}>{user.isNotLocked ? "Not Blocked" : "Blocked"} </label>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <button className={user.isNotLocked ? "btn btn-outline-danger btn-sm" : "btn btn-outline-success btn-sm"} data-bs-toggle="modal" data-bs-target={"#cnfBlockModal" + user.id}>{user.isNotLocked ? "Block" : "Unblock"}</button>
                                                        </div>
                                                        <div className="form-group row">
                                                            <button className={user.role.includes("ROLE_ADMIN") ? "btn btn-outline-secondary btn-sm" : "btn btn-outline-primary btn-sm"} data-bs-toggle="modal" data-bs-target={"#roleModal" + user.id}>{user.role.includes("ROLE_ADMIN") ? "Change Role to USER" : "Change Role to ADMIN"}</button>
                                                        </div>
                                                        {user.isActive ? null : <div className="form-group row">
                                                            <button className='btn btn-outline-info btn-sm' onClick={handleSendActivationLink}>Send Activation Link</button>
                                                        </div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </main >
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade bd-example-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id={"cnfBlockModal" + user.id}>
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title">Are you sure to {user.isNotLocked ? "block" : "unblock"} {user.firstName}</h6>
                        </div>
                        <div className="modal-footer">
                            <button className={user.isNotLocked ? "btn btn-outline-danger btn-sm" : "btn btn-outline-success btn-sm"} onClick={handleBlockUser}>{user.isNotLocked ? "Block" : "Unblock"}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade bd-example-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id={"roleModal" + user.id}>
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title">Are you sure to assign <b>{user.role.includes("ROLE_ADMIN") ? "ROLE_USER" : "ROLE_ADMIN"}</b> to  {user.firstName}</h6>
                        </div>
                        <div className="modal-footer">
                            <button className={user.role.includes("ROLE_ADMIN") ? "btn btn-outline-secondary btn-sm" : "btn btn-outline-primary btn-sm"} onClick={toggleRole}>{user.role.includes("ROLE_ADMIN") ? "Change Role to USER" : "Change Role to ADMIN"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </tr>

    )
}
