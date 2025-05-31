import { useEffect, useState } from "react";
import ProductIten from "./Components/Product_iten";
import "./Components/style.css";
function ProductList ({name, city ,data})
{

    // const flag = true;

        //here i am using useState  
    const [flag , setflag]= useState(false)
    const [count, setcount] = useState(0);
    const [changeStyle , setChangeStyle] = useState(false)
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


    // UseEffect is used to manage any kind of side effecr in the application , it is bascically similar to componentDidMount and componentDidUpdate
        useEffect(()=>{
            console.log("run only once page is loaded");
            setflag(!flag)
        },[] ) //this will only run page load once

    useEffect(()=>{
       count==10?setChangeStyle(!changeStyle):''

       return ()=>{
        console.log("here the component is getting unmounted")
       }
    },[count])

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
            <div><button onClick={Add1}  style={{color:changeStyle?"red":"blue"}}> Add1</button></div>
            <div><button onClick={Minus1}> Minus1</button></div>           
        </>
    )
}

export default ProductList;