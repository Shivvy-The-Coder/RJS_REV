import React, { useContext } from 'react'
import { assets } from '../assets/assets.js';
import { AppContext } from '../context/AppContext.jsx';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();
  const {userData} = useContext(AppContext);
  console.log(userData);

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-300'
    >
        <img src={assets.header} alt=""
             className='w-36 h-36 rounded-full mb-6' />
        <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2 '>
                      Hey {userData?userData.name : 'Scholar'}  
                <img className='w-8 aspect-square' 
                 src={assets.hand_wave} alt="" />
        </h1>
        <h2 className='text-3xl sm:text-5xl font-semibold mb-4 '
        >Welcome to out App</h2>
        <p className='mb-8 max-w-md  '>Welcome to SkillTracker! Track, improve, and master your personal skills one step at a time.</p>

        <button   onClick={handleGetStarted}
                 className='border border-gray-500 rounded-full px-8 py-2.5 text-gray-400  hover:bg-gray-100'>Get Started</button>
    </div>
  )
}

export default Header;
