import { useState } from "react";
import ProductIten from "./Components/Product_iten";
import "./Components/style.css";

function ProductList ({name, city ,data})
{

    // const flag = true;


    const [flag , setflag]= useState(false)
    const [count, setcount] = useState(0);
    function handleToggleText(){
        setflag(!flag)
    }

    function Add1()
        {
            setcount(count+1);
        }
    function Minus1()
        {
            if(count>0)
            setcount(count-1);
        }
    return(

            <>
            
            <h4>name is {name}, he/she belong to {city}</h4>
            {flag?<p>Hello</p>:""}
            <button onClick={handleToggleText}>Toggle_State</button>
            <ul>
                {
                  data.map((item, index)=>(
                    <ProductIten singleProductItem={item}  key={index} />
                  ))}
            </ul>

            <p>{count}</p>
            <button onClick={Add1}> Add1</button>
            <button onClick={Minus1}> Minus1</button>
        </>
    )
}

export default ProductList;