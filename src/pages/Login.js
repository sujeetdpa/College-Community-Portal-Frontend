import React from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import './Login.css'

export default function Login() {
    const data={
        username:'',
        password:''
    }
    const navigate=useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("access_token")){
            navigate("/feeds");
        }
    },[])
    const handleSubmit= (e)=>{
        e.preventDefault();
        let options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }
          let response = fetch("http://localhost:8080/auth/login", options);
          response.then((res) => {
            res.json().then(data => {
              console.log(data);
              localStorage.setItem("access_token", data.access_token);
              localStorage.setItem("refresh_token", data.refresh_token);
              navigate("/feeds");
            })
          })
    }
    return (
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
                                                <input type="text" id="username" className="form-control" onChange={e=>{data.username=e.target.value}} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-md-4 col-form-label text-md-right">Password</label>
                                            <div className="col-md-6">
                                                <input type="password" id="password" className="form-control"  onChange={e=>{data.password=e.target.value}} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 offset-md-4">
                                            <button type="submit" className="btn btn-primary">
                                                Login
                                            </button>
                                            <Link to="" className="btn btn-link">Forgot Your Password?</Link>
                                        </div>
                                    </form>
                                    <div className="col-md-6 offset-md-4 py-4">
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
