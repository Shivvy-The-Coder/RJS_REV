import { useContext } from "react";
import { GlobalContext } from "../../context";

function ContextTextComponent()
{
    const {theme}  = useContext(GlobalContext);
    // console.log(getStateFromGlobalContext);
    return <h1 style={{
                        fontSize :theme === "light"? '50px':'50px', 
                        backgroundColor : theme === "light"?'#fff':'#000',
                        color:theme==="light"?'blue':'yellow'}}>
                            Shivam Das is my Name</h1>;
}
export default ContextTextComponent;