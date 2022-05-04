import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Feeds from './pages/Feeds';
import Protected from './components/Protected'
import AdminProtected from './components/AdminProtected'
import PostPage from './pages/PostPage';
import UserPage from './pages/UserPage';
import DashboardPage from './pages/DashboardPage'
import ChangePassword from './pages/ChangePassword'
import ImagePage from './pages/ImagePage'
import DocumentPage from './pages/DocumentPage'
import MyPostPage from './pages/MyPostPage';
import UsersPage from './pages/UsersPage';
import AddAdminPage from './pages/AddAdminPage';
import RemovedPostPage from './pages/RemovedPostPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import RemovedCommentPage from './pages/RemovedCommentPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SearchPage from './pages/SearchPage';
import Error from './pages/Error';

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <HashRouter>
    <div>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/resetPassword' element={<ForgotPasswordPage/>}/>

        <Route path='/feeds' element={<Protected Cmp={Feeds} />} />
        <Route path='/search' element={<Protected Cmp={SearchPage}/>}/>
        <Route path='/post/:postId' element={<Protected Cmp={PostPage} />} />
        <Route path='/user/:universityId/profile' element={<Protected Cmp={UserPage} />} />
        <Route path='/user/:universityId/myPosts' element={<Protected Cmp={MyPostPage} />} />
        <Route path='/user/:universityId/dashboard' element={<Protected Cmp={DashboardPage} />} />
        <Route path='/user/:universityId/changePassword' element={<Protected Cmp={ChangePassword} />} />
        <Route path='/user/:universityId/images' element={<Protected Cmp={ImagePage} />} />
        <Route path='/user/:universityId/documents' element={<Protected Cmp={DocumentPage} />} />



        <Route path='/admin/dashboard' element={<AdminProtected Cmp={AdminDashboardPage}/>}/>
        <Route path='/admin/users' element={<AdminProtected Cmp={UsersPage}/>}/>
        <Route path='/admin/add' element={<AdminProtected Cmp={AddAdminPage}/>}/>
        <Route path='/admin/deletedPosts' element={<AdminProtected Cmp={RemovedPostPage}/>}/>
        <Route path='/admin/deletedComments' element={<AdminProtected Cmp={RemovedCommentPage}/>}/>
        <Route path='*' element={<Error />}/>
      </Routes>
    </div>
  </HashRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
