import React from 'react'
import { useEffect,useState } from 'react';

const Carts = () => {
    const [items, setItems] = useState([]); 
    const [loading, setLoading] = useState(false);
    async function fetchAllNames() {
    
    try
    {
        setLoading(true);
        const apiResponse = await fetch("https://dummyjson.com/products");
        const result = await apiResponse.json(); 
        if(result?.products)
                {
                    setItems(result?.products);
                    setLoading(false);
                }
        else
                {
                    setItems([]);
                }
    }
    catch(Error)
    {
        console.log(Error);
    }    
    }
    
    useEffect(()=>{
        fetchAllNames();
    },[]);
    console.log(`hello Shiva`,items);
    if (loading)
        return <h1>Loading...</h1>
    return (
    <div>
        <ul>
            {
                items.map(pro=>
                    <li key={pro?.id}>
                            {pro?.title}
                    </li>
                )     
            }
        </ul>
    </div>
  )
}

export default Carts;
