import React from 'react'
import './Register.css'

export default function Register() {
    return (
        <div className='register'>
            <main className="my-form">
                <div className="cotainer">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Register</div>
                                <div className="card-body">
                                    <form name="my-form">
                                        <div className="form-group row">
                                            <label forName="full_name" className="col-md-4 col-form-label text-md-right">First Name</label>
                                            <div className="col-md-6">
                                                <input type="text" id="full_name" className="form-control" name="full-name" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label forName="full_name" className="col-md-4 col-form-label text-md-right">Last Name</label>
                                            <div className="col-md-6">
                                                <input type="text" id="full_name" className="form-control" name="full-name" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label forName="full_name" className="col-md-4 col-form-label text-md-right">Gender</label>
                                            <div className="col-md-6">
                                                <select className="form-control form-control-sm d-inline-block" aria-label="Default select example">
                                                    <option selected>Select..</option>
                                                    <option value="FEMALE">Female</option>
                                                    <option value="MALE">Male</option>
                                                    <option value="OTHER">Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label forName="email_address" className="col-md-4 col-form-label text-md-right">E-Mail</label>
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
                                        <div className="form-group row">
                                            <label forName="user_name" className="col-md-4 col-form-label text-md-right">Confirm Password</label>
                                            <div className="col-md-6">
                                                <input type="password" id="cnfPassword" className="form-control" name="username" />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label forName="phone_number" className="col-md-4 col-form-label text-md-right">Phone Number</label>
                                            <div className="col-md-6">
                                                <input type="text" id="phone_number" className="form-control" />
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
