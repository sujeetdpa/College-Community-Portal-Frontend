import React from 'react'
import { useState ,useEffect} from 'react'
import Navbar from '../components/Navbar'
import './Register.css'

export default function AddAdminPage() {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    roles: []
  })
  const [roles,setRoles]=useState([]);
  useEffect(()=>{
    const authHeader = "Bearer " + localStorage.getItem("access_token");
    const options = {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
      }
    }
    const response = fetch("http://localhost:8080/api/admin/roles", options)
    .then(res=>{
      if(!res.ok){
        throw res.json();
      }
      res.json().then(data=>{
       setRoles(data);
        console.log("roles: ",roles);
      })
    }).catch(err=>{
      err.then(data=>{
        console.log(data);
        alert(data.message);
      })
    })
  },[])
  const handleSubmit = (e) => {
    e.preventDefault();
    const authHeader = "Bearer " + localStorage.getItem("access_token");
    const options = {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerData)
    }
    const response = fetch("http://localhost:8080/api/admin/add", options)
    .then(res=>{
      if(!res.ok){
        throw res.json();
      }
      res.json().then(data=>{
        console.log(data);
        alert("User added successfully and an e-mail containing password is sent on the username");
      })
    }).catch(err=>{
      err.then(data=>{
        console.log(data.message);
        alert(data.message);
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
                          <input type="text" id="firstName" className="form-control" onChange={e => { registerData.firstName = e.target.value }} />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-4 col-form-label text-md-right">Last Name</label>
                        <div className="col-md-6">
                          <input type="text" id="lastName" className="form-control" onChange={e => { registerData.lastName = e.target.value }} />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-4 col-form-label text-md-right" >University Email/Username</label>
                        <div className="col-md-6">
                          <input type="email" id="email" className="form-control" onChange={e => { registerData.username = e.target.value }} />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-4 col-form-label text-md-right">Role</label>
                        <div className="col-md-6">
                          <select className="form-control form-control-sm d-inline-block" aria-label="Default select example" id="gender" onChange={e => { registerData.roles[0] = e.target.value }}>
                            <option disabled>Role.</option>
                            {roles.map(role=> <option value={role.id} key={role.id}>{role.name}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6 offset-md-4">
                        <button type="submit" className="btn btn-primary mx-3">
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
