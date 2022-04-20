import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import UserSidebar from '../components/UserSidebar';

export default function ChangePassword() {
  const params = useParams();

  const [changePasswordData, setChangePasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    cnfNewPassword: ""
  })
  const handleChangePassword = (e) => {
    e.preventDefault();
    const authHeader = "Bearer " + localStorage.getItem("access_token");
    let options = {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(changePasswordData)
    }
    const response = fetch("http://localhost:8080/auth/update/password", options)
    .then(res=>{
      if(!res.ok){
        throw res.json();
      }
      res.json().then(data=>{
        console.log(data);
      })
    }).catch(err=>{
      err.then(data=>{
        console.log(data);
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
            <h1 className="mt-4">Change Password</h1>
            <main className="my-form">
              <div className="cotainer">
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <div className="card">
                      <div className="card-body">
                        <form name="my-form" onSubmit={handleChangePassword}>
                          <div className="form-group row">
                            <label className="col-md-4 col-form-label text-md-right" >Current Password</label>
                            <div className="col-md-6">
                              <input type="password" id="curentPassword" className="form-control" onChange={e => { changePasswordData.currentPassword = e.target.value }} />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-md-4 col-form-label text-md-right" >New Password</label>
                            <div className="col-md-6">
                              <input type="password" id="newPassword" className="form-control" onChange={e => { changePasswordData.newPassword = e.target.value }} />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-md-4 col-form-label text-md-right">Confirm Password</label>
                            <div className="col-md-6">
                              <input type="password" id="cnfPassword" className="form-control" onChange={e => { changePasswordData.cnfNewPassword = e.target.value }} />
                            </div>
                          </div>
                          <div className="col-md-6 offset-md-4">
                            <button type="submit" className="btn btn-primary">
                              Change
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
  )
}
