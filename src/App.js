import { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  const [loggedInUser] = useState(JSON.parse(localStorage.getItem("logged_in_user")));
  return (
    <div className="App">
      <Navbar />
      <header className="py-5">
        <div className="container px-lg-5">
          <div className="p-4 p-lg-5 bg-light rounded-3 text-center">
            <div className="m-4 m-lg-5">
              <h1 className="display-5 fw-bold">A warm welcome {loggedInUser ? loggedInUser.fullName : null}!</h1>
              <div className="fs-4">
                {loggedInUser ?
                  <> 
                   Welcome back to <h3 className='fw-bold'>College Community Portal.</h3> A platform that lets you connect
                    to your college <strong className='fw-bold'> Friends, </strong> <strong className='fw-bold'> Alumni, </strong> <strong className='fw-bold'> Faculty, </strong>
                    <strong className='fw-bold'> Society </strong> and many more... from anywhere at anytime. 
                    <p className='mt-3'> <small>Let's continue your <span className='fw-bold'>Journey</span> with the following options.</small></p>
                    <div className='d-flex flex-row justify-content-around'>
                      <span ><Link className="btn btn-outline-primary btn-lg " to="/feeds"><h5 className='bi bi-rss'> Feeds</h5></Link></span>
                      <span ><Link className="btn btn-outline-primary btn-lg " to={"/user/" + loggedInUser.universityId + "/profile"}><h5 className='bi bi-gear'> Account</h5></Link></span>
                    </div>
                  </>
                  :
                  <>
                    Thanks for visiting to our <h3 className='fw-bold'>College Community Portal.</h3> A platform that lets you connect
                    to your college <strong className='fw-bold'> Friends, </strong> <strong className='fw-bold'> Alumni, </strong> <strong className='fw-bold'> Faculty, </strong>
                    <strong className='fw-bold'> Society </strong> and many more... from anywhere at anytime.
                    <p className='mt-3'> <small>Let's start your <span className='fw-bold'>Journey</span> with the following options.</small></p>
                    <div className='d-flex flex-row justify-content-around'>
                      <span ><Link className="btn btn-outline-primary btn-lg" to="/login"><h5 class="bi bi-box-arrow-in-right"> Login</h5></Link></span>
                      <span ><Link className="btn btn-outline-primary btn-lg " to="/register"><h5 class="bi bi-person-plus"> Join</h5></Link></span>
                    </div>
                  </>
                }
              </div>

            </div>
          </div>
        </div>
      </header>
      {/* <section className="pt-4">
        <div className="container px-lg-5">
          <div className="row gx-lg-5">
            <div className="col-lg-6 col-xxl-4 mb-5">
              <div className="card bg-light border-0 h-100">
                <div className="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                  <div className="feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4"><i className="bi bi-collection"></i></div>
                  <h2 className="fs-4 fw-bold">Fresh new layout</h2>
                  <p className="mb-0">With Bootstrap 5, we've created a fresh new layout for this template!</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xxl-4 mb-5">
              <div className="card bg-light border-0 h-100">
                <div className="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                  <div className="feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4"><i className="bi bi-bootstrap"></i></div>
                  <h2 className="fs-4 fw-bold">Feature boxes</h2>
                  <p className="mb-0">We've created some custom feature boxes using Bootstrap icons!</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xxl-4 mb-5">
              <div className="card bg-light border-0 h-100">
                <div className="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                  <div className="feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4"><i className="bi bi-code"></i></div>
                  <h2 className="fs-4 fw-bold">Simple clean code</h2>
                  <p className="mb-0">We keep our dependencies up to date and squash bugs as they come!</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xxl-4 mb-5">
              <div className="card bg-light border-0 h-100">
                <div className="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                  <div className="feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4"><i className="bi bi-patch-check"></i></div>
                  <h2 className="fs-4 fw-bold">A name you trust</h2>
                  <p className="mb-0">Start Bootstrap has been the leader in free Bootstrap templates since 2013!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <footer className="py-5 bg-dark">
        <div className="container"><p className="m-0 text-center text-white">Copyright &copy; Your Website 2022</p></div>
      </footer>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    </div>
  );
}

export default App;
