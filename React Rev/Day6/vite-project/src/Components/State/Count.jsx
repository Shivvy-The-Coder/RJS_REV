import React, { useEffect, useState } from 'react'

const Count = () => {
    const [count , setCount] = useState(0);  
    function Add1()
    {
        setCount(count+1);
    }
    function sub1()
    {
        setCount(count-1);
    }

    useEffect(()=>{
        setCount(-1)
    },[])
    return (
    <>
        <h1>Hello</h1>
        {count}
        <button onClick={Add1}>Add</button>
        <button onClick={sub1}>Sub</button>
    </>
  )
}

export default Count;
