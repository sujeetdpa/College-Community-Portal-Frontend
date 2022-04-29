import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import './Login.css'
import Navbar from '../components/Navbar'

export default function Login() {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate();
    const [btnDisable, setBtnDisable] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            navigate("/feeds");
        }
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        setBtnDisable(true);
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        }
        fetch(process.env.REACT_APP_BASE_URL + "/auth/login", options)
            .then(res => {
                if (!res.ok) {
                    throw res.json();
                }
                res.json().then(data => {
                    console.log(data);
                    localStorage.setItem("access_token", data.access_token);
                    localStorage.setItem("logged_in_user", JSON.stringify(data.userResponseView));
                    setBtnDisable(false);
                    navigate("/feeds");
                })
            }).catch(err => {
                err.then(data => {
                    console.log(data);
                    alert(data.message);
                    setBtnDisable(false);
                })
            })
    }
    return (
        <>
            <Navbar />
            <div className='login'>
                <main className="my-form">
                    <div className="cotainer">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="card">
                                    <div className="card-header">Login</div>
                                    <div className="card-body">
                                        <form name="my-form" onSubmit={handleSubmit}>
                                            <div className="form-group row">
                                                <label className="col-md-4 col-form-label text-md-right">E-Mail / Username</label>
                                                <div className="col-md-6">
                                                    <input type="text" id="username" className="form-control" onChange={e => { loginData.username = e.target.value }} />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-md-4 col-form-label text-md-right">Password</label>
                                                <div className="col-md-6">
                                                    <input type="password" id="password" className="form-control" onChange={e => { loginData.password = e.target.value }} />
                                                </div>
                                            </div>
                                            <div className="col-md-6 offset-md-4">
                                                <button type="submit" className="btn btn-primary" disabled={btnDisable}>
                                                    Login
                                                </button>
                                                <Link to="/resetPassword" className="btn btn-link">Forgot Your Password?</Link>
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
        </>
    )
}
