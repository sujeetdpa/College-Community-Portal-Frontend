import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import UserSidebar from '../components/UserSidebar';

export default function ChangePassword() {
  const params = useParams();
  const navigate = useNavigate();
  const [btnDisable, setBtnDisable] = useState(false);
  const [changePasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    cnfNewPassword: ""
  })
  const [loggedInUser] = useState(JSON.parse(localStorage.getItem("logged_in_user")));
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
    fetch(process.env.REACT_APP_BASE_URL + "/auth/update/password", options)
      .then(res => {
        if (!res.ok) {
          throw res.json();
        }
        res.text().then(data => {
          alert(data);
          setBtnDisable(false);
        })
      }).catch(err => {
        err.then(data => {
          alert(data.message);
          setBtnDisable(false)
        })
      })
  }
  return (
    <div>
      <Navbar />
      <div className="container d-flex flex-row">
        <UserSidebar universityId={params.universityId} />
        <div class="col-md-9">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <h1 className="mt-4">Change Password</h1>
                  <main className="my-form">
                    <div className="cotainer">
                      <div className="row justify-content-center">
                        <form name="my-form" onSubmit={handleChangePassword}>
                          <div className="form-group row">
                            <label className="col-md-4 col-form-label text-md-right" >Current Password</label>
                            <div className="col-md-6">
                              <input type="password" id="curentPassword" className="form-control" onChange={e => { changePasswordData.currentPassword = e.target.value }} required />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-md-4 col-form-label text-md-right" >New Password</label>
                            <div className="col-md-6">
                              <input type="password" id="newPassword" className="form-control" onChange={e => { changePasswordData.newPassword = e.target.value }} required />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-md-4 col-form-label text-md-right">Confirm Password</label>
                            <div className="col-md-6">
                              <input type="password" id="cnfPassword" className="form-control" onChange={e => { changePasswordData.cnfNewPassword = e.target.value }} required />
                            </div>
                          </div>
                          <div className="col-md-6 offset-md-4">
                            <button type="submit" className="btn btn-primary mx-3" disabled={btnDisable}>
                              Change
                            </button>
                            <button type="reset" className="btn btn-secondary">
                              Clear
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </main >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
