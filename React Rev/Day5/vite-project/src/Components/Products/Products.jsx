import React, { useEffect, useState } from 'react'

const Products = () => {
    const [Product, setProducts] = useState([]);
    const [loading, setLoading]=useState(false);
    async function fetchProducts()
        {
            try{
                setLoading(true);
                const response = await fetch ("https://dummyjson.com/products");
                const result = await response.json();
                if(result?.products)
                        {
                            setLoading(false);
                            setProducts(result?.products);
                        }
                else
                        {
                            setProducts([]);
                        }
            }
            catch(err)
            {
                console.log(err);

            }
        }
    useEffect(()=>{
        fetchProducts();
    },[])
        console.log(Product);
    return (
    <>
            <h1>Hello</h1>
            {
                loading? (<h1>Loading..</h1>):(<ul style={{}}>
                {
                    Product.map((vals, index)=>(
                        <li key={index}>
                                {vals?.title}
                        </li>
                    ))
                }
            </ul>)
            }
            
    </>
  )
}

export default Products;
