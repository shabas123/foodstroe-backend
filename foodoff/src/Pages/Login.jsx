import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../local/api';
import { Bounce, toast, ToastContainer } from 'react-toastify';
export default function Login() {
  const navigate = useNavigate()
  const [userDetails, setUserdetails] = useState({
    username: "",
    email: "",
    password: ""

  })
  console.log(userDetails);

  const handleRegister = async () => {
    const { username, email, password } = userDetails
    if (!username || !email || !password) {
      toast.info(`Please fill the form`)
    } else {
      // api call
      const result = await registerAPI(userDetails)
      console.log(result);
      if (result.status == 200) {
        toast.success(`Registred successfully`)
        setUserdetails({
          username: "",
          email: "",
          password: ""

        })
        setTimeout(() => {
          navigate('/')

        }, 2000)
        navigate('/login')
      } else if (result.status == 406) {
        alert(result.response.data)
      } else {
        toast.wrong(`Somthing went wrong`)
      }
    }

  }

  const handleLogin = async () => {
    const {  email, password } = userDetails
    if (!email || !password) {
      toast.info(`Please fill the form`)
    } else {
      // api
      const result = await loginAPI({ email, password })
      console.log(result);
      if (result.status === 200) {
        toast.success(`Successfully Logged`)
        const userData = result.data; 
        const { isAdmin } = userData;        
        sessionStorage.setItem('loggedInUser', JSON.stringify(userData.username));
        sessionStorage.setItem("currentUser", JSON.stringify(userData));
        window.dispatchEvent(new Event("userLoginChange")); 
        setUserdetails({
          username: "",
          email: "",
          password: ""
        });

        if (isAdmin){
          navigate('/admin/itemlist')
        } else {
        navigate('/');
        
        }
      } else  
        (result.status == 405); {
          toast.warning(`Wrong details`)
        }
      
    }
  }
  return (
    <>
 <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-1"></div>
          <div className="col-md-4">
            <h2 className="text-center mb-4 text-dark">Welcome Back!</h2>            <div>
              <input required type="text" placeholder='Email' value={userDetails.email} onChange={(e) => setUserdetails({ ...userDetails, email: e.target.value })} className='form-control mb-3 rounded-pill p-2 "' />
              <input required type="password" placeholder='Password' value={userDetails.password} onChange={(e) => setUserdetails({ ...userDetails, password: e.target.value })} className='form-control mb-3 rounded-pill p-2 ' />
            </div>
            <button onClick={handleLogin} type='button' className='btn btn-danger w-100 rounded-pill py-2 fw-bold shadow'>Login</button>
            <a href="./register"> <h6 className=' text-center text-decoration-none text-primary  mt-2 fw-bold'>Click Here to Register</h6></a>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-6">
            <img src="https://static.vecteezy.com/system/resources/previews/036/110/056/non_2x/ai-generated-cartoon-chef-man-free-png.png" alt="" className="img-fluid rounded"
              style={{ maxHeight: '90vh', objectFit: 'cover' }} />
          </div>
        </div>
      </div>




      <ToastContainer
        position="top-center"
        autoClose={4001}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

    </>
  )
}
