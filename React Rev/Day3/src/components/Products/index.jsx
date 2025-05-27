import ProductIten from "./Components/Product_iten";

function ProductList ({name, city ,data})
{
    return(
        <>
                    
                    
            <h1>Ecommerce Project</h1>
            {/* we will be using mapmethod to  */}

            <h4>name is {name}, he/she belong to {city}</h4>
            <ul>
                {
                  data.map((item,index)=>(
                    <li key={index}>{item}</li>
                  ))}
            </ul>

            <ProductIten/>
        </>
    )
}

export default ProductList;