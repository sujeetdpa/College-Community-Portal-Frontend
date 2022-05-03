import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import './Register.css'

export default function AddAdminPage() {
  const [registerData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    gender: "",
    roles: []
  });
  const [roles, setRoles] = useState([]);
  const [btnDisable,setBtnDisable]=useState(false);

  useEffect(() => {
    const authHeader = "Bearer " + localStorage.getItem("access_token");
    const options = {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
      }
    }
    fetch(process.env.REACT_APP_BASE_URL + "/api/admin/roles", options)
      .then(res => {
        if (!res.ok) {
          throw res.json();
        }
        res.json().then(data => {
          setRoles(data);
        })
      }).catch(err => {
        err.then(data => {
          alert(data.message);
        })
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnDisable(true);
    const authHeader = "Bearer " + localStorage.getItem("access_token");
    const options = {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerData)
    }
    fetch(process.env.REACT_APP_BASE_URL + "/api/admin/add", options)
      .then(res => {
        if (!res.ok) {
          throw res.json();
        }
        res.json().then(data => {
          alert("User added successfully and an e-mail containing password is sent on "+data.username);
          setBtnDisable(false);
        })
      }).catch(err => {
        err.then(data => {
          alert(data.message);
          setBtnDisable(false);
        })
      })
  }
  return (
    <div>
      <Navbar />
      <div className='register'>
        <main className="my-form">
          <div className="cotainer">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">Add Admin</div>
                  <div className="card-body">
                    <form name="my-form" onSubmit={handleSubmit}>
                      <div className="form-group row">
                        <label className="col-md-4 col-form-label text-md-right">First Name</label>
                        <div className="col-md-6">
                          <input type="text" id="firstName" className="form-control" onChange={e => { registerData.firstName = e.target.value }} required/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-4 col-form-label text-md-right">Last Name</label>
                        <div className="col-md-6">
                          <input type="text" id="lastName" className="form-control" onChange={e => { registerData.lastName = e.target.value }} required/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-4 col-form-label text-md-right">Gender</label>
                        <div className="col-md-6">
                          <select className="form-control form-control-sm d-inline-block" aria-label="Default select example" id="gender" onChange={e => { registerData.gender = e.target.value }} required>
                            <option value="">Select..</option>
                            <option value="FEMALE">Female</option>
                            <option value="MALE">Male</option>
                            <option value="NOT_TO_MENTION">Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-4 col-form-label text-md-right" >University Email/Username</label>
                        <div className="col-md-6">
                          <input type="email" id="email" className="form-control" onChange={e => { registerData.username = e.target.value }} required/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-4 col-form-label text-md-right">Role</label>
                        <div className="col-md-6">
                          <select className="form-control form-control-sm d-inline-block" aria-label="Default select example" id="gender" onChange={e => { registerData.roles[0] = e.target.value }} required>
                            <option value="">Select..</option>
                            {roles.map(role => <option value={role.id} key={role.id}>{role.name}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6 offset-md-4">
                        <button type="submit" className="btn btn-primary mx-3" disabled={btnDisable}>
                          Add
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
      </div >
    </div>
  )
}
