import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import UserSidebar from '../components/UserSidebar';

export default function ChangePassword() {
  const params = useParams();
  const navigate = useNavigate();
  const [btnDisable,setBtnDisable]=useState(false);
  const [changePasswordData, setChangePasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    cnfNewPassword: ""
  })
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("logged_in_user")));
  useEffect(() => {
    if (loggedInUser.universityId !== params.universityId) {
      alert("You dont't have the required permissions");
      navigate("/user/" + params.universityId + "/profile");
    }
  })
  const handleChangePassword = (e) => {
    e.preventDefault();
    setBtnDisable(true);
    const authHeader = "Bearer " + localStorage.getItem("access_token");
    let options = {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(changePasswordData)
    }
    const response = fetch(process.env.REACT_APP_BASE_URL + "/auth/update/password", options)
      .then(res => {
        if (!res.ok) {
          throw res.json();
        }
        res.text().then(data => {
          console.log(data);
          alert(data);
          setBtnDisable(false);
        })
      }).catch(err => {
        err.then(data => {
          console.log(data);
          alert(data.message);
          setBtnDisable(false)
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
                              <input type="password" id="curentPassword" className="form-control" onChange={e => { changePasswordData.currentPassword = e.target.value }} required/>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-md-4 col-form-label text-md-right" >New Password</label>
                            <div className="col-md-6">
                              <input type="password" id="newPassword" className="form-control" onChange={e => { changePasswordData.newPassword = e.target.value }} required/>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-md-4 col-form-label text-md-right">Confirm Password</label>
                            <div className="col-md-6">
                              <input type="password" id="cnfPassword" className="form-control" onChange={e => { changePasswordData.cnfNewPassword = e.target.value }} required/>
                            </div>
                          </div>
                          <div className="col-md-6 offset-md-4">
                            <button type="submit" className="btn btn-primary mx-3">
                              Change
                            </button>
                            <button type="reset" className="btn btn-secondary">
                              Clear
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
