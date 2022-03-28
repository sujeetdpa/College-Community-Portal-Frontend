
import React from 'react'
import './Register.css'

export default function Register() {
    const data={
        firstName:"",
        lastName:"",
        gender:"",
        email:"",
        password:"",
        phoneNumber:""
    }
    const handleSubmit= e=>{
        e.preventDefault();
        console.log(data);
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
                                                <input type="text" id="firstName" className="form-control"onChange={e=>{data=e.target.value}}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-4 col-form-label text-md-right">Last Name</label>
                                            <div className="col-md-6">
                                                <input type="text" id="lastName" className="form-control" onChange={e=>{data.lastName=e.target.value}}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-4 col-form-label text-md-right">Gender</label>
                                            <div className="col-md-6">
                                                <select className="form-control form-control-sm d-inline-block" aria-label="Default select example" id="gender" onChange={e=>{data.gender=e.target.value}}>
                                                    <option selected>Select..</option>
                                                    <option value="FEMALE">Female</option>
                                                    <option value="MALE">Male</option>
                                                    <option value="OTHER">Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-md-4 col-form-label text-md-right" >E-Mail</label>
                                            <div className="col-md-6">
                                                <input type="email" id="email" className="form-control" onChange={e=>{data.email=e.target.value}}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-md-4 col-form-label text-md-right" >Password</label>
                                            <div className="col-md-6">
                                                <input type="password" id="password" className="form-control" onChange={e=>{data.password=e.target.value}} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-4 col-form-label text-md-right">Confirm Password</label>
                                            <div className="col-md-6">
                                                <input type="password" id="cnfPassword" className="form-control"/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-md-4 col-form-label text-md-right" >Phone Number</label>
                                            <div className="col-md-6">
                                                <input type="text" id="phoneNumber" className="form-control" onChange={e=>{data.phoneNumber=e.target.value}}/>
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
