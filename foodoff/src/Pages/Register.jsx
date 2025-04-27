import React, { use, useState } from 'react'
import axios from 'axios'
import Login from './Login'
import { loginAPI, registerAPI } from '../local/api';
import Switch from 'rc-switch';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';

export default function Register({ register }) {
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

        navigate('/login')
      } else if (result.status == 406) {
        toast.warning(result.response.data)
      } else {
        toast.warning(`Somthing went wrong`)
      }
    }

  }

  const handleLogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {
      alert(`Please fill the form`)
    } else {
      // api
      const result = await loginAPI({ email, password })
      console.log(result);

    }
  }
  return (
    <>
      <div className='bg'>


        <div className="container mt-4">
          <div className="row mt-4">
            <div className="col-md-4"></div>
            <div className="col-md-6 border-white rounded  mt-4">
              <h3 className='text-black text-center'>Register</h3>

            </div>

          </div>
        </div>
      </div>


      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-1"></div>
          <div className="col-md-4">
            <h2 className="text-center mb-4 text-dark">Create Your Account</h2>

            <form >
              <div>
                <input required type="text" placeholder='name' value={userDetails.username} onChange={(e) => setUserdetails({ ...userDetails, username: e.target.value })} className='form-control mb-3 rounded-pill p-2' />
                <input required type="text" placeholder='email' value={userDetails.email} onChange={(e) => setUserdetails({ ...userDetails, email: e.target.value })} className='form-control mb-3 rounded-pill p-2 ' />
                <input required type="password" placeholder='password' value={userDetails.password} onChange={(e) => setUserdetails({ ...userDetails, password: e.target.value })} className='form-control mb-3 rounded-pill p-2 ' />
              </div>
              {!register ? <div>
                <button onClick={handleRegister} type='button' className=' w-100 btn btn-danger  w-100 rounded-pill'>Register</button>
              </div>
                :
                <div>
                  <button onClick={handleLogin} type='button' className='btn btn-danger '>Login</button>

                </div>}

            </form>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-6">
            <img src="https://static.vecteezy.com/system/resources/previews/025/002/359/original/cute-cartoon-female-chef-character-on-transparent-background-generative-ai-png.png" alt="" className="img-fluid rounded"
              style={{ maxHeight: '70vh', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5001}
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
