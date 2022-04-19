import React from 'react'
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './UserPage.css';
import UserSidebar from '../components/UserSidebar'

export default function UserPage() {
  const params = useParams();
  const [userData, setUserData] = useState({
    // fullName: "",
    // firstName: "",
    // lastName: "",
    // id: "",
    // gender: "",
    // username: "",
    // universityId: "",
    // userCreationTimestamp: "",
    // dob: "",
    // lastLoginTimestamp: "",
    // mobileNo: "",
    // profileImageId: ""
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
  return (
    <div>
      <Navbar />
      <div className="d-flex container pt-2" id="wrapper">
        <UserSidebar universityId={params.universityId}/>
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
                          <form name="my-form">
                            <div className="form-group row">
                              <label className="col-md-4 col-form-label text-md-right">First Name</label>
                              <div className="col-md-6">
                                <input type="text" id="firstName" className="form-control" value={userData.firstName} disabled/>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-4 col-form-label text-md-right">Last Name</label>
                              <div className="col-md-6">
                                <input type="text" id="lastName" className="form-control" value={userData.lastName} disabled/>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-4 col-form-label text-md-right">Gender</label>
                              <div className="col-md-6">
                                <input type="text" id="gender" className="form-control" value={userData.gender} disabled/>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-4 col-form-label text-md-right">Date of Birth</label>
                              <div className="col-md-6">
                                <input type="text" id="dob" className="form-control" value={userData.dob} disabled/>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-4 col-form-label text-md-right" >University Email/Username</label>
                              <div className="col-md-6">
                                <input type="email" id="email" className="form-control" value={userData.username} disabled/>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-4 col-form-label text-md-right" >University Roll No.</label>
                              <div className="col-md-6">
                                <input type="email" id="universityId" className="form-control" value={userData.universityId} disabled/>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-4 col-form-label text-md-right" >Mobile Number</label>
                              <div className="col-md-6">
                                <input type="tel" id="phoneNumber" className="form-control" value={userData.mobileNo} disabled/>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-4 col-form-label text-md-right" >Join Date</label>
                              <div className="col-md-6">
                                <input type="text" id="joinDate" className="form-control" value={userData.userCreationTimestamp} disabled/>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-4 col-form-label text-md-right" >Last Login Timestamp</label>
                              <div className="col-md-6">
                                <input type="text" id="lastLogin" className="form-control" value={userData.lastLoginTimestamp} disabled/>
                              </div>
                            </div>
                            <div className="col-md-6 offset-md-4">
                              <button className="btn btn-primary">
                                Edit
                              </button>
                            </div>
                          </form>

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
    </div>
  )
}
