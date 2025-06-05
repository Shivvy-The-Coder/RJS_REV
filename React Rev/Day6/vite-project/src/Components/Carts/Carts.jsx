import React, { useState } from 'react'
import axios from "axios";
const Carts = () => {
  const [items, setItems] = useState([]);
  async function fetchcartItems()
    {
      try{

        const response = await axios.get("https://dummyjson.com/carts");
        const result = response.data;
        console.log(result);
      }
      catch(err)
        {
          console.log(err);
        }
    }
 
 
  return (
    <>
      
    </>
  )
}

export default Carts;
