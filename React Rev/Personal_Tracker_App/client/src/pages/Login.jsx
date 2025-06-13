import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from "axios";
import { toast } from 'react-toastify';

const Login = () => {

  
  const navigate=useNavigate();
  const {backendUrl,setIsLoggedin , getUserData} = useContext(AppContext);
  // console.log(backendUrl);

  // this sill be used to mantain te state betwen user sign up and login
  const [state , setState]  = useState('Sign Up');
  const [name    ,setName]  = useState('');
  const [email   ,setEmail] = useState('');
  const [password,setPassword] =useState('');

  // handleSubmitFunction
  const onSubmitHandler=async(e)=>{
      try
      {
          e.preventDefault();
          
          axios.defaults.withCredentials=true
          
          if(state==="Sign Up")
            {
                const {data} = await axios.post(backendUrl+'/api/auth/register',{name,email,password})
                  if(data.success)
                  {
                    setIsLoggedin(true)
                    getUserData()
                    navigate('/')
                  }
                  else{toast.error(data.message)
                    }
            }
            else
              {
                        const {data} = await axios.post(backendUrl+'/api/auth/login',{email,password})
                    if(data.success)
                    {
                      setIsLoggedin(true)
                      getUserData()
                      navigate('/')
                    }
                    else{toast.error(data.message)
                      }
              }
          }
      catch (error) {
      toast.error(error.message);
    }

    }

  return (
      <div className='flex items-center  justify-center min-h-screen sm:px-0 bg-linear-to-bl from-violet-500 to-fuchsia-500'>
        <img 
              onClick={()=>navigate('/')}
              src={assets.logo} alt="" 
             className='absolute left-5 sm:left-20 top-5 w-15 sm:w-15 cursor-pointer'/>
             <div className='bg-slate-900 p-10 rounded-lg shadow-lg  w-auto mx-2 sm:w-min text-indigo-400 text-sm'>
              <h2 className='text-3xl font-semibold text-white text-center mb-3 '>
              {state=="Sign Up"?" Create  Account ":" Login "}
              </h2>
              <p  className='text-center text-sm mb-6'
                  >{state=="Sign Up"?" Create Your Account ":" Login to Your Account "
              }</p>

              <form onSubmit={onSubmitHandler}>
                {state === "Sign Up" && (<div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                  <img src={assets.person_icon} alt="" />
                  <input  
                          onChange={e=>setName(e.target.value)} value={name}
                          type="text" placeholder='Full Name' required name="" id="" 
                          className='bg-transparent outline-none text-gray-300'/>
                </div>)}  


                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                  <img src={assets.mail_icon} alt="" />
                  <input  
                          onChange={e=>setEmail(e.target.value)} value={email}
                          type="email" placeholder='Email Id' required name="" 
                          className='bg-transparent outline-none text-gray-300'/>
                </div>

                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                  <img src={assets.lock_icon} alt="" />
                  <input 
                          onChange={e=>setPassword(e.target.value)} value={password}
                          type="password" placeholder='Password' required name=""  
                          className='bg-transparent outline-none text-gray-300'/>
                </div>


                <p    
                       onClick={()=>navigate('/reset-password')}
                      className='mb-4 text-indigo-500 cursor-pointer'>Forgot password ?</p>
                      
                <button  className='w-full py-2.5 rounded-full  bg-linear-65 from-purple-500 to-pink-500 text-white cursor-pointer font-medium'>{state}</button>
              </form>
              
                {state==="Sign Up"?(
                  <p className='text-gray-400 text-center text-xs mt-4'>Already have an account? 
                  <span onClick={()=>{setState('Login')}} className='pl-1 text-blue-400 cursor-pointer underline'> Login here</span></p>
                
                ):(
                      <p className='text-gray-400 text-center text-xs mt-4'>Don't have an account? 
                  <span onClick={()=>{setState('Sign Up')}} className='pl-1 text-blue-400 cursor-pointer underline'> Sign Up here</span></p>
            
                )}
                
            
             </div>
      </div>
  )
}

export default Login;
