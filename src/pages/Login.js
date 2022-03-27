import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

export default function Login() {
    return (
        <div className='login'>
            <main className="my-form">
                <div className="cotainer">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Login</div>
                                <div className="card-body">
                                    <form name="my-form">
                                        <div className="form-group row">
                                            <label forName="email_address" className="col-md-4 col-form-label text-md-right">E-Mail / Username</label>
                                            <div className="col-md-6">
                                                <input type="text" id="email_address" className="form-control" name="email-address" />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label forName="user_name" className="col-md-4 col-form-label text-md-right">Password</label>
                                            <div className="col-md-6">
                                                <input type="password" id="password" className="form-control" name="username" />
                                            </div>
                                        </div>
                                        <div class="col-md-6 offset-md-4">
                                            <button type="submit" class="btn btn-primary">
                                                Login
                                            </button>
                                            <a href="" class="btn btn-link">Forgot Your Password?</a>
                                        </div>
                                    </form>
                                    <div class="col-md-6 offset-md-4 py-4">
                                            Don't have account please <Link to="/register">Register</Link>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main >
        </div >
    )
}
