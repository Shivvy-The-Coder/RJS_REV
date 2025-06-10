import React from 'react'

const Signup = () => {
  return (
    <div>
            <div>
                <h2>Register</h2>
                <form action="">
                    <div>
                        <label htmlFor="email"> Name </label>
                        <input type="text" placeholder='Enter Name' autoComplete='off' name="email" id="" />
                    </div>
                    <div>
                        <label htmlFor="password"> Password </label>
                        <input type="password" placeholder='Enter Password'  name="password" id="" />
                    </div>
                    <button type='submit'>Register</button>
                </form>
                <p>Already have an account?</p>
                    
                    <Link to="/login">Login</Link>

            </div>
    </div>
  )
}

export default Signup;
