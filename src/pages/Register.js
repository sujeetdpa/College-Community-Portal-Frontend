
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'
import { register } from '../api/UserApis'

export default function Register() {
    const navigate=useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("access_token")){
            navigate("/feeds");
        }
    },[])
    const data = {
        firstName: "",
        lastName: "",
        gender: "",
        username: "",
        password: "",
        cnfPassword: "",
        dob: "",
        mobileNo: ""
    }
    const [registerData,setRegisterData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        username: "",
        password: "",
        cnfPassword: "",
        dob: "",
        mobileNo: ""
    })
    const handleSubmit = e => {
        e.preventDefault();
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        }
        const response = fetch("http://localhost:8080/auth/signup", options);
        response.then(res => {
            if(!res.ok){
                throw res.json();
            }
            res.json().then(responseData => {
                console.log("APi response: ");
                console.log(responseData);
                alert("Registration Successfull: Please Login");
            })
        }).catch(err=>{
            err.then(data=>{
                console.log(data);
                alert(data.message);
            })
        })
    }
    return (
        <div className='register'>
            <main className="my-form">
                <div className="cotainer">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Register</div>
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
                                            <label className="col-md-4 col-form-label text-md-right">Gender</label>
                                            <div className="col-md-6">
                                                <select className="form-control form-control-sm d-inline-block" aria-label="Default select example" id="gender" onChange={e => { registerData.gender = e.target.value }}>
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
                                                <input type="date" id="dob" className="form-control" onChange={e => { registerData.dob = e.target.value }} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-4 col-form-label text-md-right" >University Email/Username</label>
                                            <div className="col-md-6">
                                                <input type="email" id="email" className="form-control" onChange={e => { registerData.username = e.target.value }} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-md-4 col-form-label text-md-right" >Password</label>
                                            <div className="col-md-6">
                                                <input type="password" id="password" className="form-control" onChange={e => { registerData.password = e.target.value }} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-4 col-form-label text-md-right">Confirm Password</label>
                                            <div className="col-md-6">
                                                <input type="password" id="cnfPassword" className="form-control" onChange={e => { registerData.cnfPassword = e.target.value }} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-md-4 col-form-label text-md-right" >Mobile Number</label>
                                            <div className="col-md-6">
                                                <input type="tel" id="phoneNumber" className="form-control" onChange={e => { registerData.mobileNo = e.target.value }} />
                                            </div>
                                        </div>


                                        <div className="col-md-6 offset-md-4">
                                            <button type="submit" className="btn btn-primary">
                                                Register
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
    )
}
