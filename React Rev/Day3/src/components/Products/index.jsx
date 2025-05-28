import ProductIten from "./Components/Product_iten";
import "./Components/style.css"

function ProductList ({name, city ,data})
{

    const flag = true;

    // writing with the help of a function to reduce the return code complexity
    function renderTextBlock (flag)
    {
       return  flag ? (<h1 className="title">Ecommerce Project</h1> ): (<h1 className="title">Welcome SHivam</h1>);
    }

    const val = flag?(<h1 className="title">Bulla</h1> ): (<h1 className="title">Welcome SHivam</h1>);

    return(
        <>
                    
            {renderTextBlock(flag)}
            {val}
            {/* we will be using mapmethod to  */}
            <h4>name is {name}, he/she belong to {city}</h4>
            <ul>
                {
                  data.map((item, index)=>(
                    <ProductIten singleProductItem={item}  key={index} />
                  ))}
            </ul>
        </>
    )
}

export default ProductList;