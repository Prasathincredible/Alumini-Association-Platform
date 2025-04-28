import './App.css'
import React from 'react';
import SignUp from './Components/SignUp';
import LoginPage from './Components/LoginPage';
import ProfilePage from './Components/ProfilePage';
import {Routes, Route} from 'react-router-dom';
import AlumniDirectory from './Components/AluminiDirectory';
import UserProfile from './Components/UserProfile';
import Donate from './Components/Donate';
import RazorpayPayment from './Components/RazorpayPayment';
import AdminDashBoard from './Components/AdminDashBoard';
import AluminiDashBoard from './Components/AluminiDashBoard';
import PostJob from './Components/PostJob';
import { UserProvider } from './contexts/UserContext';
import ApplyJob from './Components/ApplyJobs';
import JobDetails from './Components/JobDetails';
import AppliedUsersList from './Components/AppliedUsersList';
import AlumniDetails from './Components/AluminiDetails';
import StudentSignUp from './Components/StudentSignUp';
import StudentDashBoard from './Components/StudentDashBoard';
import StudentProfile from './Components/StudentProfile';
import HomePage from './Components/HomePage';
import CreateEvent from './Components/CreateEvent';
import Chat from './Components/Chat';
import Networking from './Components/Networking';
import UploadDonation from './Components/UploadDonation';
import ThankYou from './Components/ThankYou';


function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/profile' element={<ProfilePage/>}></Route>
          <Route path='/profile/:userName' element={<UserProfile/>}></Route>
          <Route path='/aluminidirectory' element={<AlumniDirectory/>}></Route>
          <Route path="/donate" element={<Donate/>}></Route>
          <Route path="/razorpay" element={<RazorpayPayment/>}></Route>
          <Route path="/admin_dashboard" element={<AdminDashBoard />} />
          <Route path="/alumini_dashboard" element={<AluminiDashBoard/>} />
          <Route path="/postjob" element={<PostJob/>} />
          <Route path='/applyjob' element={<ApplyJob/>}/>
          <Route path='/job/:id' element={<JobDetails/>}/>
          <Route path='/job/:jobId/applied-users' element={<AppliedUsersList/>}></Route>
          <Route path='/alumni-details/:id' element={<AlumniDetails/>}></Route>
          <Route path='/student_signup' element={<StudentSignUp/>}></Route>
          <Route path='/student_dashboard' element={<StudentDashBoard/>}></Route>
          <Route path='/student_profile' element={<StudentProfile/>}></Route>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/create_event' element={<CreateEvent/>}></Route>
          <Route path='/chat/:receiverName' element={<Chat/>}></Route>
          <Route path="/networking" element={<Networking/>}></Route>
          <Route path='/upload_donation' element={<UploadDonation/>}></Route>
          <Route path='/thankyou' element={<ThankYou/>}></Route>
          
        </Routes>
        </UserProvider>
    </div>
  )
}

export default App
