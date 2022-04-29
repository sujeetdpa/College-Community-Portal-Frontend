import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import './Login.css'
import {Link , useNavigate} from 'react-router-dom'

export default function ForgotPasswordPage() {
    const [resetData,setResetData]=useState({
        username:"",
        dob:""
    });
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            navigate("/feeds");
        }
    }, [])
    const handleSubmit=(e)=>{
        e.preventDefault();
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(resetData)
        }
        fetch(process.env.REACT_APP_BASE_URL+"/auth/forgot/password", options)
        .then(res=>{
            if(!res.ok){
                throw res.json();
            }
            res.text().then(data=>{
                console.log(data);
                alert(data);
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
        <Navbar/>
        <div className='login'>
                <main className="my-form">
                    <div className="cotainer">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="card">
                                    <div className="card-header">Reset Password</div>
                                    <div className="card-body">
                                        <form name="my-form" onSubmit={handleSubmit}>
                                            <div className="form-group row">
                                                <label className="col-md-4 col-form-label text-md-right">E-Mail / Username</label>
                                                <div className="col-md-6">
                                                    <input type="text" id="username" className="form-control" onChange={e => { resetData.username = e.target.value }} />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-md-4 col-form-label text-md-right">Date of Borth</label>
                                                <div className="col-md-6">
                                                    <input type="date" id="password" className="form-control" onChange={e => { resetData.dob = e.target.value }} />
                                                </div>
                                            </div>
                                            <div className="col-md-6 offset-md-4">
                                                <button type="submit" className="btn btn-primary">
                                                   Send
                                                </button>
                                                <Link to="/login" className="btn btn-link">Click to Login</Link>
                                            </div>
                                        </form>
                                        <div className="col-md-6 offset-md-4 py-4">
                                            Don't have account please <Link to="/register">Join</Link>
                                        </div>
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
