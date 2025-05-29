import styles from "./Product_item.module.css"
function ButtonComponent()
{
    return <button className={styles.buttonStyle}>Click</button>;
}


function ProductIten({singleProductItem})
{
    return(
        < div style={{padding:'5px' , border:'1px solid red', margin:'15px'}}>
        <p className={styles.productTitle}>{singleProductItem}</p>
        <ButtonComponent/>
        </div>
    )
}

export default ProductIten;