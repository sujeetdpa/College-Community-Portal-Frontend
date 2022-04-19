import React from 'react'
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './UserPage.css';
import UserSidebar from '../components/UserSidebar'

export default function UserPage() {
  const params = useParams();
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
  const [updateData, setUpdateData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    mobileNo: ""
  });
  useEffect(() => {
    async function fetchUser() {
      const authHeader = "Bearer " + localStorage.getItem("access_token");
      const options = {
        method: 'GET',
        headers: {
          'Authorization': authHeader
        },
      }
      const response = await fetch("http://localhost:8080/api/user/" + params.universityId, options);
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    }
    fetchUser().then(data => {
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
    const authHeader = "Bearer " + localStorage.getItem("access_token");

    const options = {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }
    fetch("http://localhost:8080/api/user/update/" + userData.id, options)
      .then(res => {
        if (!res.ok) {
          throw res.json();
        }
        res.json().then(data => {
          console.log("Updated user: ", data);
          alert("Updated Successfully");
          setUserData(data);
        })
      }).catch(err => {
        err.then(data => {
          alert(data.message);
        })
      })
  }
  return (
    <div>
      <Navbar />
      <div className="d-flex container pt-2" id="wrapper">
        <UserSidebar universityId={params.universityId} />
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <h1 className="mt-4">Profile Info.</h1>
            <div>
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
                              <label className="col-md-4 col-form-label text-md-right" >University Roll No.</label>
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main >
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Edit Details.</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <form name="my-form" onSubmit={handleUpdateUser}>
                        <div className="form-group row">
                          <label className="col-md-4 col-form-label text-md-right">First Name</label>
                          <div className="col-md-6">
                            <input type="text" id="firstName" className="form-control" defaultValue={userData.firstName} onChange={e => { userData.firstName = e.target.value }} />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-md-4 col-form-label text-md-right">Last Name</label>
                          <div className="col-md-6">
                            <input type="text" id="lastName" className="form-control" defaultValue={userData.lastName} onChange={e => { userData.lastName = e.target.value }} />
                          </div>
                        </div>
                        <div className="form-group row">
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
                        <div className="form-group row">
                          <label className="col-md-4 col-form-label text-md-right">Date of Birth</label>
                          <div className="col-md-6">
                            <input type="date" id="dob" className="form-control" defaultValue={userData.dob} onChange={e => { userData.dob = e.target.value }} />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-md-4 col-form-label text-md-right" >Mobile Number</label>
                          <div className="col-md-6">
                            <input type="tel" id="phoneNumber" className="form-control" defaultValue={userData.mobileNo} onChange={e => { userData.mobileNo = e.target.value }} />
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="submit" class="btn btn-primary">Save changes</button>
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
