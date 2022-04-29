import React from 'react'
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './UserPage.css';
import UserSidebar from '../components/UserSidebar'

export default function UserPage() {
  const params = useParams();
  const [loggedInUser, setLoggedInUser] = useState({});
  const [profileImageId, setProfileImageId] = useState();
  const [btnDisable, setBtnDisable] = useState(false);
  const [inpDisable, setInpDisable] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    firstName: "",
    lastName: "",
    id: "",
    gender: "",
    username: "",
    universityId: "",
    userCreationTimestamp: "",
    dob: "",
    lastLoginTimestamp: "",
    mobileNo: "",
    profileImageId: ""
  });

  useEffect(() => {
    setLoggedInUser(JSON.parse(localStorage.getItem("logged_in_user")));
  }, [])
  useEffect(() => {
    async function fetchUser() {
      const authHeader = "Bearer " + localStorage.getItem("access_token");
      const options = {
        method: 'GET',
        headers: {
          'Authorization': authHeader
        },
      }
      const response = await fetch(process.env.REACT_APP_BASE_URL + "/api/user/" + params.universityId, options);
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    }
    fetchUser().then(data => {
      setProfileImageId(data.profileImageId)
      setUserData(data);
      console.log((data));
    }).catch(err => {
      err.then(data => {
        console.log(data);
        alert(data.message);
      })
    })
  }, [params.universityId])

  const handleUpdateUser = (e) => {
    e.preventDefault();
    setBtnDisable(true);
    const authHeader = "Bearer " + localStorage.getItem("access_token");
    const options = {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }
    fetch(process.env.REACT_APP_BASE_URL + "/api/user/update/" + userData.id, options)
      .then(res => {
        if (!res.ok) {
          throw res.json();
        }
        res.json().then(data => {
          console.log("Updated user: ", data);
          alert("Updated Successfully");
          setBtnDisable(false);
          setUserData(data);

        })
      }).catch(err => {
        err.then(data => {
          alert(data.message);
          setBtnDisable(false);
        })
      })
  }
  const updateImage = (e) => {
    inpDisable(true);
    const profileImage = e.target.files;
    console.log("profile image: ", profileImage);
    if (profileImage.length > 0) {
      const authHeader = "Bearer " + localStorage.getItem("access_token");
      let formData = new FormData();
      formData.append("profileImage", profileImage[0]);
      const options = {
        method: 'POST',
        headers: {
          'Authorization': authHeader
        },
        body: formData
      }
      const response = fetch(process.env.REACT_APP_BASE_URL + "/api/user/update/profileImage", options);
      response.then(res => {
        if (!res.ok) {
          throw res.json();
        }
        res.json().then(data => {
          console.log(data);
          setProfileImageId(data);
          setInpDisable(false);
        })
      }).catch(err => {
        err.then(data => {
          console.log(data);
          alert(data.message);
          setInpDisable(false);
        })
      })
    }
  }
  return (
    <div>
      <Navbar />
      <div className="d-flex container pt-2" id="wrapper">
        {loggedInUser.id === userData.id ? <UserSidebar universityId={params.universityId} /> : null}
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <div>
              <main className="my-form">
                <div className="cotainer">
                  <div className="row justify-content-center">
                    <div className="col-md-8">
                      <div className="card">
                        <div className="card-body">
                          <div name="my-form">
                            <div className="d-flex justify-content-between p-2 px-3">
                              <div className="d-flex flex-row align-items-center">
                                <img src={(profileImageId !== null && profileImageId !== undefined) ? process.env.REACT_APP_BASE_URL + "/api/post/local/storage/download/image/" + profileImageId : "https://robohash.org/" + userData.userId} width="100" className="rounded-circle" alt='Profile' />
                                <div className="d-flex flex-column ml-2"> <h3 className="font-weight-bold">{userData.fullName}</h3> <small className="text-primary">{userData.role}</small> </div>
                              </div>
                              {loggedInUser.id === userData.id ?
                                <div className="d-flex flex-row mt-1 ellipsis">
                                  <small className="mr-2">
                                    <label htmlFor="apply" className='' ><input type="file" name="" id='apply' accept="image/*" onChange={e => updateImage(e)} disabled={inpDisable} /><i className="bi bi-images"></i></label>
                                  </small>
                                </div>
                                : null}
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
                                <input type="text" id="firstName" className="form-control" value={userData.firstName} disabled />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-4 col-form-label text-md-right">Last Name</label>
                              <div className="col-md-6">
                                <input type="text" id="lastName" className="form-control" value={userData.lastName} disabled />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-4 col-form-label text-md-right">Gender</label>
                              <div className="col-md-6">
                                <input type="text" id="gender" className="form-control" value={userData.gender} disabled />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-4 col-form-label text-md-right">Date of Birth</label>
                              <div className="col-md-6">
                                <input type="text" id="dob" className="form-control" value={userData.dob} disabled />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-4 col-form-label text-md-right" >University Email/Username</label>
                              <div className="col-md-6">
                                <input type="email" id="email" className="form-control" value={userData.username} disabled />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-4 col-form-label text-md-right" >University ID</label>
                              <div className="col-md-6">
                                <input type="email" id="universityId" className="form-control" value={userData.universityId} disabled />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-4 col-form-label text-md-right" >Mobile Number</label>
                              <div className="col-md-6">
                                <input type="tel" id="phoneNumber" className="form-control" value={userData.mobileNo} disabled />
                              </div>
                            </div>
                            {loggedInUser.id === userData.id ? <>
                              <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right" >Join Date</label>
                                <div className="col-md-6">
                                  <input type="text" id="joinDate" className="form-control" value={userData.userCreationTimestamp} disabled />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right" >Last Login Timestamp</label>
                                <div className="col-md-6">
                                  <input type="text" id="lastLogin" className="form-control" value={userData.lastLoginTimestamp} disabled />
                                </div>
                              </div>
                              <div className="col-md-6 offset-md-4">
                                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                  Edit
                                </button>
                              </div>
                            </> : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main >
              <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Edit Details.</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form name="my-form" onSubmit={handleUpdateUser}>
                        <div className="form-group row pb-2">
                          <label className="col-md-4 col-form-label text-md-right">First Name</label>
                          <div className="col-md-6">
                            <input type="text" id="firstName" className="form-control" defaultValue={userData.firstName} onChange={e => { userData.firstName = e.target.value }} />
                          </div>
                        </div>
                        <div className="form-group row pb-2">
                          <label className="col-md-4 col-form-label text-md-right">Last Name</label>
                          <div className="col-md-6">
                            <input type="text" id="lastName" className="form-control" defaultValue={userData.lastName} onChange={e => { userData.lastName = e.target.value }} />
                          </div>
                        </div>
                        <div className="form-group row pb-2">
                          <label className="col-md-4 col-form-label text-md-right">Gender</label>
                          <div className="col-md-6">
                            <select className="form-control form-control-sm d-inline-block" aria-label="Default select example" id="gender" defaultValue={userData.gender} onChange={e => { userData.gender = e.target.value }}>
                              <option value="Select.." disabled>Select..</option>
                              <option value="FEMALE">Female</option>
                              <option value="MALE">Male</option>
                              <option value="NOT_TO_MENTION">Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-group row pb-2">
                          <label className="col-md-4 col-form-label text-md-right">Date of Birth</label>
                          <div className="col-md-6">
                            <input type="date" id="dob" className="form-control" defaultValue={userData.dob} onChange={e => { userData.dob = e.target.value }} />
                          </div>
                        </div>
                        <div className="form-group row pb-2">
                          <label className="col-md-4 col-form-label text-md-right" >Mobile Number</label>
                          <div className="col-md-6">
                            <input type="tel" id="phoneNumber" className="form-control" defaultValue={userData.mobileNo} onChange={e => { userData.mobileNo = e.target.value }} />
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="submit" className="btn btn-primary" disabled={btnDisable}>Save changes</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
