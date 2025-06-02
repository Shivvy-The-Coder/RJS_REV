import React, { useContext } from 'react'
import { GlobalContext } from '../Context';

const Text = () => {

    const {theme} = useContext(GlobalContext);
  return (
    <div>
        <h1 style={{
                    color:theme==='light'?"black":"white",
                    backgroundColor:theme==='light'?"":"black",
                    }}>
        Hello welcome to my Page</h1>
    </div>
  )
}

export default Text;
    