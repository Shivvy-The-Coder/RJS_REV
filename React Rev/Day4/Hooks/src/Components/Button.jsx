import React, { useContext } from 'react'
import { GlobalContext } from '../Context'

const Button = () => {
    
const  {setTheme,theme} = useContext(GlobalContext)
    function handleClick()
        {
            setTheme(theme=='light'?'dark':'light');
        }

    return (  
    <div>
        <button onClick={handleClick}>Change Theme</button>
    </div>
        )
}

export default Button;
