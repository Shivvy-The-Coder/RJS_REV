import { useEffect, useState } from 'react'

const Count = () => {

    const [count,setCount]=useState(0);
    const [Style,changeStyle] = useState(false);
    function Add1()
    {   
        count<10?setCount(count+1):""
    }
    function Minus1()
    {
        count>0?
        setCount(count-1):'0'
    }

    useEffect(()=>{
        changeStyle(true)
    },[])
  return (
    <>
        <h1 style={{color:Style?"red":"green"}}>{count}</h1>
        <button onClick={Add1}>Add1</button>
        <button onClick={Minus1}>Sub1</button>
    </>
  )
}

export default Count;
